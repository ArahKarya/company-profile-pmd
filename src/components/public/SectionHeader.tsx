import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400 mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-display-sm md:text-display-md text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
