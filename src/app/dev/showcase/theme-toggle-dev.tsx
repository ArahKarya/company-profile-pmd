"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggleDev() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 border border-ink-900 dark:border-paper-base">
      {(["light", "system", "dark"] as const).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          className={`px-3 py-2 font-mono text-mono-xs uppercase tracking-wider transition-colors ${
            theme === t
              ? "bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900"
              : "text-text-secondary hover:bg-surface-sunken"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
