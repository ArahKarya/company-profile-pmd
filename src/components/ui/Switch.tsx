import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "sm" | "md";
}

const sizeMap = {
  sm: { rail: "h-5 w-9", thumb: "h-3 w-3 translate-x-0.5 peer-checked:translate-x-5" },
  md: { rail: "h-6 w-11", thumb: "h-4 w-4 translate-x-0.5 peer-checked:translate-x-6" },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = "md", ...props }, ref) => {
    const dims = sizeMap[size];
    return (
      <span className={cn("inline-flex items-center", className)}>
        <input ref={ref} type="checkbox" role="switch" className="peer sr-only" {...props} />
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-block border-2 border-ink-900 dark:border-paper-base bg-surface-card transition-colors duration-fast peer-checked:bg-pmd-gold-500 peer-focus-visible:outline-2 peer-focus-visible:outline-pmd-gold-500 peer-focus-visible:outline-offset-2 peer-disabled:opacity-50",
            dims.rail
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 bg-ink-900 dark:bg-paper-base transition-transform duration-default ease-snap",
              dims.thumb
            )}
          />
        </span>
      </span>
    );
  }
);
Switch.displayName = "Switch";
