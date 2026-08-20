import { notFound } from "next/navigation";
import { requireUser } from "@/server/auth";
import { requireDb } from "@/server/db";
import { bundledImages, libraryImages } from "@/server/media";
import { LOCALES, PAGE_ORDER, type Locale, type PageKey } from "@/content/types";
import { ContentEditor } from "./ContentEditor";

export const dynamic = "force-dynamic";

const PAGE_LABEL: Record<PageKey, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  careers: "Careers",
  contact: "Contact",
};

function parseParams(locale: string, page: string) {
  if (!LOCALES.includes(locale as Locale)) return null;
  if (!PAGE_ORDER.includes(page as PageKey)) return null;
  return { locale: locale as Locale, page: page as PageKey };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  await requireUser();
  const raw = await params;
  const parsed = parseParams(raw.locale, raw.page);
  if (!parsed) notFound();

  const db = requireDb();
  const [row, strings, library, bundled] = await Promise.all([
    db.pageContent.findUnique({
      where: { locale_page: { locale: parsed.locale, page: parsed.page } },
    }),
    db.localeStrings.findUnique({ where: { locale: parsed.locale } }),
    libraryImages(),
    bundledImages(),
  ]);
  if (!row) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>
            {PAGE_LABEL[parsed.page]} —{" "}
            {parsed.locale === "id" ? "Indonesian" : "English"}
          </h1>
          <p className="subtitle">
            Last saved {row.updatedAt.toLocaleString("en-GB")}. Use <code>**bold**</code>{" "}
            inside a headline line to emphasise part of it.
          </p>
        </div>
      </div>

      <ContentEditor
        locale={parsed.locale}
        page={parsed.page}
        initial={{
          navLabel: row.navLabel,
          metaTitle: row.metaTitle,
          metaDesc: row.metaDesc,
          data: row.data,
        }}
        localeStrings={{
          localeName: strings?.localeName ?? "",
          footerOfficeLabel: strings?.footerOfficeLabel ?? "",
          footerContactLabel: strings?.footerContactLabel ?? "",
        }}
        library={library}
        bundled={bundled}
      />
    </>
  );
}
