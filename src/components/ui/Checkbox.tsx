import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "sm" | "md";
}

const sizeMap = {
  sm: { box: "h-4 w-4", icon: 12 },
  md: { box: "h-5 w-5", icon: 14 },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size = "md", checked, ...props }, ref) => {
    const dims = sizeMap[size];
    return (
      <span className={cn("inline-flex items-center", className)}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center rounded-xs border-2 border-ink-900 dark:border-paper-base transition-colors duration-fast",
            "peer-checked:bg-ink-900 peer-checked:text-paper-base dark:peer-checked:bg-paper-base dark:peer-checked:text-ink-900",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-pmd-gold-500 peer-focus-visible:outline-offset-2",
            "peer-disabled:opacity-50",
            dims.box
          )}
        >
          {checked && <Check size={dims.icon} strokeWidth={3} />}
        </span>
      </span>
    );
  }
);
Checkbox.displayName = "Checkbox";
