import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panganmasadepan.com",
      },
      {
        protocol: "https",
        hostname: "*.panganmasadepan.com",
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
