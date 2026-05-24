"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <main
      id="main"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-surface-page text-text-primary"
    >
      <AlertTriangle
        size={64}
        strokeWidth={1.25}
        className="text-danger mb-6"
      />
      <h1 className="font-display text-display-md text-text-primary mb-4">
        Terjadi kesalahan
      </h1>
      <p className="text-body-lg text-text-secondary max-w-md mb-8">
        Sistem mengalami gangguan. Tim kami sudah dinotifikasi.
      </p>
      {error.digest && (
        <p className="font-mono text-mono-xs uppercase tracking-wider text-text-muted mb-8">
          Reference ID: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 h-12 px-6 bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-sm uppercase tracking-wider rounded-xs hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-lg"
      >
        <RefreshCcw size={16} strokeWidth={1.75} />
        Coba lagi
      </button>
    </main>
  );
}
