import { useLocale, useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/layout/Container";

const PRODUCT_LINKS = [
  { href: "/products?cat=main", labelId: "Wa Lemu", labelEn: "Wa Lemu" },
  { href: "/products?cat=main", labelId: "Nick Well", labelEn: "Nick Well" },
  { href: "/products?cat=main", labelId: "Cruise", labelEn: "Cruise" },
  { href: "/products?cat=circular", labelId: "Sekam Padi", labelEn: "Rice Husk" },
  { href: "/products?cat=circular", labelId: "Bekatul", labelEn: "Rice Bran" },
] as const;

const ABOUT_LINKS = [
  { href: "/about", key: "about" as const },
  { href: "/career", key: "career" as const },
  { href: "/contact", key: "contact" as const },
] as const;

const CERTIFICATIONS = ["HALAL", "BPOM", "ISO 22000", "SNI"] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const locale = useLocale() as "id" | "en";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 dark:bg-paper-darker text-paper-base">
      <Container size="2xl" padded>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="font-display text-display-sm leading-none">
                PMD
              </div>
            </div>
            <p className="text-body-sm text-paper-base/70 max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* About column */}
          <div>
            <h3 className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-400 mb-4">
              {t("columnAbout")}
            </h3>
            <ul className="flex flex-col gap-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    locale={locale}
                    className="text-body-sm text-paper-base/80 hover:text-pmd-gold-400 transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h3 className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-400 mb-4">
              {t("columnProducts")}
            </h3>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={`${link.labelId}-${link.href}`}>
                  <Link
                    href="/products"
                    locale={locale}
                    className="text-body-sm text-paper-base/80 hover:text-pmd-gold-400 transition-colors"
                  >
                    {locale === "id" ? link.labelId : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-400 mb-4">
              {t("columnContact")}
            </h3>
            <ul className="flex flex-col gap-3 text-body-sm text-paper-base/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} strokeWidth={1.75} className="shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="hover:text-pmd-gold-400 transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} strokeWidth={1.75} className="shrink-0" />
                <a
                  href="mailto:info@panganmasadepan.com"
                  className="hover:text-pmd-gold-400 transition-colors"
                >
                  info@panganmasadepan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications strip */}
        <div className="py-6 border-t border-paper-base/15">
          <div className="font-mono text-mono-xs uppercase tracking-[0.15em] text-pmd-gold-400 mb-3">
            {t("columnCertifications")}
          </div>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 border border-paper-base/30 font-mono text-mono-xs uppercase tracking-wider text-paper-base/80"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="py-6 border-t border-paper-base/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-mono-xs uppercase tracking-wider text-paper-base/60">
          <span>
            © {year} {t("copyright")}
          </span>
          <span>v1.0 · Refactored 2026</span>
        </div>
      </Container>
    </footer>
  );
}
