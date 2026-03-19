// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://myexclusiverentals.com",
      lastModified: "2026-03-19",
    },
  ];
}