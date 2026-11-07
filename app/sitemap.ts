import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/work";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...getAllWork().map((w) => ({ url: `${siteUrl}/work/${w.slug}`, priority: 0.8 })),
  ];
}
