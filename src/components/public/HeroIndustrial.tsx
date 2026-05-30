import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { cn } from "@/lib/cn";

interface HeroIndustrialProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  stats?: React.ReactNode;
  /** Optional photographic background (rice grains / paddy field). Falls back to abstract warm pattern. */
  backgroundImage?: string;
  className?: string;
}

/**
 * Warm food-grade hero for rice industry.
 * Light cream base + optional photo + warm gradient overlay + sage accent.
 */
export function HeroIndustrial({
  eyebrow,
  title,
  subtitle,
  actions,
  stats,
  backgroundImage,
  className,
}: HeroIndustrialProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-paper-soft text-text-primary",
        className
      )}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 mix-blend-multiply"
        />
      )}

      {/* Layer 1: warm gold halo from right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_right,var(--pmd-gold-200)_0%,transparent_55%)]"
      />

      {/* Layer 2: cream wash for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-paper-soft via-paper-soft/85 to-paper-soft/30"
      />

      {/* Layer 3: sage daun padi accent bottom-right */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-pmd-green-300/30 -rotate-12 pointer-events-none"
      />

      {/* Layer 4: gold accent bar bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-1/3 bg-pmd-gold-500"
      />

      <Container size="2xl" padded className="relative z-10 py-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-end">
          <div className="max-w-3xl">
            {eyebrow && (
              <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 mb-6">
                {eyebrow}
              </div>
            )}
            <h1 className="font-display text-display-md md:text-display-xl lg:text-display-2xl text-ink-900 leading-none mb-6">
              {title}
            </h1>
            {subtitle && (
              <p className="text-body-lg text-text-secondary max-w-2xl mb-8">
                {subtitle}
              </p>
            )}
            {actions && (
              <div className="flex flex-wrap items-center gap-4">{actions}</div>
            )}
          </div>
          {stats && (
            <div className="dark bg-paper-darker text-text-on-inverted p-6 lg:p-8 border-l-4 border-pmd-gold-500 shadow-lg">
              {stats}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

interface HeroCompactProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function HeroCompact({
  eyebrow,
  title,
  subtitle,
  className,
}: HeroCompactProps) {
  return (
    <section
      className={cn(
        "relative bg-surface-section border-b-2 border-pmd-gold-500/40 overflow-hidden",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--pmd-gold-100)_0%,transparent_60%)]"
      />
      <Container size="2xl" padded className="relative py-16 md:py-24">
        {eyebrow && (
          <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 mb-4">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-display-md md:text-display-lg text-ink-900 max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
