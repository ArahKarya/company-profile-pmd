import { Container } from "@/components/ui/layout/Container";
import { cn } from "@/lib/cn";

interface CTABannerProps {
  eyebrow?: string;
  title: string;
  body?: string;
  actions: React.ReactNode;
  tone?: "dark" | "gold";
  className?: string;
}

export function CTABanner({
  eyebrow,
  title,
  body,
  actions,
  tone = "dark",
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        tone === "dark" && "bg-ink-900 text-paper-base",
        tone === "gold" && "bg-pmd-gold-500 text-ink-900",
        className
      )}
    >
      <Container size="2xl" padded className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-center">
          <div>
            {eyebrow && (
              <div
                className={cn(
                  "font-mono text-mono-sm uppercase tracking-[0.15em] mb-4",
                  tone === "dark" ? "text-pmd-gold-400" : "text-ink-800"
                )}
              >
                {eyebrow}
              </div>
            )}
            <h2 className="font-display text-display-md md:text-display-lg leading-none mb-4">
              {title}
            </h2>
            {body && (
              <p
                className={cn(
                  "text-body-lg max-w-xl",
                  tone === "dark" ? "text-paper-base/80" : "text-ink-700"
                )}
              >
                {body}
              </p>
            )}
          </div>
          <div className="flex lg:justify-end">
            <div className="flex flex-wrap items-center gap-4">{actions}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
