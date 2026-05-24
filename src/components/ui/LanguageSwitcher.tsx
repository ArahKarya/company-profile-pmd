"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

export default function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = searchParams.get("lang") ?? "id";

  function switchTo(locale: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", locale);
    router.push(`${pathname}?${params.toString()}`);
  }

  const inactiveClass = variant === "dark"
    ? "text-white/80 hover:text-white"
    : "text-gray-700 hover:text-pmd-gold-text";

  const dividerClass = variant === "dark"
    ? "text-white/40"
    : "text-gray-300";

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchTo("id")}
        className={`px-2 py-1 rounded transition-colors ${
          currentLocale === "id"
            ? "bg-amber-500 text-white font-semibold"
            : inactiveClass
        }`}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <span className={dividerClass}>|</span>
      <button
        onClick={() => switchTo("en")}
        className={`px-2 py-1 rounded transition-colors ${
          currentLocale === "en"
            ? "bg-amber-500 text-white font-semibold"
            : inactiveClass
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
