import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { getContent, getSite } from "@/server/content";
import { LOCALES, type Locale, type PageKey } from "@/content/types";

interface PageShellProps {
  readonly locale: Locale;
  readonly page: PageKey;
  /** Pages without a full-bleed dark hero want the navbar solid from the start. */
  readonly solidNav?: boolean;
  readonly children: ReactNode;
}

/**
 * Navbar + page body + footer. Every route renders through this.
 *
 * Reads the site settings and both locales' short names here so the client-side Navbar can
 * stay a pure presentational component.
 */
export async function PageShell({ locale, page, solidNav, children }: PageShellProps) {
  const [site, copy, ...others] = await Promise.all([
    getSite(),
    getContent(locale),
    ...LOCALES.map((code) => getContent(code)),
  ]);

  const localeNames = Object.fromEntries(
    LOCALES.map((code, index) => [code, others[index].localeName]),
  ) as Record<Locale, string>;

  return (
    <>
      <Navbar
        locale={locale}
        current={page}
        siteName={site.name}
        logoSrc={site.logo.src}
        routes={site.routes}
        labels={copy.nav}
        localeNames={localeNames}
        solidByDefault={solidNav}
      />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
