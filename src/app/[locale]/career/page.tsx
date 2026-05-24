import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { HeroCompact } from "@/components/public/HeroIndustrial";
import { CareerCard } from "@/components/public/CareerCard";
import { SectionHeader } from "@/components/public/SectionHeader";
import { listCareers } from "@/server/repositories/career.repo";
import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const WHATSAPP_NUMBER = "6281234567890";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "id" ? "Karier" : "Career",
  };
}

export default async function CareerPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(rawLocale);
  const t = await getTranslations("Career");

  const careers = await listCareers().catch(() => []);

  return (
    <>
      <HeroCompact
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <Section tone="page" density="normal">
        <Container size="md" padded>
          <SectionHeader title={t("openingsTitle")} />
          {careers.length === 0 ? (
            <div className="text-center py-16 text-text-secondary">
              <p className="font-mono text-mono-md uppercase tracking-wider">
                {t("emptyState")}
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {careers.map((c) => {
                const title = locale === "id" ? c.titleId : c.titleEn;
                const description = locale === "id" ? c.descId : c.descEn;
                const waText = encodeURIComponent(
                  `Halo PMD, saya tertarik melamar posisi "${title}". Mohon informasinya. Terima kasih.`
                );
                return (
                  <li key={c.id}>
                    <CareerCard
                      title={title}
                      description={description}
                      location={c.location}
                      type={c.type}
                      applyUrl={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                      applyLabel={t("applyVia")}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-16 text-center text-text-secondary">
            <p className="text-body-md mb-2">{t("fallback")}</p>
            <a
              href="mailto:careers@panganmasadepan.com"
              className="font-mono text-mono-md uppercase tracking-wider text-pmd-gold-700 dark:text-pmd-gold-400 hover:underline"
            >
              careers@panganmasadepan.com
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
