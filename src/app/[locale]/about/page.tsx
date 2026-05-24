import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Grid } from "@/components/ui/layout/Grid";
import { HeroCompact } from "@/components/public/HeroIndustrial";
import { SectionHeader } from "@/components/public/SectionHeader";
import { ValueLetterGrid } from "@/components/public/ValueLetterGrid";
import { ProcessTimeline } from "@/components/public/ProcessTimeline";
import { FacilityShowcase } from "@/components/public/FacilityShowcase";
import { TeamGrid } from "@/components/public/TeamGrid";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { CTABanner } from "@/components/public/CTABanner";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { listTeamMembers } from "@/server/repositories/team.repo";
import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "id" ? "Tentang Kami" : "About Us",
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(rawLocale);
  const t = await getTranslations("About");

  const team = await listTeamMembers().catch(() => []);

  return (
    <>
      <HeroCompact eyebrow={t("eyebrow")} title={t("title")} />

      <Section tone="page" density="normal">
        <Container size="2xl" padded>
          <Grid cols={1} lgCols={12} gap={12}>
            <div className="lg:col-span-4">
              <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400">
                {t("missionTitle")}
              </div>
            </div>
            <ScrollReveal className="lg:col-span-8">
              <p className="font-display text-display-sm md:text-display-md text-text-primary leading-tight">
                {t("missionBody")}
              </p>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>

      <Section tone="sunken" density="normal">
        <Container size="2xl" padded>
          <SectionHeader
            eyebrow="01 — NILAI"
            title={t("valuesTitle")}
            align="center"
          />
          <ScrollReveal>
            <ValueLetterGrid />
          </ScrollReveal>
        </Container>
      </Section>

      <Section tone="page" density="normal">
        <Container size="2xl" padded>
          <SectionHeader
            eyebrow="02 — PROSES"
            title={t("processTitle")}
            align="center"
          />
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <ProcessTimeline variant="vertical" />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <FacilityShowcase
        title={t("facilityTitle")}
        description="Fasilitas penggilingan modern di Indramayu dengan kapasitas 300 ton beras per hari."
        imageUrl="/images/hero-bg.png"
        imageAlt="Fasilitas penggilingan PMD Indramayu"
        specs={[
          { label: "TAHUN BERDIRI", value: "2021" },
          { label: "KAPASITAS", value: "300 T/D" },
          { label: "TAHAP PROSES", value: "6" },
          { label: "LOKASI", value: "Indramayu" },
        ]}
      />

      {team.length > 0 && (
        <Section tone="page" density="normal">
          <Container size="2xl" padded>
            <SectionHeader
              eyebrow="04 — TIM"
              title={t("teamTitle")}
              align="center"
            />
            <TeamGrid
              members={team.map((m) => ({
                id: m.id,
                name: m.name,
                role: locale === "id" ? m.roleId : m.roleEn,
                photoUrl: m.photoUrl,
              }))}
            />
          </Container>
        </Section>
      )}

      <CTABanner
        eyebrow="05 — BERMITRA"
        title="Mari Berkolaborasi"
        body="Hubungi tim kami untuk peluang kemitraan, kuotasi, atau kunjungan fasilitas."
        actions={
          <Button asChild variant="secondary" size="xl" trailingIcon={<ArrowRight size={18} />}>
            <Link href="/contact" locale={locale}>
              Hubungi Kami
            </Link>
          </Button>
        }
      />
    </>
  );
}
