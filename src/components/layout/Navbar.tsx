"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LOCALES, PAGE_ORDER, type Locale, type PageKey } from "@/content/types";

/** Scroll offset past which the navbar paints its solid background. */
const SOLID_AFTER = 50;

export interface NavbarProps {
  readonly locale: Locale;
  readonly current: PageKey;
  readonly siteName: string;
  readonly logoSrc: string;
  /** Route for every page in every locale, so the language switch is a plain link. */
  readonly routes: Readonly<Record<Locale, Readonly<Record<PageKey, string>>>>;
  /** Nav labels for the current locale. */
  readonly labels: Readonly<Record<PageKey, string>>;
  /** Short code shown on each language button, e.g. { id: "IDN", en: "ENG" }. */
  readonly localeNames: Readonly<Record<Locale, string>>;
  /** Pages whose hero is light, so the navbar starts solid rather than transparent. */
  readonly solidByDefault?: boolean;
}

/**
 * Client component: it owns scroll and menu state, so everything it renders arrives as
 * props from the server. That keeps the database read on the server side of the boundary.
 */
export function Navbar({
  locale,
  current,
  siteName,
  logoSrc,
  routes,
  labels,
  localeNames,
  solidByDefault = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SOLID_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu once the viewport passes the collapse breakpoint, so the overlay
  // cannot be left stranded open over a desktop layout.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 992px)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || solidByDefault || menuOpen;

  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: solid ? "var(--brand-dark)" : "transparent" }}
      >
        <div className="container-fluid d-flex align-items-center">
          <Link href={routes[locale].home} className="navbar-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt={siteName} className="brand-logo" />
          </Link>

          <button
            className="navbar-toggler d-lg-none ms-auto"
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
            className={`navbar-menu collapse navbar-collapse justify-content-between align-items-center${
              menuOpen ? " show" : ""
            }`}
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              {PAGE_ORDER.map((page, index) => (
                <li className={`nav-item${index === 0 ? " ms-lg-auto" : ""}`} key={page}>
                  <Link
                    href={routes[locale][page]}
                    className={`nav-link${page === current ? " active" : ""}`}
                    aria-current={page === current ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {labels[page]}
                    {page === current && <span className="nav-marker" aria-hidden="true" />}
                  </Link>
                </li>
              ))}
              <li className="nav-item ms-lg-auto d-none d-lg-flex">
                <LocaleSwitch {...{ locale, current, routes, localeNames }} />
              </li>
            </ul>
            <div className="lang-mobile d-flex d-lg-none">
              <LocaleSwitch {...{ locale, current, routes, localeNames }} />
            </div>
          </div>
        </div>
      </nav>
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
    <>
      {LOCALES.map((code) => (
        <Link
          key={code}
          href={routes[code][current]}
          className={`lang-btn me-2${code === locale ? " active" : ""}`}
          aria-current={code === locale ? "true" : undefined}
        >
          {localeNames[code]}
        </Link>
      ))}
    </>
  );
}
