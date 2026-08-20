/**
 * Overwrites the content rows in the database with the bundled defaults in src/content/,
 * including the theme tokens — a palette change in theme.ts only reaches the site through here.
 *
 * `db:seed` deliberately leaves existing rows alone so a re-seed never clobbers what the
 * client edited in /admin. That makes it useless while the site is still being written in
 * code, which is what this script is for: it pushes site settings, locale strings and every
 * page back over whatever is in the database.
 *
 * DESTRUCTIVE — any edit made through the admin panel is lost. Do not run it on a site the
 * client has started editing.
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { site } from "../src/content/site";
import { id } from "../src/content/id";
import { en } from "../src/content/en";
import { PAGE_ORDER, type LocaleContent, type PageKey } from "../src/content/types";
import { DEFAULT_THEME } from "../src/content/theme";

try {
  process.loadEnvFile(".env");
} catch {
  // fall back to the ambient environment
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set — nothing to resync.");
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

function pageData(content: LocaleContent, page: PageKey): unknown {
  switch (page) {
    case "home":
      return content.home;
    case "about":
      return content.about;
    case "services":
      return content.services;
    case "careers":
      return content.careers;
    case "contact":
      return content.contact;
  }
}

async function main() {
  const siteRow = {
    name: site.name,
    logoLightPath: site.logo.src,
    logoDarkPath: "/brand/logo-dark.png",
    faviconPath: site.favicon,
    email: site.email,
    careersEmail: site.careersEmail,
    phones: [...site.phones],
    addressLines: [...site.addressLines],
    mapEmbedUrl: site.mapEmbedUrl,
    copyright: site.copyright,
    routes: site.routes,
  };
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...siteRow },
    update: siteRow,
  });
  console.log("site settings resynced");

  await prisma.themeSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...DEFAULT_THEME },
    update: DEFAULT_THEME,
  });
  console.log("theme settings resynced");

  for (const content of [id, en] as const) {
    const locale = content === id ? "id" : "en";

    const strings = {
      localeName: content.localeName,
      footerOfficeLabel: content.footer.officeLabel,
      footerContactLabel: content.footer.contactsLabel,
    };
    await prisma.localeStrings.upsert({
      where: { locale },
      create: { locale, ...strings },
      update: strings,
    });

    for (const page of PAGE_ORDER) {
      const row = {
        navLabel: content.nav[page],
        metaTitle: content.meta[page].title,
        metaDesc: content.meta[page].description,
        data: pageData(content, page) as never,
      };
      await prisma.pageContent.upsert({
        where: { locale_page: { locale, page } },
        create: { locale, page, ...row },
        update: row,
      });
    }
    console.log(`${locale}: ${PAGE_ORDER.length} pages resynced`);
  }

  console.log("\nRestart `next dev`, or save anything in /admin, to revalidate the cached pages.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
