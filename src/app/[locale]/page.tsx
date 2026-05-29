import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/layout/Container";
import { HeroIndustrial } from "@/components/public/HeroIndustrial";
import { StatBlock, StatGrid } from "@/components/public/StatBlock";
import { CertificationBar } from "@/components/public/CertificationBar";
import { ProcessTimeline } from "@/components/public/ProcessTimeline";
import { ProductCard } from "@/components/public/ProductCard";
import { ClientLogoWall } from "@/components/public/ClientLogoWall";
import { CTABanner } from "@/components/public/CTABanner";
import { SectionHeader } from "@/components/public/SectionHeader";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Section } from "@/components/ui/layout/Section";
import { Grid } from "@/components/ui/layout/Grid";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { listFeaturedProducts } from "@/server/repositories/product.repo";
import { listClients } from "@/server/repositories/client.repo";
import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(rawLocale);
  const t = await getTranslations("Home");

  const [products, clients] = await Promise.all([
    listFeaturedProducts(6).catch(() => []),
    listClients().catch(() => []),
  ]);

  return (
    <>
      <HeroIndustrial
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <>
            <Button asChild variant="secondary" size="xl" trailingIcon={<ArrowRight size={18} />}>
              <Link href="/products" locale={locale}>
                {t("ctaPrimary")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="text-paper-base border-paper-base hover:bg-paper-base hover:text-ink-900">
              <Link href="/contact" locale={locale}>
                {t("ctaSecondary")}
              </Link>
            </Button>
          </>
        }
        stats={
          <StatGrid tone="inverted">
            <div className="px-4 first:pl-0">
              <StatBlock value="2021" label={t("statsEstLabel")} size="md" />
            </div>
            <div className="px-4">
              <StatBlock value="300" unit="T/D" label={t("statsCapacityLabel")} size="md" />
            </div>
            <div className="px-4">
              <StatBlock value="6" label={t("statsProcessLabel")} size="md" />
            </div>
            <div className="px-4">
              <StatBlock value="100" unit="+" label={t("statsPartnersLabel")} size="md" />
            </div>
          </StatGrid>
        }
      />

      <CertificationBar />

      {/* About preview */}
      <Section tone="page" density="normal">
        <Container size="2xl" padded>
          <Grid cols={1} lgCols={2} gap={12}>
            <ScrollReveal>
              <SectionHeader
                eyebrow="02 — TENTANG"
                title={t("aboutTitle")}
                subtitle={t("aboutBody")}
              />
              <Button asChild variant="primary" size="lg" trailingIcon={<ArrowRight size={16} />}>
                <Link href="/about" locale={locale}>
                  {t("aboutLink")}
                </Link>
              </Button>
            </ScrollReveal>
            <ScrollReveal preset="slide-right" delay={0.1}>
              <div className="relative aspect-[4/3] bg-surface-sunken border-2 border-ink-900 dark:border-paper-base overflow-hidden">
                <Image
                  src="/images/hero-bg.png"
                  alt="Fasilitas penggilingan PMD"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>

      {/* Process timeline */}
      <Section tone="sunken" density="normal">
        <Container size="2xl" padded>
          <SectionHeader
            eyebrow="03 — PROSES"
            title="Proses Produksi 6 Tahap"
            align="center"
          />
          <ScrollReveal>
            <ProcessTimeline />
          </ScrollReveal>
        </Container>
      </Section>

      {/* Featured products */}
      {products.length > 0 && (
        <Section tone="page" density="normal">
          <Container size="2xl" padded>
            <div className="flex items-end justify-between mb-12 md:mb-16">
              <SectionHeader
                eyebrow="04 — PRODUK"
                title={t("productsTitle")}
                className="mb-0"
              />
              <Button asChild variant="link" trailingIcon={<ArrowRight size={16} />}>
                <Link href="/products" locale={locale}>
                  {t("productsLink")}
                </Link>
              </Button>
            </div>
            <Grid cols={1} mdCols={2} lgCols={3} gap={6}>
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  name={locale === "id" ? p.nameId : p.nameEn}
                  description={locale === "id" ? p.descId : p.descEn}
                  imageUrl={p.imageUrl}
                  category={p.category as "main" | "circular"}
                  features={
                    p.features
                      ? p.features.split(",").map((s) => s.trim()).filter(Boolean)
                      : undefined
                  }
                />
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* Clients */}
      {clients.length > 0 && (
        <Section tone="sunken" density="normal">
          <Container size="2xl" padded>
            <SectionHeader
              eyebrow="05 — MITRA"
              title="Dipercaya 100+ Mitra"
              align="center"
            />
            <ClientLogoWall
              clients={clients}
              footerNote="dan 100+ agen distribusi lainnya"
            />
          </Container>
        </Section>
      )}

      <CTABanner
        eyebrow="06 — BERMITRA"
        title={t("ctaTitle")}
        body={t("ctaBody")}
        actions={
          <Button asChild variant="secondary" size="xl" trailingIcon={<ArrowRight size={18} />}>
            <Link href="/contact" locale={locale}>
              {t("ctaSecondary")}
            </Link>
          </Button>
        }
      />
    </>
  );
}
