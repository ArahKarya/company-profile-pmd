"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/layout/Container";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/career", key: "career" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale() as "id" | "en";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-default",
        scrolled
          ? "bg-surface-page/95 backdrop-blur border-b border-surface-border"
          : "bg-transparent"
      )}
    >
      <Container size="2xl" padded>
        <nav
          aria-label={t("ariaPrimary")}
          className="flex items-center justify-between gap-6 h-16"
        >
          <Link
            href="/"
            locale={locale}
            className="flex items-center gap-3 group"
            aria-label="PMD Beranda"
          >
            <Image
              src="/images/logo-pmd.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-heading-md text-text-primary tracking-tight">
              PMD
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    locale={locale}
                    className={cn(
                      "px-4 py-2 font-mono text-mono-sm uppercase tracking-wider transition-colors duration-fast",
                      active
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <IconButton
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            variant="ghost"
            size="md"
            className="lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute inset-x-0 top-full bg-surface-page border-y-2 border-ink-900 dark:border-paper-base shadow-md"
        >
          <Container size="2xl" padded>
            <ul className="flex flex-col py-4 gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      locale={locale}
                      className={cn(
                        "block px-4 py-3 font-mono text-mono-md uppercase tracking-wider transition-colors",
                        active
                          ? "bg-ink-900 text-paper-base dark:bg-paper-base dark:text-ink-900"
                          : "text-text-secondary hover:bg-surface-sunken"
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between gap-3 py-4 border-t border-surface-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
