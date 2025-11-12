import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1ktfvxwijd.ucarecd.net",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors when building
  },
};

export default nextConfig;
