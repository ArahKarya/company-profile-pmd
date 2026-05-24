"use client";

import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";
import { cn } from "@/lib/cn";

interface AdminTopbarProps {
  user?: { name?: string | null; email?: string | null };
  logoutAction?: () => Promise<void>;
  className?: string;
}

export function AdminTopbar({ user, logoutAction, className }: AdminTopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 bg-surface-page border-b-2 border-surface-border-bold flex items-center justify-end gap-4 px-6",
        className
      )}
    >
      <ThemeToggle />

      {user && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-3 h-10 px-3 border-2 border-ink-900 dark:border-paper-base hover:bg-surface-sunken transition-colors"
          >
            <div className="w-7 h-7 bg-pmd-gold-500 text-ink-900 flex items-center justify-center font-mono text-mono-sm font-semibold">
              {(user.name ?? user.email ?? "?").slice(0, 1).toUpperCase()}
            </div>
            <span className="font-mono text-mono-sm uppercase tracking-wider hidden sm:block">
              {user.name ?? user.email}
            </span>
          </button>
          {menuOpen && (
            <>
              <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-10"
              />
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 z-20 min-w-[200px] bg-surface-card border-2 border-ink-900 dark:border-paper-base shadow-md"
              >
                <div className="px-4 py-3 border-b border-surface-border">
                  <div className="font-mono text-mono-xs uppercase text-text-muted">
                    Logged in
                  </div>
                  <div className="text-body-sm text-text-primary truncate mt-1">
                    {user.email}
                  </div>
                </div>
                {logoutAction && (
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="w-full px-4 py-3 flex items-center gap-3 text-body-sm text-danger hover:bg-surface-sunken transition-colors"
                      role="menuitem"
                    >
                      <LogOut size={16} strokeWidth={1.75} />
                      Keluar
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {!user && (
        <div className="flex items-center gap-2 text-text-muted">
          <User size={16} strokeWidth={1.75} />
          <span className="font-mono text-mono-sm">Tamu</span>
        </div>
      )}
    </header>
  );
}
