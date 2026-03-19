import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Enable static export
  output: "export",

  // ✅ Required for static hosting (Next Image optimization won't work)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;