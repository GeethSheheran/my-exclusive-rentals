import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { parseEnv } from "node:util";

const env = existsSync(".env.local") ? parseEnv(await readFile(".env.local", "utf8")) : {};
const siteId = process.env.NEXT_PUBLIC_BLOG_SITE_ID || process.env.BLOG_SITE_ID || env.NEXT_PUBLIC_BLOG_SITE_ID || env.BLOG_SITE_ID;

test("static export supports publish, edit, unpublish and recovery without a rebuild", async ({ page, request }) => {
  const shellBefore = await readFile("out/blog/__article/index.html", "utf8");
  expect(shellBefore).not.toMatch(/rel="canonical"/);
  expect(shellBefore).not.toMatch(/name="robots" content="noindex/);
  let posts = [];
  let failReads = false;
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  // Accelerate only the blog refresh interval; keep animation clocks untouched.
  await page.addInitScript(() => {
    const schedule = window.setInterval.bind(window);
    window.setInterval = (handler, timeout, ...args) => schedule(handler, timeout === 60000 ? 1000 : timeout, ...args);
  });
  // Intercept only read requests. No production database changes are made.
  await page.route("https://firestore.googleapis.com/**", async (route) => {
    expect(route.request().url()).toContain("documents:runQuery");
    const query = route.request().postDataJSON().structuredQuery;
    const filters = query.where.compositeFilter.filters.map(({ fieldFilter }) => fieldFilter);
    expect(filters).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: { fieldPath: "siteId" }, value: { stringValue: siteId } }),
      expect.objectContaining({ field: { fieldPath: "status" }, value: { stringValue: "published" } }),
    ]));
    if (failReads) {
      await route.fulfill({ status: 403, contentType: "application/json", body: JSON.stringify({ error: { code: 403, status: "PERMISSION_DENIED", message: "Test outage" } }) });
      return;
    }
    const matches = posts.filter((post) => filters.every((filter) => post[filter.field.fieldPath] === filter.value.stringValue));
    const documentRoot = new URL(route.request().url()).pathname.replace(/^\/v1\//, "").replace(/:runQuery$/, "");
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(matches.map((post, index) => ({ document: {
      name: `${documentRoot}/blogPosts/post-${index}`,
      fields: Object.fromEntries(Object.entries(post).map(([key, value]) => [key, { stringValue: value }])),
      createTime: "2026-10-01T00:00:00Z", updateTime: "2026-10-01T00:00:00Z",
    } }))) });
  });
  const slug = "newly-published-after-build";
  const path = `/blog/${slug}/`;
  const response = await page.goto(path);
  expect(response.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Story not found" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");

  posts = [{ siteId, status: "published", slug, title: "New coast guide", seoTitle: "Sri Lanka coast guide", metaDescription: "Local discoveries along the coast.", content: "A newly published story loaded directly from Firebase.", excerpt: "Explore the coastline.", publishedAt: "2026-10-01T00:00:00Z", canonicalUrl: "https://myexclusiverentals.com/blog/" },
    { siteId, status: "draft", slug: "private-draft", title: "Private draft" },
    { siteId: "another-site", status: "published", slug: "other-site", title: "Other website" }];
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByRole("heading", { name: "New coast guide", exact: true })).toBeVisible();
  await expect(page).toHaveTitle("Sri Lanka coast guide | My Exclusive Rentals");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://myexclusiverentals.com${path}`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", posts[0].metaDescription);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  expect(JSON.parse(await page.locator('article script[type="application/ld+json"]').textContent())["@type"]).toBe("BlogPosting");

  posts[0].title = "Updated coast guide";
  posts[0].seoTitle = "Updated coast guide SEO";
  posts[0].content = 'Edited safely: </script><script>window.unwantedScript = true</script>';
  await expect(page.getByRole("heading", { name: "Updated coast guide", exact: true })).toBeVisible();
  await expect(page).toHaveTitle("Updated coast guide SEO | My Exclusive Rentals");
  expect(await page.evaluate(() => window.unwantedScript)).toBeUndefined();

  await page.getByRole("link", { name: "Back to Blog", exact: true }).click();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://myexclusiverentals.com/blog/");
  const articleLink = page.locator(`a[href="${path}"]`);
  await expect(articleLink).toHaveCount(1);
  await expect(page.getByText("Private draft", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Other website", { exact: true })).toHaveCount(0);
  await articleLink.click();
  await expect(page.getByRole("heading", { name: "Updated coast guide", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Updated coast guide", exact: true })).toBeVisible();

  posts[0].status = "draft";
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByRole("heading", { name: "Story not found" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  await expect(page.locator('article script[type="application/ld+json"]')).toHaveCount(0);
  await page.goto("/blog/");
  await expect(page.getByRole("heading", { name: "Stories are on their way" })).toBeVisible();
  await expect(page.locator(`a[href="${path}"]`)).toHaveCount(0);

  failReads = true;
  await page.goto(path);
  await expect(page.getByRole("alert").filter({ hasText: "couldn’t load" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Story not found" })).toHaveCount(0);
  await expect(page.locator('[class*="z-[100]"]')).toHaveCount(0);
  failReads = false;
  posts[0].status = "published";
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("heading", { name: "Updated coast guide", exact: true })).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(await readFile("out/blog/__article/index.html", "utf8")).toBe(shellBefore);
  expect((await request.get("/blog/__article/")).status()).toBe(404);
  expect((await request.get("/unrelated-missing-page/")).status()).toBe(404);
});
