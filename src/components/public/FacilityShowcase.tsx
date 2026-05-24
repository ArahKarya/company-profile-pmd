import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { cn } from "@/lib/cn";

interface FacilitySpec {
  label: string;
  value: string;
}

interface FacilityShowcaseProps {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  specs?: FacilitySpec[];
  className?: string;
}

export function FacilityShowcase({
  title,
  description,
  imageUrl,
  imageAlt,
  specs,
  className,
}: FacilityShowcaseProps) {
  return (
    <section className={cn("relative bg-ink-900 text-paper-base", className)}>
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
      </div>
      <Container size="2xl" padded className="relative -mt-32 md:-mt-40 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-md md:text-display-lg leading-none mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-body-lg text-paper-base/80">{description}</p>
          )}
        </div>
        {specs && specs.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper-base/20 border-2 border-paper-base/30">
            {specs.map((s, idx) => (
              <div key={idx} className="bg-ink-900 p-6">
                <dt className="font-mono text-mono-xs uppercase tracking-[0.15em] text-pmd-gold-400 mb-2">
                  {s.label}
                </dt>
                <dd className="font-display text-display-sm leading-none">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
