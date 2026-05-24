import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { cn } from "@/lib/cn";

interface HeroIndustrialProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  stats?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

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
        "relative isolate overflow-hidden bg-ink-900 text-paper-base",
        className
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-transparent"
          />
        </>
      )}
      <Container size="2xl" padded className="relative z-10 py-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-end">
          <div className="max-w-3xl">
            {eyebrow && (
              <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-400 mb-6">
                {eyebrow}
              </div>
            )}
            <h1 className="font-display text-display-md md:text-display-xl lg:text-display-2xl text-paper-base leading-none mb-6">
              {title}
            </h1>
            {subtitle && (
              <p className="text-body-lg text-paper-base/80 max-w-2xl mb-8">
                {subtitle}
              </p>
            )}
            {actions && (
              <div className="flex flex-wrap items-center gap-4">{actions}</div>
            )}
          </div>
          {stats && (
            <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-pmd-gold-500 pt-6 lg:pt-0 lg:pl-10">
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
        "bg-surface-section border-b-2 border-ink-900 dark:border-paper-base",
        className
      )}
    >
      <Container size="2xl" padded className="py-16 md:py-24">
        {eyebrow && (
          <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400 mb-4">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-display-md md:text-display-lg text-text-primary max-w-4xl">
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
