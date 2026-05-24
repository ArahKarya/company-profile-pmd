import { cn } from "@/lib/cn";

interface StatBlockProps {
  value: string | number;
  label: string;
  unit?: string;
  caption?: string;
  align?: "left" | "center" | "right";
  size?: "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  md: "text-display-md md:text-display-lg",
  lg: "text-display-lg md:text-display-xl",
  xl: "text-display-xl md:text-display-2xl",
};

export function StatBlock({
  value,
  label,
  unit,
  caption,
  align = "left",
  size = "lg",
  className,
}: StatBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className
      )}
    >
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-display text-text-primary leading-none",
            sizeMap[size]
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-mono-md uppercase text-text-secondary">
            {unit}
          </span>
        )}
      </div>
      <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-text-secondary">
        {label}
      </div>
      {caption && (
        <p className="text-body-sm text-text-muted max-w-xs">{caption}</p>
      )}
    </div>
  );
}

interface StatGridProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "inverted";
}

export function StatGrid({
  children,
  className,
  tone = "default",
}: StatGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 divide-x-2",
        tone === "default"
          ? "divide-surface-border-bold"
          : "divide-paper-base/30",
        className
      )}
    >
      {children}
    </div>
  );
}
