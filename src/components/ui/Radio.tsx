import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "sm" | "md";
}

const sizeMap = {
  sm: { box: "h-4 w-4", dot: "h-1.5 w-1.5" },
  md: { box: "h-5 w-5", dot: "h-2 w-2" },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size = "md", checked, ...props }, ref) => {
    const dims = sizeMap[size];
    return (
      <span className={cn("inline-flex items-center", className)}>
        <input
          ref={ref}
          type="radio"
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center rounded-full border-2 border-ink-900 dark:border-paper-base transition-colors duration-fast peer-focus-visible:outline-2 peer-focus-visible:outline-pmd-gold-500 peer-focus-visible:outline-offset-2 peer-disabled:opacity-50",
            dims.box
          )}
        >
          {checked && (
            <span
              className={cn("rounded-full bg-ink-900 dark:bg-paper-base", dims.dot)}
            />
          )}
        </span>
      </span>
    );
  }
);
Radio.displayName = "Radio";
