import type { NextConfig } from "next";

// Deployed on Vercel, so next/image serves optimized WebP/AVIF automatically.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
