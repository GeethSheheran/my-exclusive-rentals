// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { VILLAS } from "@/data/villas";
import { getPublishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-03-31");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/our-stay/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about-us/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/blog/"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const villaRoutes: MetadataRoute.Sitemap = VILLAS.map((villa) => ({
    url: absoluteUrl(`/stays/${villa.slug}/`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getPublishedPosts();
    blogRoutes = posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: post.updatedAt || post.publishedAt || lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Keep the core sitemap available if the blog service is temporarily unavailable.
  }

  return [...staticRoutes, ...villaRoutes, ...blogRoutes];
}
