import "server-only";

import { cache } from "react";
import { prisma } from "./db";
import { site as defaultSite } from "@/content/site";
import { contentFor as defaultContentFor } from "@/content";
import type {
  AboutContent,
  CareersContent,
  ContactContent,
  HomeContent,
  Locale,
  LocaleContent,
  PageKey,
  ServicesContent,
  SiteConfig,
} from "@/content/types";
import { PAGE_ORDER } from "@/content/types";
import { DEFAULT_THEME, type ThemeTokens } from "@/content/theme";

/**
 * Reads the site's content.
 *
 * With DATABASE_URL set the database is the source of truth and the admin panel edits it.
 * Without it, the bundled files in src/content/ are served as-is — so `npm run dev` works on
 * a fresh clone before any database exists, and the same files double as the seed.
 *
 * Reads are wrapped in React's `cache`, so one render issues one query per table however
 * many components ask for it.
 */

export const getSite = cache(async (): Promise<SiteConfig> => {
  if (!prisma) return defaultSite;
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!row) return defaultSite;

  return {
    name: row.name,
    logo: { src: row.logoLightPath, alt: row.name },
    favicon: row.faviconPath,
    routes: row.routes as SiteConfig["routes"],
    email: row.email,
    careersEmail: row.careersEmail,
    phones: row.phones,
    addressLines: row.addressLines,
    mapEmbedUrl: row.mapEmbedUrl,
    copyright: row.copyright,
  };
});

/** The dark-background logo, which the admin can set separately from the light one. */
export const getLogoDark = cache(async (): Promise<string> => {
  if (!prisma) return defaultSite.logo.src;
  const row = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: { logoDarkPath: true },
  });
  return row?.logoDarkPath ?? defaultSite.logo.src;
});

export const getTheme = cache(async (): Promise<ThemeTokens> => {
  if (!prisma) return DEFAULT_THEME;
  const tokens = await prisma.themeSettings.findUnique({
    where: { id: 1 },
    omit: { id: true, updatedAt: true },
  });
  return tokens ?? DEFAULT_THEME;
});

export const getContent = cache(async (locale: Locale): Promise<LocaleContent> => {
  const fallback = defaultContentFor(locale);
  if (!prisma) return fallback;

  const [pages, strings] = await Promise.all([
    prisma.pageContent.findMany({ where: { locale } }),
    prisma.localeStrings.findUnique({ where: { locale } }),
  ]);
  if (pages.length === 0) return fallback;

  const byPage = new Map(pages.map((page) => [page.page as PageKey, page]));

  const nav = { ...fallback.nav };
  const meta = { ...fallback.meta };
  for (const key of PAGE_ORDER) {
    const row = byPage.get(key);
    if (!row) continue;
    nav[key] = row.navLabel;
    meta[key] = { title: row.metaTitle, description: row.metaDesc };
  }

  /** Falls back per page, so one unsaved page cannot blank the whole locale. */
  const dataFor = <T>(key: PageKey, whenMissing: T): T =>
    (byPage.get(key)?.data as T | undefined) ?? whenMissing;

  return {
    localeName: strings?.localeName ?? fallback.localeName,
    nav,
    meta,
    footer: {
      officeLabel: strings?.footerOfficeLabel ?? fallback.footer.officeLabel,
      contactsLabel: strings?.footerContactLabel ?? fallback.footer.contactsLabel,
    },
    home: dataFor<HomeContent>("home", fallback.home),
    about: dataFor<AboutContent>("about", fallback.about),
    services: dataFor<ServicesContent>("services", fallback.services),
    careers: dataFor<CareersContent>("careers", fallback.careers),
    contact: dataFor<ContactContent>("contact", fallback.contact),
  };
});

export { DEFAULT_THEME, themeStyleSheet, type ThemeTokens } from "@/content/theme";
