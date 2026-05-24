import Link from "next/link";

/**
 * TEMPORARY landing page during refactor.
 * Will be replaced in Fase 3 (locale routing) — root redirects to /id.
 */
export default function Home() {
  return (
    <main
      id="main"
      className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400 mb-6">
        01 — Refactor In Progress
      </div>
      <h1 className="font-display text-display-md md:text-display-xl text-text-primary mb-6 max-w-3xl">
        PT Pangan Masa Depan
      </h1>
      <p className="text-body-lg text-text-secondary max-w-xl mb-12">
        Foundation tokens sudah terpasang. Halaman publik dibangun ulang di fase
        selanjutnya.
      </p>
      <Link
        href="/dev/showcase"
        className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-md uppercase tracking-wider rounded-xs hover:translate-y-[-2px] transition-transform shadow-md hover:shadow-lg"
      >
        Lihat Design System →
      </Link>
    </main>
  );
}
