import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const inputVariants = cva(
  "w-full bg-surface-card text-text-primary border-2 transition-colors duration-fast placeholder:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-pmd-gold-500",
  {
    variants: {
      variant: {
        default: "border-surface-border-bold",
        error: "border-danger focus:border-danger",
      },
      size: {
        sm: "h-8 px-3 text-body-sm rounded-xs",
        md: "h-10 px-4 text-body-md rounded-xs",
        lg: "h-12 px-5 text-body-md rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, leadingIcon, trailingIcon, ...props }, ref) => {
    if (leadingIcon || trailingIcon) {
      return (
        <div className="relative w-full">
          {leadingIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ variant, size }),
              leadingIcon && "pl-10",
              trailingIcon && "pr-10",
              className
            )}
            {...props}
          />
          {trailingIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {trailingIcon}
            </span>
          )}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { inputVariants };
