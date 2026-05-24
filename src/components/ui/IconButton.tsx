import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-fast ease-snap focus-visible:outline-pmd-gold-500 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink-900 text-paper-base hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none dark:bg-paper-base dark:text-ink-900",
        ghost: "bg-transparent text-text-primary hover:bg-surface-sunken active:bg-surface-border",
        outline:
          "border-2 border-ink-900 bg-transparent text-text-primary hover:bg-ink-900 hover:text-paper-base dark:border-paper-base dark:hover:bg-paper-base dark:hover:text-ink-900",
      },
      size: {
        sm: "h-8 w-8 rounded-xs",
        md: "h-10 w-10 rounded-xs",
        lg: "h-12 w-12 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
