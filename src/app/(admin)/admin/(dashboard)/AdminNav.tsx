"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, PAGE_ORDER } from "@/content/types";
import type { Role } from "@/generated/prisma/client";

const PAGE_LABEL: Record<(typeof PAGE_ORDER)[number], string> = {
  home: "Home",
  about: "About",
  services: "Services",
  careers: "Careers",
  contact: "Contact",
};

const LOCALE_LABEL: Record<(typeof LOCALES)[number], string> = {
  id: "Indonesian",
  en: "English",
};

export function AdminNav({ role }: { readonly role: Role }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav>
      <Link href="/admin" className={isActive("/admin") ? "active" : ""}>
        Dashboard
      </Link>

      {LOCALES.map((locale) => (
        <div key={locale}>
          <div className="section-label">{LOCALE_LABEL[locale]} content</div>
          {PAGE_ORDER.map((page) => {
            const href = `/admin/content/${locale}/${page}`;
            return (
              <Link key={page} href={href} className={isActive(href) ? "active" : ""}>
                {PAGE_LABEL[page]}
              </Link>
            );
          })}
        </div>
      ))}

      <div className="section-label">Settings</div>
      <Link href="/admin/site" className={isActive("/admin/site") ? "active" : ""}>
        Site &amp; contact
      </Link>
      <Link href="/admin/theme" className={isActive("/admin/theme") ? "active" : ""}>
        Brand colours
      </Link>
      <Link href="/admin/media" className={isActive("/admin/media") ? "active" : ""}>
        Media library
      </Link>
      {role === "ADMIN" && (
        <Link href="/admin/users" className={isActive("/admin/users") ? "active" : ""}>
          Users
        </Link>
      )}
    </nav>
  );
}
