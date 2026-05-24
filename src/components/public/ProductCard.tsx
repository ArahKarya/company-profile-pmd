import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl?: string | null;
  category: "main" | "circular";
  features?: string[];
  className?: string;
}

export function ProductCard({
  name,
  description,
  imageUrl,
  category,
  features,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group bg-surface-card border-2 border-surface-border-bold transition-all duration-default hover:-translate-y-1 hover:border-ink-900 dark:hover:border-paper-base hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[4/3] bg-surface-sunken overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-smooth group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-display-md text-surface-border-bold">
              {name.slice(0, 1)}
            </span>
          </div>
        )}
        <Badge
          variant={category === "main" ? "gold" : "success"}
          size="md"
          className="absolute top-4 left-4"
        >
          {category === "main" ? "Produk Utama" : "Sirkular"}
        </Badge>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <h3 className="font-display text-heading-xl text-text-primary">{name}</h3>
        <p className="text-body-sm text-text-secondary line-clamp-3">
          {description}
        </p>
        {features && features.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-2">
            {features.slice(0, 3).map((f, idx) => (
              <li
                key={idx}
                className="px-2 py-1 bg-surface-sunken border border-surface-border font-mono text-mono-xs uppercase tracking-wider"
              >
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2 flex items-center gap-2 font-mono text-mono-sm uppercase tracking-wider text-pmd-gold-700 dark:text-pmd-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-default">
          Lihat Detail <ArrowUpRight size={16} strokeWidth={1.75} />
        </div>
      </div>
    </article>
  );
}
