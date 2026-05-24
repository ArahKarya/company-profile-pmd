import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; trend: "up" | "down" | "neutral" };
  icon?: LucideIcon;
  accent?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const accentMap = {
  default: "border-l-pmd-gold-500",
  success: "border-l-success",
  warning: "border-l-warning",
  danger: "border-l-danger",
};

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card border-2 border-surface-border-bold border-l-[6px] p-6",
        accentMap[accent],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-text-secondary mb-2">
            {label}
          </div>
          <div className="font-display text-display-sm text-text-primary leading-none">
            {value}
          </div>
        </div>
        {Icon && (
          <Icon
            size={28}
            strokeWidth={1.5}
            className="text-text-muted shrink-0"
          />
        )}
      </div>
      {delta && (
        <div
          className={cn(
            "mt-3 inline-flex items-center gap-1 font-mono text-mono-xs uppercase tracking-wider",
            delta.trend === "up" && "text-success",
            delta.trend === "down" && "text-danger",
            delta.trend === "neutral" && "text-text-muted"
          )}
        >
          {delta.trend === "up" && <TrendingUp size={12} />}
          {delta.trend === "down" && <TrendingDown size={12} />}
          {delta.value}
        </div>
      )}
    </div>
  );
}
