import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myexclusiverentals.com',
      },
    ],
  },
};

export default nextConfig;
