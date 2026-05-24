import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { HeroCompact } from "@/components/public/HeroIndustrial";
import { ProductGrid } from "@/components/public/ProductGrid";
import { CertificationBar } from "@/components/public/CertificationBar";
import { listProducts } from "@/server/repositories/product.repo";
import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "id" ? "Produk" : "Products",
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(rawLocale);
  const t = await getTranslations("Products");

  const products = await listProducts().catch(() => []);

  return (
    <>
      <HeroCompact
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <Section tone="page" density="normal">
        <Container size="2xl" padded>
          <ProductGrid products={products} locale={locale} />
        </Container>
      </Section>
      <CertificationBar />
    </>
  );
}
