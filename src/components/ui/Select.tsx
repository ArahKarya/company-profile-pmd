import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "error";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 px-3 text-body-sm rounded-xs",
  md: "h-10 px-4 text-body-md rounded-xs",
  lg: "h-12 px-5 text-body-md rounded-sm",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none bg-surface-card text-text-primary border-2 transition-colors duration-fast pr-10 focus:outline-none focus:border-pmd-gold-500 disabled:opacity-50 disabled:cursor-not-allowed",
            sizeMap[size],
            variant === "default" && "border-surface-border-bold",
            variant === "error" && "border-danger focus:border-danger",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>
    );
  }
);
Select.displayName = "Select";
