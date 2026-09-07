import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Property photos live in the portal's object store. Set IMAGE_HOST_URL to the
 * same public base URL the portal uploads to (an R2 custom domain, or the
 * bucket's public development URL) so the image optimiser will serve them.
 */
function storageHostPattern() {
  const base = process.env.IMAGE_HOST_URL;
  if (!base) return [];
  try {
    const { protocol, hostname } = new URL(base);
    return [{ protocol: protocol.replace(":", ""), hostname }];
  } catch {
    return [];
  }
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // Property photos and agent avatars published from the portal.
      ...storageHostPattern(),
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
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
