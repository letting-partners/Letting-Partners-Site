import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/areas";
import { SERVICE_DETAIL_PAGES } from "@/lib/service-pages";
import { OTHER_SERVICE_PAGES } from "@/lib/services";

const SITE_URL = "https://www.lettingpartners.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/landlord-services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/landlord-services/landlord-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/tenant-services/register-as-tenant`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/specialist-legal-support/request-support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/other-services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${SITE_URL}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_DETAIL_PAGES.map((service) => ({
    url: `${SITE_URL}${service.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const otherServiceRoutes: MetadataRoute.Sitemap = OTHER_SERVICE_PAGES.map((page) => ({
    url: `${SITE_URL}${page.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...areaRoutes, ...serviceRoutes, ...otherServiceRoutes];
  const seen = new Set<string>();
  return allRoutes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });
}
