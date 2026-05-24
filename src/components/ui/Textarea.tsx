import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "error";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[100px] px-4 py-3 bg-surface-card text-text-primary text-body-md rounded-xs border-2 transition-colors duration-fast placeholder:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-pmd-gold-500 resize-y",
          variant === "default" && "border-surface-border-bold",
          variant === "error" && "border-danger focus:border-danger",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
