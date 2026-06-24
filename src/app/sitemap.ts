// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { VILLAS } from "@/data/villas";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  const villaRoutes: MetadataRoute.Sitemap = VILLAS.map((villa) => ({
    url: absoluteUrl(`/stays/${villa.slug}/`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...villaRoutes,
  ];
}
