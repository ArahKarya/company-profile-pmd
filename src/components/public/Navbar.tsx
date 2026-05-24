"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useSearchParams, usePathname } from "next/navigation";

const navItems = {
  id: [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/products", label: "Produk" },
    { href: "/career", label: "Karir" },
    { href: "/contact", label: "Kontak" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/career", label: "Career" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = (searchParams.get("lang") ?? "id") as "id" | "en";
  const items = navItems[locale];
  const langQuery = `?lang=${locale}`;
  const isHome = pathname === "/";
  const isTransparent = !scrolled && isHome;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = isTransparent
    ? "bg-transparent"
    : "bg-white shadow-sm";
  const textColor = isTransparent
    ? "text-white"
    : "text-gray-800";
  const logoColor = isTransparent
    ? "text-white"
    : "text-pmd-dark";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={`/${langQuery}`} className={`flex items-center gap-3 ${logoColor} transition-colors`}>
            <div className="w-10 h-10 bg-pmd-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PMD</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg leading-tight block">PANGAN MASA DEPAN</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}${langQuery}`}
                className={`${textColor} hover:text-pmd-gold text-sm font-medium tracking-wide uppercase transition-colors`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher variant={isTransparent ? "dark" : "light"} />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${textColor} transition-colors`}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white rounded-b-xl shadow-lg pb-6 -mx-6 px-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}${langQuery}`}
                className="block py-3 text-gray-800 hover:text-pmd-gold-text font-medium text-sm uppercase tracking-wide border-b border-gray-100 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <LanguageSwitcher variant="light" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
