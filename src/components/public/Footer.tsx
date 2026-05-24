import { Phone, Mail, MapPin } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  settings: SiteSettings;
  locale: Locale;
}

export default function Footer({ settings, locale }: FooterProps) {
  const langQuery = `?lang=${locale}`;

  const links = locale === "id"
    ? [
        { href: "/", label: "Beranda" },
        { href: "/about", label: "Tentang Kami" },
        { href: "/products", label: "Produk" },
        { href: "/career", label: "Karir" },
        { href: "/contact", label: "Kontak" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/products", label: "Products" },
        { href: "/career", label: "Career" },
        { href: "/contact", label: "Contact" },
      ];

  return (
    <footer className="bg-pmd-dark text-white">
      {/* Tagline banner */}
      <div className="bg-pmd-gold">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 text-center">
          <p className="text-white text-lg md:text-xl font-medium tracking-wide">
            {locale === "id"
              ? "Inovasi melalui Teknologi, Terdepan melalui Keberlanjutan"
              : "Innovation through Technology, Leading through Sustainability"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pmd-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PMD</span>
              </div>
              <span className="font-bold text-lg">PMD</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {locale === "id" ? settings.taglineId : settings.taglineEn}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              {locale === "id" ? "Navigasi" : "Navigation"}
            </h4>
            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={`${link.href}${langQuery}`}
                  className="block text-sm text-gray-300 hover:text-pmd-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Head Office */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Head Office
            </h4>
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin size={16} className="mt-1 shrink-0 text-pmd-gold" />
              <span className="leading-relaxed">{settings.address}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              {locale === "id" ? "Kontak" : "Contact"}
            </h4>
            <div className="space-y-4 text-sm">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3 text-gray-300 hover:text-pmd-gold transition-colors"
              >
                <Phone size={16} className="text-pmd-gold" />
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-pmd-gold transition-colors"
              >
                <Mail size={16} className="text-pmd-gold" />
                {settings.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {settings.companyName}.{" "}
            {locale === "id" ? "Hak cipta dilindungi." : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <span>NIB Terdaftar</span>
            <span>Halal MUI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
