import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1ktfvxwijd.ucarecd.net",
      },
    ],
  },
};

export default nextConfig;
