import { cloneElement, isValidElement, type ReactElement } from "react";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Minimal Slot implementation — merges props into the single child element.
 * Used by primitives that support `asChild` (Button, IconButton, etc.)
 * to compose with Next.js <Link>, anchor tags, etc.
 */
export function Slot({ children, ...props }: SlotProps) {
  if (!isValidElement(children)) return null;
  const child = children as ReactElement<Record<string, unknown>>;
  return cloneElement(child, {
    ...props,
    ...child.props,
    className: [(props as { className?: string }).className, (child.props as { className?: string }).className]
      .filter(Boolean)
      .join(" "),
  });
}
