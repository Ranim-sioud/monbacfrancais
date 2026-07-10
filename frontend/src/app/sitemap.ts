import type { MetadataRoute } from "next";

import { navigationItems, siteUrl } from "@/data/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigationItems.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
