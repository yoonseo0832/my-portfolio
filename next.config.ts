import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "172.30.1.3",
    "http://172.30.1.3:3000",
    "http://localhost:3000",
  ],
};

export default nextConfig;
