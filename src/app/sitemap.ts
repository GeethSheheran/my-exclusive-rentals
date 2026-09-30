// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { VILLAS } from "@/data/villas";
import { getPublishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Read current publications on every request, including newly added slugs.
  // A CMS outage must not return a successful but incomplete sitemap.
  const posts = await getPublishedPosts();
  const latestPostUpdate = posts
    .map((post) => post.updatedAt || post.publishedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/our-stay/"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about-us/"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact/"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/blog/"),
      lastModified: latestPostUpdate,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const villaRoutes: MetadataRoute.Sitemap = VILLAS.map((villa) => ({
    url: absoluteUrl(`/stays/${villa.slug}/`),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}/`),
    lastModified: post.updatedAt || post.publishedAt || undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...villaRoutes, ...blogRoutes];
}
