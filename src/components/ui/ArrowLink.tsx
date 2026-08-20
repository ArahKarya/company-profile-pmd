import Link from "next/link";

/**
 * Outlined text link with a trailing arrow. Shows the full label from `md` up and the short
 * one below it, which keeps the button from wrapping on narrow screens.
 */
export function ArrowLink({
  href,
  label,
  shortLabel,
}: {
  readonly href: string;
  readonly label: string;
  readonly shortLabel?: string;
}) {
  return (
    <Link href={href} className="link-button">
      <span className={shortLabel ? "d-none d-md-inline" : undefined}>{label}</span>
      {shortLabel && <span className="d-inline d-md-none">{shortLabel}</span>}
      <svg className="arrow" viewBox="0 0 21 4" fill="none" aria-hidden="true">
        <path d="M0 1.84H15.3" stroke="currentColor" strokeWidth="0.25" />
        <path d="M14.71 3.67V0L20.01 1.84Z" fill="currentColor" />
      </svg>
    </Link>
  );
}
