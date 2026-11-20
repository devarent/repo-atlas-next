import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Turbopack tidak punya binding native di win32/x64 pada environment ini.
  // Build dan dev memakai webpack secara eksplisit lewat script npm.
};

export default nextConfig;
