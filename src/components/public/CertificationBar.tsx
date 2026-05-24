import { Container } from "@/components/ui/layout/Container";
import { Award } from "lucide-react";
import { cn } from "@/lib/cn";

const DEFAULT_CERTS = [
  { code: "HALAL", label: "MUI Halal" },
  { code: "BPOM", label: "BPOM RI" },
  { code: "ISO 22000", label: "Food Safety Management" },
  { code: "SNI", label: "Standar Nasional Indonesia" },
] as const;

interface CertificationBarProps {
  items?: ReadonlyArray<{ code: string; label: string }>;
  tone?: "light" | "dark";
  className?: string;
}

export function CertificationBar({
  items = DEFAULT_CERTS,
  tone = "light",
  className,
}: CertificationBarProps) {
  return (
    <section
      aria-label="Sertifikasi"
      className={cn(
        "border-y-2",
        tone === "light"
          ? "bg-surface-section border-ink-900/10 dark:border-paper-base/10"
          : "bg-ink-900 text-paper-base border-paper-base/10",
        className
      )}
    >
      <Container size="2xl" padded>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-current/10 py-8">
          {items.map((c, idx) => (
            <div
              key={c.code}
              className={cn(
                "flex items-center gap-4 px-6",
                idx === 0 && "pl-0"
              )}
            >
              <Award
                size={32}
                strokeWidth={1.5}
                className="shrink-0 text-pmd-gold-600 dark:text-pmd-gold-400"
              />
              <div>
                <div className="font-display text-heading-md leading-tight">
                  {c.code}
                </div>
                <div className="font-mono text-mono-xs uppercase tracking-wider opacity-70">
                  {c.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
