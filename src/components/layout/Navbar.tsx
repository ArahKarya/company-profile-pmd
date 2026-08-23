"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LOCALES, PAGE_ORDER, type Locale, type PageKey } from "@/content/types";

export interface NavbarProps {
  readonly locale: Locale;
  readonly current: PageKey;
  readonly siteName: string;
  /** Logo versi warna — navigasi berlatar terang. */
  readonly logoSrc: string;
  /** Route for every page in every locale, so the language switch is a plain link. */
  readonly routes: Readonly<Record<Locale, Readonly<Record<PageKey, string>>>>;
  /** Nav labels for the current locale. */
  readonly labels: Readonly<Record<PageKey, string>>;
  /** Short code shown on each language button, e.g. { id: "IDN", en: "ENG" }. */
  readonly localeNames: Readonly<Record<Locale, string>>;
}

/** Halaman kontak keluar dari daftar menu — ia jadi tombol di ujung kanan. */
const MENU_PAGES = PAGE_ORDER.filter((page) => page !== "contact");

/**
 * Navigasi berlatar terang, satu baris, sama di setiap halaman.
 *
 * Tidak ada lagi keadaan transparan-lalu-gelap saat digulir: halaman dibuka dengan kanvas
 * terang, jadi bilah ini cukup satu wujud — logo warna, tautan gelap, pemilih bahasa, dan
 * satu tombol emas. Kontak operasional hidup di footer, bukan di kepala halaman.
 *
 * Tetap client component karena memegang state menu; semua isinya datang sebagai props,
 * sehingga pembacaan database tetap di sisi server.
 */
export function Navbar({
  locale,
  current,
  siteName,
  logoSrc,
  routes,
  labels,
  localeNames,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu once the viewport passes the collapse breakpoint, so the overlay
  // cannot be left stranded open over a desktop layout.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 992px)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header">
      <div className="navbar-shell">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex align-items-center">
            <Link href={routes[locale].home} className="navbar-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={siteName} className="brand-logo" />
            </Link>

            <button
              className={`navbar-toggler d-lg-none ms-auto${menuOpen ? " open" : ""}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i className={`bi fs-2 ${menuOpen ? "bi-x" : "bi-list"}`} />
            </button>

            <div
              id="site-menu"
              className={`navbar-menu collapse navbar-collapse${menuOpen ? " show" : ""}`}
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                {MENU_PAGES.map((page) => (
                  <li className="nav-item" key={page}>
                    <Link
                      href={routes[locale][page]}
                      className={`nav-link${page === current ? " active" : ""}`}
                      aria-current={page === current ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {labels[page]}
                    </Link>
                  </li>
                ))}
                {/* Kontak muncul sebagai tautan biasa hanya di menu layar sempit. */}
                <li className="nav-item d-lg-none">
                  <Link
                    href={routes[locale].contact}
                    className={`nav-link${current === "contact" ? " active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {labels.contact}
                  </Link>
                </li>
              </ul>

              <div className="nav-tail">
                <LocaleSwitch {...{ locale, current, routes, localeNames }} />
                <Link
                  href={routes[locale].contact}
                  className="btn-fill btn-sm d-none d-lg-inline-flex"
                  onClick={() => setMenuOpen(false)}
                >
                  {labels.contact}
                </Link>
              </div>
              </div>
            </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * Links straight to the equivalent page in the other locale rather than rewriting the
 * current URL — the route table already pairs them up.
 *
 * Order is fixed rather than current-first, so the buttons don't swap places as you switch.
 */
function LocaleSwitch({
  locale,
  current,
  routes,
  localeNames,
}: Pick<NavbarProps, "locale" | "current" | "routes" | "localeNames">) {
  return (
    <span className="lang-switch" role="group" aria-label="Bahasa">
      {LOCALES.map((code) => (
        <Link
          key={code}
          href={routes[code][current]}
          className={`lang-btn${code === locale ? " active" : ""}`}
          aria-current={code === locale ? "true" : undefined}
        >
          {localeNames[code]}
        </Link>
      ))}
    </span>
  );
}
