import { cn } from "@/lib/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "page" | "section" | "sunken" | "inverted";
  density?: "tight" | "normal" | "spacious";
  as?: "section" | "div" | "article" | "header" | "footer";
}

const toneMap = {
  page: "bg-surface-page text-text-primary",
  section: "bg-surface-section text-text-primary",
  sunken: "bg-surface-sunken text-text-primary",
  inverted: "bg-surface-inverted text-text-on-inverted",
};

const densityMap = {
  tight: "py-12 md:py-16",
  normal: "py-20 md:py-24",
  spacious: "py-32 md:py-40",
};

export function Section({
  className,
  tone = "page",
  density = "normal",
  as: As = "section",
  ...props
}: SectionProps) {
  return (
    <As
      className={cn(toneMap[tone], densityMap[density], className)}
      {...props}
    />
  );
}
