import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://panganmasadepan.com";
const ROUTES = ["", "about", "products", "career", "contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of ROUTES) {
      const path = route ? `/${route}` : "";
      const url =
        locale === routing.defaultLocale
          ? `${BASE_URL}${path}`
          : `${BASE_URL}/${locale}${path}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              l === routing.defaultLocale
                ? `${BASE_URL}${path}`
                : `${BASE_URL}/${l}${path}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
