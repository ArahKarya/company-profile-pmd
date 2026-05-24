import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-surface-page text-text-primary"
    >
      <div className="font-display text-display-2xl text-pmd-gold-500 leading-none mb-4">
        404
      </div>
      <h1 className="font-display text-display-sm text-text-primary mb-4">
        Halaman tidak ditemukan
      </h1>
      <p className="text-body-lg text-text-secondary max-w-md mb-8">
        URL yang Anda buka tidak tersedia. Mungkin sudah dipindahkan atau dihapus.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-12 px-6 bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-sm uppercase tracking-wider rounded-xs hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-lg"
      >
        <Home size={16} strokeWidth={1.75} />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
