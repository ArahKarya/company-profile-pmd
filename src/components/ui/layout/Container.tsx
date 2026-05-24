import { cn } from "@/lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padded?: boolean;
}

const sizeMap = {
  sm: "max-w-[640px]",
  md: "max-w-[1024px]",
  lg: "max-w-[1280px]",
  xl: "max-w-[1440px]",
  "2xl": "max-w-[1600px]",
  full: "max-w-full",
};

export function Container({
  className,
  size = "lg",
  padded = true,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto",
        sizeMap[size],
        padded && "px-6 md:px-12 lg:px-16",
        className
      )}
      {...props}
    />
  );
}
