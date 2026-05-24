"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Lang");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      role="radiogroup"
      aria-label={t("switch")}
      className={cn(
        "inline-flex items-center border-2 border-ink-900 dark:border-paper-base",
        className
      )}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={locale === l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "h-8 px-3 font-mono text-mono-xs uppercase tracking-wider transition-colors duration-fast",
            locale === l
              ? "bg-ink-900 text-paper-base dark:bg-paper-base dark:text-ink-900"
              : "text-text-secondary hover:bg-surface-sunken"
          )}
        >
          {t(l)}
        </button>
      ))}
    </div>
  );
}
