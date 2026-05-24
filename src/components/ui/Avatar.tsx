import Image from "next/image";
import { cn } from "@/lib/cn";

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: { box: "h-6 w-6", text: "text-mono-xs", px: 24 },
  sm: { box: "h-8 w-8", text: "text-mono-sm", px: 32 },
  md: { box: "h-10 w-10", text: "text-body-sm", px: 40 },
  lg: { box: "h-12 w-12", text: "text-body-md", px: 48 },
  xl: { box: "h-16 w-16", text: "text-heading-md", px: 64 },
};

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const dims = sizeMap[size];
  const initials = (fallback ?? alt)
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-sm bg-steel-100 dark:bg-steel-700 text-ink-800 dark:text-paper-base font-mono font-semibold border border-surface-border-bold",
        dims.box,
        dims.text,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={dims.px}
          height={dims.px}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
