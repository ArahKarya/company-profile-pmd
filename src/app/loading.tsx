import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface-page">
      <Spinner size="lg" className="text-pmd-gold-500" />
      <span className="font-mono text-mono-sm uppercase tracking-[0.15em] text-text-muted">
        Memuat...
      </span>
    </div>
  );
}
