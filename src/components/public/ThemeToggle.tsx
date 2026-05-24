"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("Theme");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("h-10 w-32", className)} aria-hidden="true" />;
  }

  const options = [
    { value: "light" as const, icon: Sun, label: t("light") },
    { value: "system" as const, icon: Monitor, label: t("system") },
    { value: "dark" as const, icon: Moon, label: t("dark") },
  ];

  return (
    <div
      role="radiogroup"
      aria-label={t("toggle")}
      className={cn(
        "inline-flex items-center border-2 border-ink-900 dark:border-paper-base",
        className
      )}
    >
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center justify-center h-8 w-9 transition-colors duration-fast",
            theme === value
              ? "bg-ink-900 text-paper-base dark:bg-paper-base dark:text-ink-900"
              : "text-text-secondary hover:bg-surface-sunken"
          )}
        >
          <Icon size={14} strokeWidth={1.75} />
        </button>
      ))}
    </div>
  );
}
