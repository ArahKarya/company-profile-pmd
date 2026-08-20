import { requireUser } from "@/server/auth";
import { requireDb } from "@/server/db";
import { bundledImages, libraryImages } from "@/server/media";
import { SiteForm } from "./SiteForm";
import type { Locale, PageKey } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function SitePage() {
  await requireUser();

  const [settings, library, bundled] = await Promise.all([
    requireDb().siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
    libraryImages(),
    bundledImages(),
  ]);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Site &amp; contact</h1>
          <p className="subtitle">
            Company name, logos, contact details and the URL each page lives at.
          </p>
        </div>
      </div>

      <SiteForm
        initial={{
          name: settings.name,
          logoLightPath: settings.logoLightPath,
          logoDarkPath: settings.logoDarkPath,
          faviconPath: settings.faviconPath,
          email: settings.email,
          careersEmail: settings.careersEmail,
          phones: settings.phones,
          addressLines: settings.addressLines,
          mapEmbedUrl: settings.mapEmbedUrl,
          copyright: settings.copyright,
          routes: settings.routes as Record<Locale, Record<PageKey, string>>,
        }}
        library={library}
        bundled={bundled}
      />
    </>
  );
}
