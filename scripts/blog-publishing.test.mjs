import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

// A local Firestore REST stub, never the production database. Exercise the actual
// built Next.js app as content changes, without rebuilding or restarting it.
test("publish, edit, and unpublish update the blog and sitemap without a deployment", { timeout: 120_000 }, async (t) => {
  const buildId = await readFile(".next/BUILD_ID", "utf8");
  let posts = [];
  let failReads = false;
  let queryCount = 0;
  const firestore = createServer(async (request, response) => {
    try {
      assert.match(new URL(request.url, "http://localhost").pathname, /^\/v1\/projects\/demo-blog-seo\/databases\/\(default\)\/documents:runQuery$/);
      let body = "";
      for await (const chunk of request) body += chunk;
      const { structuredQuery: query } = JSON.parse(body);
      assert.equal(query.from[0].collectionId, "blogPosts");
      const filters = query.where.compositeFilter.filters.map(({ fieldFilter }) => fieldFilter);
      assert(filters.some((f) => f.field.fieldPath === "siteId" && f.value.stringValue === "seo-test-site"));
      assert(filters.some((f) => f.field.fieldPath === "status" && f.value.stringValue === "published"));
      queryCount++;
      response.setHeader("Content-Type", "application/json");
      if (failReads) {
        response.writeHead(403);
        response.end(JSON.stringify({ error: { code: 403, status: "PERMISSION_DENIED", message: "Simulated CMS failure" } }));
        return;
      }
      const result = posts.filter((post) => filters.every((f) => post[f.field.fieldPath] === f.value.stringValue));
      response.end(JSON.stringify(result.map((post, index) => ({
        document: {
          name: `projects/demo-blog-seo/databases/(default)/documents/blogPosts/post-${index}`,
          fields: Object.fromEntries(Object.entries(post).map(([key, value]) => [key, { stringValue: value }])),
          createTime: "2026-09-01T00:00:00Z",
          updateTime: "2026-09-30T00:00:00Z",
        },
      }))));
    } catch (error) {
      response.writeHead(400);
      response.end(JSON.stringify({ error: { code: 400, status: "INVALID_ARGUMENT", message: String(error) } }));
    }
  });
  firestore.listen(0, "127.0.0.1");
  await once(firestore, "listening");
  t.after(() => firestore.close());

  const portReservation = createServer();
  portReservation.listen(0, "127.0.0.1");
  await once(portReservation, "listening");
  const appPort = portReservation.address().port;
  await new Promise((resolve) => portReservation.close(resolve));
  const app = spawn(process.execPath, ["app.js"], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(appPort),
      APP_HOST: "127.0.0.1",
      FIREBASE_API_KEY: "fake-api-key",
      FIREBASE_PROJECT_ID: "demo-blog-seo",
      FIREBASE_APP_ID: "fake-app-id",
      BLOG_SITE_ID: "seo-test-site",
      FIRESTORE_EMULATOR_HOST: `127.0.0.1:${firestore.address().port}`,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  app.stdout.on("data", (data) => { logs += data; });
  app.stderr.on("data", (data) => { logs += data; });
  t.after(async () => {
    if (app.exitCode === null) {
      app.kill("SIGTERM");
      await once(app, "exit");
    }
  });
  const base = `http://127.0.0.1:${appPort}`;
  const request = async (path) => {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(15_000) });
    return { status: response.status, headers: response.headers, html: await response.text() };
  };
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    assert.equal(app.exitCode, null, logs);
    try {
      const response = await request("/robots.txt");
      if (response.status === 200) { ready = true; break; }
    } catch { /* Wait for the server to bind its port. */ }
    await delay(250);
  }
  assert(ready, logs);
  const slug = "published-after-server-start";
  const path = `/blog/${slug}/`;
  const body = "This article was published after the application started. ".repeat(25);
  const missing = await request(path);
  assert.equal(missing.status, 404, `An unknown post must be a real 404\n${logs}`);

  posts = [{ siteId: "seo-test-site", status: "published", slug, title: "New coast guide", content: body, excerpt: "A fresh travel guide.", publishedAt: "2026-09-30T00:00:00Z" },
    { siteId: "another-site", status: "published", slug: "private-other-site", title: "Other site" },
    { siteId: "seo-test-site", status: "draft", slug: "private-draft", title: "Unpublished draft" }];
  const article = await request(path);
  assert.equal(article.status, 200, logs);
  assert.match(article.headers.get("cache-control"), /no-store/);
  assert.match(article.html, /<h1[^>]*>New coast guide<\/h1>/);
  assert(article.html.includes(body.trim()));
  const head = article.html.split("</head>")[0];
  assert(head.includes("New coast guide | My Exclusive Rentals"));
  assert(head.includes(`rel="canonical" href="https://myexclusiverentals.com${path}"`));
  assert(article.html.includes('"@type":"BlogPosting"'));
  let listing = await request("/blog/");
  assert(listing.html.includes(`href="${path}"`));
  assert(!listing.html.includes("private-other-site") && !listing.html.includes("private-draft"));
  let sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("cache-control"), /max-age=0/);
  assert.match(sitemap.headers.get("cache-control"), /must-revalidate/);
  assert(sitemap.html.includes(`https://myexclusiverentals.com${path}`));

  posts[0].title = "Updated coast guide";
  posts[0].content = "Updated article content from the dashboard.";
  const edited = await request(path);
  assert.equal(edited.status, 200);
  assert.match(edited.html, /<h1[^>]*>Updated coast guide<\/h1>/);
  assert(edited.html.includes(posts[0].content));

  posts[0].status = "draft";
  const unpublished = await request(path);
  assert.equal(unpublished.status, 404);
  assert.match(unpublished.html, /name="robots" content="noindex/);
  listing = await request("/blog/");
  sitemap = await request("/sitemap.xml");
  assert(!listing.html.includes(`href="${path}"`));
  assert(!sitemap.html.includes(`https://myexclusiverentals.com${path}`));
  assert.equal((await request("/blog/__article/")).status, 404);

  failReads = true;
  assert.equal((await request("/sitemap.xml")).status, 500, "CMS failure must not publish an empty sitemap");
  assert.equal((await request(path)).status, 500, "CMS failure must not be cached as an article 404");
  assert.equal(await readFile(".next/BUILD_ID", "utf8"), buildId);
  assert(queryCount >= 10, "Requests must fetch current CMS data");
});
