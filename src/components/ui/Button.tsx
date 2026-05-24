import { forwardRef } from "react";
import { Slot } from "@/components/ui/Slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono font-medium uppercase tracking-wider transition-all duration-fast ease-snap focus-visible:outline-pmd-gold-500 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink-900 text-paper-base hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none dark:bg-paper-base dark:text-ink-900",
        secondary:
          "bg-pmd-gold-500 text-ink-900 hover:-translate-y-0.5 hover:shadow-gold-md active:translate-y-0 active:shadow-none",
        outline:
          "border-2 border-ink-900 bg-transparent text-text-primary hover:bg-ink-900 hover:text-paper-base dark:border-paper-base dark:hover:bg-paper-base dark:hover:text-ink-900",
        ghost:
          "bg-transparent text-text-primary hover:bg-surface-sunken active:bg-surface-border",
        danger:
          "bg-danger text-paper-base hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none",
        link: "bg-transparent text-text-primary underline-offset-4 hover:underline normal-case font-sans tracking-normal",
      },
      size: {
        sm: "h-8 px-3 text-mono-xs rounded-xs",
        md: "h-10 px-4 text-mono-sm rounded-xs",
        lg: "h-12 px-6 text-mono-sm rounded-sm",
        xl: "h-14 px-8 text-mono-md rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      loading,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Spinner size="sm" /> : leadingIcon}
        {children}
        {!loading && trailingIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
