import { cn } from "@/lib/cn";

type Gap = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between" | "around";

interface StackProps extends React.HTMLAttributes<HTMLElement> {
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  as?: "div" | "section" | "ul" | "ol";
}

const gapMap: Record<Gap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

const alignMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export function Stack({
  className,
  gap = 4,
  align,
  justify,
  as: As = "div",
  ...props
}: StackProps) {
  return (
    <As
      className={cn(
        "flex flex-col",
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
      {...props}
    />
  );
}

interface InlineProps extends StackProps {
  wrap?: boolean;
}

export function Inline({
  className,
  gap = 4,
  align = "center",
  justify,
  wrap,
  as: As = "div",
  ...props
}: InlineProps) {
  return (
    <As
      className={cn(
        "flex flex-row",
        gapMap[gap],
        alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
}

export function Cluster({
  className,
  gap = 2,
  align = "center",
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap",
        gapMap[gap],
        alignMap[align],
        className
      )}
      {...props}
    />
  );
}
