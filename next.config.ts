import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  serverExternalPackages: ["better-sqlite3"],
  // Use Webpack for build (Turbopack has compat issues with Tailwind v4 @layer properties)
  turbopack: {
    rules: {}
  },
};

export default nextConfig;