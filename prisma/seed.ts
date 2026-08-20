/**
 * Seeds the database from the bundled content files.
 *
 * Idempotent: re-running updates the rows in place rather than duplicating them, so it is
 * safe to run after pulling new default content. The admin user is only created when no
 * user exists, so a re-seed never resets a real password.
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { site } from "../src/content/site";
import { id } from "../src/content/id";
import { en } from "../src/content/en";
import { PAGE_ORDER, type LocaleContent, type PageKey } from "../src/content/types";
import { DEFAULT_THEME } from "../src/content/theme";
import { hashPassword } from "../src/server/password";

try {
  process.loadEnvFile(".env");
} catch {
  // fall back to the ambient environment
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set — nothing to seed.");
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

/** Section payload per page, matching the JSON column on PageContent. */
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
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
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
    },
    update: {},
  });
  console.log("site settings ready");

  await prisma.themeSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...DEFAULT_THEME },
    update: {},
  });
  console.log("theme settings ready");

  for (const content of [id, en] as const) {
    const locale = content === id ? "id" : "en";

    await prisma.localeStrings.upsert({
      where: { locale },
      create: {
        locale,
        localeName: content.localeName,
        footerOfficeLabel: content.footer.officeLabel,
        footerContactLabel: content.footer.contactsLabel,
      },
      update: {},
    });

    for (const page of PAGE_ORDER) {
      await prisma.pageContent.upsert({
        where: { locale_page: { locale, page } },
        create: {
          locale,
          page,
          navLabel: content.nav[page],
          metaTitle: content.meta[page].title,
          metaDesc: content.meta[page].description,
          data: pageData(content, page) as never,
        },
        update: {},
      });
    }
    console.log(`${locale}: ${PAGE_ORDER.length} pages ready`);
  }

  // Only bootstrap an account when the table is empty, so a re-seed never clobbers a real one.
  const existing = await prisma.user.count();
  if (existing === 0) {
    const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
    const password = process.env.ADMIN_PASSWORD ?? "changeme123";
    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: "Administrator",
        passwordHash: await hashPassword(password),
        role: "ADMIN",
      },
    });
    console.log(`\nadmin account created: ${email} / ${password}`);
    console.log("CHANGE THIS PASSWORD after the first sign-in.\n");
  } else {
    console.log(`${existing} user(s) already exist — not creating one`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
