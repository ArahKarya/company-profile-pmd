import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-mono font-medium uppercase tracking-wider rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        gold: "bg-pmd-gold-500 text-ink-900",
        ink: "bg-ink-900 text-paper-base dark:bg-paper-base dark:text-ink-900",
        steel: "bg-steel-100 text-ink-800 dark:bg-steel-700 dark:text-paper-base",
        success: "bg-pmd-green-100 text-pmd-green-800 dark:bg-pmd-green-900 dark:text-pmd-green-100",
        warning: "bg-pmd-gold-100 text-pmd-gold-800",
        danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        outline: "border-2 border-current text-text-primary bg-transparent",
      },
      size: {
        sm: "h-5 px-2 text-mono-xs",
        md: "h-6 px-2.5 text-mono-sm",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
