"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/cn";

type ToastTone = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  tone: ToastTone;
  duration: number;
}

interface ToastContextValue {
  show: (message: string, options?: { tone?: ToastTone; duration?: number }) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toneIcons: Record<ToastTone, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toneClasses: Record<ToastTone, string> = {
  success: "border-l-success",
  error: "border-l-danger",
  warning: "border-l-warning",
  info: "border-l-info",
};

interface ToasterProps {
  children: React.ReactNode;
}

export function Toaster({ children }: ToasterProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, options?: { tone?: ToastTone; duration?: number }) => {
      const id = Math.random().toString(36).slice(2);
      const toast: Toast = {
        id,
        message,
        tone: options?.tone ?? "info",
        duration: options?.duration ?? 4000,
      };
      setToasts((prev) => [...prev.slice(-2), toast]);
      if (toast.duration > 0) {
        setTimeout(() => remove(id), toast.duration);
      }
    },
    [remove]
  );

  const value: ToastContextValue = {
    show,
    success: (m) => show(m, { tone: "success" }),
    error: (m) => show(m, { tone: "error" }),
    warning: (m) => show(m, { tone: "warning" }),
    info: (m) => show(m, { tone: "info" }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => {
          const Icon = toneIcons[t.tone];
          return (
            <div
              key={t.id}
              role="status"
              className={cn(
                "pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-md bg-surface-card border-2 border-surface-border-bold border-l-[6px] shadow-md p-4 rounded-xs animate-fade-up",
                toneClasses[t.tone]
              )}
            >
              <Icon size={20} strokeWidth={1.75} />
              <p className="flex-1 text-body-sm text-text-primary pt-0.5">
                {t.message}
              </p>
              <button
                type="button"
                aria-label="Tutup"
                onClick={() => remove(t.id)}
                className="text-text-muted hover:text-text-primary"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <Toaster>");
  return ctx;
}
