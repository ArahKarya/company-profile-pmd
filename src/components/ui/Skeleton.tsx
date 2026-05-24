import { cn } from "@/lib/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rect" | "text" | "circle";
}

export function Skeleton({ className, shape = "rect", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-steel-100 dark:bg-steel-700 animate-pulse",
        shape === "rect" && "rounded-xs",
        shape === "text" && "h-4 rounded-xs",
        shape === "circle" && "rounded-full",
        className
      )}
      {...props}
    />
  );
}
