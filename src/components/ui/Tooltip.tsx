import { cn } from "@/lib/cn";

interface TooltipProps {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const sideMap = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

/**
 * CSS-only tooltip — appears on hover/focus. For richer behavior
 * (delay, click trigger, portal), consider Radix UI in a later phase.
 */
export function Tooltip({ content, side = "top", children, className }: TooltipProps) {
  return (
    <span className={cn("relative inline-flex group", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "absolute pointer-events-none z-50 px-2 py-1 bg-ink-900 text-paper-base dark:bg-paper-base dark:text-ink-900 font-mono text-mono-xs uppercase tracking-wider whitespace-nowrap rounded-xs opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-within:opacity-100",
          sideMap[side]
        )}
      >
        {content}
      </span>
    </span>
  );
}
