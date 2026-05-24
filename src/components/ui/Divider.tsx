import { cn } from "@/lib/cn";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  weight?: "hair" | "thick" | "bold";
}

const weightMap = {
  horizontal: {
    hair: "h-px",
    thick: "h-0.5",
    bold: "h-1",
  },
  vertical: {
    hair: "w-px",
    thick: "w-0.5",
    bold: "w-1",
  },
};

export function Divider({
  className,
  orientation = "horizontal",
  weight = "hair",
  role = "separator",
  ...props
}: DividerProps) {
  return (
    <div
      role={role}
      aria-orientation={orientation}
      className={cn(
        "bg-surface-border-bold shrink-0",
        weightMap[orientation][weight],
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      {...props}
    />
  );
}
