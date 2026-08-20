import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { getContent, getLogoDark, getSite } from "@/server/content";
import { LOCALES, type Locale, type PageKey } from "@/content/types";

interface PageShellProps {
  readonly locale: Locale;
  readonly page: PageKey;
  readonly children: ReactNode;
}

/**
 * Navbar + page body + footer. Every route renders through this.
 *
 * Reads the site settings and both locales' short names here so the client-side Navbar can
 * stay a pure presentational component.
 */
export async function PageShell({ locale, page, children }: PageShellProps) {
  const [site, logoOnLight, copy, ...others] = await Promise.all([
    getSite(),
    getLogoDark(),
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
        logoSrc={logoOnLight}
        routes={site.routes}
        labels={copy.nav}
        localeNames={localeNames}
        contact={{ phones: site.phones, email: site.email }}
      />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
