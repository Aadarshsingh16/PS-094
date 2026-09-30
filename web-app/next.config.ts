import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so Capacitor can copy the same web build into the mobile shell.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
