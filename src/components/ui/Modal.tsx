"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "./IconButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  /** Show close button in header (default true) */
  closable?: boolean;
}

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  closable = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closable) onClose();
    };
    document.addEventListener("keydown", handleKey);

    // Focus first focusable element
    dialogRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose, closable]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      <button
        type="button"
        aria-label="Tutup modal"
        className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm animate-fade-in"
        onClick={closable ? onClose : undefined}
      />
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full bg-surface-card border-2 border-ink-900 dark:border-paper-base shadow-lg rounded-sm overflow-hidden animate-fade-up",
          sizeMap[size]
        )}
      >
        {(title || closable) && (
          <header className="flex items-start justify-between gap-4 p-6 border-b-2 border-surface-border-bold">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 id="modal-title" className="text-heading-lg text-text-primary">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="text-body-sm text-text-secondary mt-1">
                  {description}
                </p>
              )}
            </div>
            {closable && (
              <IconButton
                aria-label="Tutup"
                onClick={onClose}
                variant="ghost"
                size="sm"
              >
                <X size={20} strokeWidth={1.75} />
              </IconButton>
            )}
          </header>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "-mx-6 -mb-6 mt-6 px-6 py-4 bg-surface-sunken border-t-2 border-surface-border-bold flex items-center justify-end gap-3",
        className
      )}
      {...props}
    />
  );
}
