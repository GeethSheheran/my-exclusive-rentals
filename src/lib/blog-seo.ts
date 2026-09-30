import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";
import { absoluteUrl, buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export function getBlogCanonicalUrl(post: BlogPost): string {
  const ownUrl = absoluteUrl(`/blog/${post.slug}/`);
  if (!post.canonicalUrl) return ownUrl;

  try {
    const url = new URL(post.canonicalUrl, SITE_URL);
    if (!["https:", "http:"].includes(url.protocol)) return ownUrl;

    const site = new URL(SITE_URL);
    if (url.hostname.replace(/^www\./, "") === site.hostname) {
      // Match the deployed HTTPS, non-www, trailing-slash URLs. Never inherit
      // the old shell's canonical pointing at the listing or placeholder.
      if (["/blog", "/blog/", "/blog/__article", "/blog/__article/"].includes(url.pathname)) {
        return ownUrl;
      }
      url.protocol = site.protocol;
      url.host = site.host;
      if (!url.pathname.endsWith("/")) url.pathname += "/";
    }
    return url.href;
  } catch {
    return ownUrl;
  }
}

export function buildBlogMetadata(post: BlogPost): Metadata {
  const metadata = buildPageMetadata({
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || post.content.slice(0, 160),
    path: getBlogCanonicalUrl(post),
    keywords: post.tags,
    image: post.imageUrl || undefined,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
      authors: post.author ? [post.author] : undefined,
      section: post.category || undefined,
      tags: post.tags,
      ...(post.imageUrl && {
        images: [{ url: absoluteUrl(post.imageUrl), alt: post.imageAlt || post.title }],
      }),
    },
  };
}

export function buildBlogJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.imageUrl ? absoluteUrl(post.imageUrl) : undefined,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/er-logo.png") },
    },
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    mainEntityOfPage: getBlogCanonicalUrl(post),
  };
}
