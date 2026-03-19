// src/app/manifest.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My Exclusive Rentals",
    short_name: "Exclusive Rentals",
    description: "Beachfront stays in Nilaveli Sri Lanka",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/er-logo.png",
        sizes: "100x100",
        type: "image/png",
      },
      {
        src: "/er-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}