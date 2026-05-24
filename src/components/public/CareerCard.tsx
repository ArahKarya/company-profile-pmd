import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface CareerCardProps {
  title: string;
  description: string;
  location: string;
  type: string;
  applyUrl: string;
  applyLabel: string;
  className?: string;
}

export function CareerCard({
  title,
  description,
  location,
  type,
  applyUrl,
  applyLabel,
  className,
}: CareerCardProps) {
  return (
    <article
      className={cn(
        "bg-surface-card border-2 border-surface-border-bold border-l-[6px] border-l-pmd-gold-500 p-6 transition-all duration-default hover:border-l-pmd-gold-600 hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display text-heading-xl text-text-primary mb-3">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="steel" size="sm">
              <MapPin size={10} strokeWidth={2} className="mr-1" />
              {location}
            </Badge>
            <Badge variant="outline" size="sm">
              <Briefcase size={10} strokeWidth={2} className="mr-1" />
              {type}
            </Badge>
          </div>
          <p className="text-body-md text-text-secondary line-clamp-3">
            {description}
          </p>
        </div>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-10 px-4 bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-sm uppercase tracking-wider rounded-xs hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-lg whitespace-nowrap"
        >
          {applyLabel}
          <ArrowUpRight size={16} strokeWidth={1.75} />
        </a>
      </div>
    </article>
  );
}
