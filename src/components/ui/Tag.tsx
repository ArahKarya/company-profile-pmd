import { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface TagBaseProps {
  active?: boolean;
  onRemove?: () => void;
  size?: "sm" | "md";
}

interface TagButtonProps
  extends TagBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  interactive: true;
}

interface TagStaticProps
  extends TagBaseProps,
    React.HTMLAttributes<HTMLSpanElement> {
  interactive?: false;
}

export type TagProps = TagButtonProps | TagStaticProps;

const sizeMap = {
  sm: "h-7 px-3 text-mono-xs",
  md: "h-8 px-4 text-mono-sm",
};

export const Tag = forwardRef<HTMLButtonElement | HTMLSpanElement, TagProps>(
  (props, ref) => {
    const { className, active, onRemove, size = "sm", children, ...rest } = props;

    const base = cn(
      "inline-flex items-center gap-2 font-mono uppercase tracking-wider border-2 transition-colors duration-fast rounded-xs",
      sizeMap[size],
      active
        ? "bg-ink-900 text-paper-base border-ink-900 dark:bg-paper-base dark:text-ink-900 dark:border-paper-base"
        : "bg-transparent text-text-primary border-surface-border-bold hover:border-ink-900 dark:hover:border-paper-base",
      className
    );

    if (props.interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-pressed={active}
          className={base}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={base}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Hapus"
            className="-mr-1 hover:text-danger"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = "Tag";
