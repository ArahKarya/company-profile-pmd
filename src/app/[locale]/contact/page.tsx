import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { HeroCompact } from "@/components/public/HeroIndustrial";
import { ContactBlockGrid } from "@/components/public/ContactBlockGrid";
import { MapEmbed } from "@/components/public/MapEmbed";
import { InquiryForm } from "@/components/public/InquiryForm";
import { SectionHeader } from "@/components/public/SectionHeader";
import { getSettings } from "@/server/repositories/settings.repo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "id" ? "Kontak" : "Contact",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  const settings = await getSettings().catch(() => null);
  const phone = settings?.phone ?? "+62 812-3456-7890";
  const whatsapp = settings?.whatsapp ?? "6281234567890";
  const email = settings?.email ?? "info@panganmasadepan.com";
  const address = settings?.address ?? "Jl. Raya Indramayu, Jawa Barat, Indonesia";

  return (
    <>
      <HeroCompact
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <Section tone="page" density="normal">
        <Container size="2xl" padded>
          <ContactBlockGrid
            items={[
              {
                label: t("phoneLabel"),
                value: phone,
                href: `https://wa.me/${whatsapp}`,
                icon: Phone,
              },
              {
                label: t("emailLabel"),
                value: email,
                href: `mailto:${email}`,
                icon: Mail,
              },
              {
                label: t("addressLabel"),
                value: "Indramayu, Jawa Barat",
                href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
                icon: MapPin,
              },
            ]}
          />
        </Container>
      </Section>

      <Section tone="sunken" density="normal">
        <Container size="2xl" padded>
          <SectionHeader title={t("formTitle")} align="center" />
          <div className="max-w-3xl mx-auto bg-surface-card border-2 border-ink-900 dark:border-paper-base p-6 md:p-10">
            <InquiryForm whatsappNumber={whatsapp} recipientEmail={email} />
          </div>
          <p className="text-center mt-6 font-mono text-mono-sm uppercase tracking-wider text-text-secondary">
            {t("operatingHours")}
          </p>
        </Container>
      </Section>

      <Section tone="page" density="tight">
        <Container size="2xl" padded>
          <MapEmbed query={address} title={`Lokasi ${address}`} />
        </Container>
      </Section>
    </>
  );
}
