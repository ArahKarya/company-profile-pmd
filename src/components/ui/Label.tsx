import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 font-mono text-mono-sm uppercase tracking-wider text-text-secondary",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-danger" aria-label="wajib diisi">
            *
          </span>
        )}
        {optional && (
          <span className="text-text-muted normal-case tracking-normal text-mono-xs">
            (opsional)
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";

interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "default" | "error" | "success";
}

export function HelperText({ className, tone = "default", ...props }: HelperTextProps) {
  return (
    <p
      className={cn(
        "text-body-sm",
        tone === "default" && "text-text-muted",
        tone === "error" && "text-danger",
        tone === "success" && "text-success",
        className
      )}
      {...props}
    />
  );
}

interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}
