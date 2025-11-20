import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
