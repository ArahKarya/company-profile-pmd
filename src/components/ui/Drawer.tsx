"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "./IconButton";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  side?: "right" | "left";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  side = "right",
  size = "md",
  children,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
    >
      <button
        type="button"
        aria-label="Tutup drawer"
        className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute top-0 bottom-0 w-full bg-surface-card border-ink-900 dark:border-paper-base flex flex-col animate-fade-in",
          sizeMap[size],
          side === "right" ? "right-0 border-l-2" : "left-0 border-r-2"
        )}
      >
        {(title || description) && (
          <header className="flex items-start justify-between gap-4 p-6 border-b-2 border-surface-border-bold">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 id="drawer-title" className="text-heading-lg text-text-primary">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-body-sm text-text-secondary mt-1">{description}</p>
              )}
            </div>
            <IconButton aria-label="Tutup" onClick={onClose} variant="ghost" size="sm">
              <X size={20} strokeWidth={1.75} />
            </IconButton>
          </header>
        )}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </div>
  );
}
