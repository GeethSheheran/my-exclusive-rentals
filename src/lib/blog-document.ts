import type { BlogPost } from "@/lib/blog";
import { getBlogCanonicalUrl } from "@/lib/blog-seo";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";

function updateDocument(update: () => void) {
  const selector = 'title, meta, link[rel="canonical"]';
  const before = new Map(Array.from(document.head.querySelectorAll(selector), (element) => [element, element.cloneNode(true) as Element]));
  update();
  const changed = Array.from(document.head.querySelectorAll(selector))
    .filter((element) => before.get(element)?.outerHTML !== element.outerHTML)
    .map((element) => ({ element, written: element.outerHTML, original: before.get(element) }));
  return () => {
    for (const { element, written, original } of changed) {
      // Don't overwrite metadata installed by Next.js for a subsequent page.
      if (!element.isConnected || element.outerHTML !== written) continue;
      if (!original) element.remove();
      else {
        for (const attribute of Array.from(element.attributes)) element.removeAttribute(attribute.name);
        for (const attribute of Array.from(original.attributes)) element.setAttribute(attribute.name, attribute.value);
        if (element.tagName === "TITLE") element.textContent = original.textContent;
      }
    }
  };
}

function setMeta(attribute: "name" | "property", key: string, value: string) {
  const matches = document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  const tag = matches[0] ?? document.createElement("meta");
  matches.forEach((duplicate, index) => { if (index > 0) duplicate.remove(); });
  tag.setAttribute(attribute, key);
  tag.content = value;
  if (!tag.isConnected) document.head.appendChild(tag);
}

export function syncBlogMetadata(post: BlogPost) {
  return updateDocument(() => {
    const title = post.seoTitle || post.title;
    const description = post.metaDescription || post.excerpt || post.content.slice(0, 160);
    const canonical = getBlogCanonicalUrl(post);
    const image = absoluteUrl(post.imageUrl || DEFAULT_OG_IMAGE);
    document.title = `${title} | ${SITE_NAME}`;
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    if (post.publishedAt) setMeta("property", "article:published_time", post.publishedAt);
    if (post.updatedAt) setMeta("property", "article:modified_time", post.updatedAt);

    const matches = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    const link = matches[0] ?? document.createElement("link");
    matches.forEach((duplicate, index) => { if (index > 0) duplicate.remove(); });
    link.rel = "canonical";
    link.href = canonical;
    if (!link.isConnected) document.head.appendChild(link);
  });
}

export function markArticleMissing() {
  return updateDocument(() => {
    document.title = `Story not found | ${SITE_NAME}`;
    setMeta("name", "robots", "noindex, follow");
    document.head.querySelectorAll('link[rel="canonical"]').forEach((link) => link.remove());
  });
}
