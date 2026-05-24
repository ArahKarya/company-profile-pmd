import { MapPin, Phone, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface ContactItem {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
}

interface ContactBlockGridProps {
  items: ContactItem[];
  className?: string;
}

export function ContactBlockGrid({ items, className }: ContactBlockGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-ink-900 dark:border-paper-base",
        className
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <a
            key={idx}
            href={item.href}
            target={item.href?.startsWith("http") ? "_blank" : undefined}
            rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className={cn(
              "p-6 lg:p-8 bg-surface-card transition-colors duration-default hover:bg-surface-sunken group",
              idx !== items.length - 1 &&
                "border-b-2 md:border-b-0 md:border-r-2 border-ink-900 dark:border-paper-base"
            )}
          >
            <Icon
              size={32}
              strokeWidth={1.5}
              className="text-pmd-gold-600 dark:text-pmd-gold-400 mb-4 transition-transform duration-default group-hover:-translate-y-1"
            />
            <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-text-secondary mb-2">
              {item.label}
            </div>
            <div className="font-display text-heading-md text-text-primary">
              {item.value}
            </div>
          </a>
        );
      })}
    </div>
  );
}

export { MapPin, Phone, Mail };
