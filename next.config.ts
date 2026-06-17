import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/register-as-tenant", destination: "/tenant-services/register-as-tenant", permanent: true },
      { source: "/student-accommodation", destination: "/tenant-services/student-accommodation", permanent: true },
      { source: "/tenant-guide", destination: "/tenant-services/tenant-guide", permanent: true },
      { source: "/find-a-tenant", destination: "/landlord-services/find-a-tenant", permanent: true },
      { source: "/property-management", destination: "/landlord-services/property-management", permanent: true },
      { source: "/landlord-guide", destination: "/landlord-services/landlord-guide", permanent: true },
    ];
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 1,
  },
  productionBrowserSourceMaps: false,
  turbopack: { root: projectRoot },
  webpack: (config) => {
    if (config.cache) config.cache = false;
    return config;
  },
};

export default nextConfig;
