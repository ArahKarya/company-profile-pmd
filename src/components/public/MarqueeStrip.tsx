import { useTranslations } from "next-intl";

/**
 * Industrial running-text strip above Navbar.
 * CSS-only marquee (animate-marquee from globals.css).
 */
export function MarqueeStrip() {
  const t = useTranslations("Marquee");
  const content = t("items");

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden bg-ink-900 dark:bg-paper-darker text-paper-base py-2 border-b-2 border-pmd-gold-500"
    >
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        <MarqueeRow content={content} />
        <MarqueeRow content={content} />
      </div>
    </div>
  );
}

function MarqueeRow({ content }: { content: string }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12 font-mono text-mono-xs uppercase tracking-[0.15em] text-pmd-gold-300">
      <span>{content}</span>
      <span aria-hidden="true">·</span>
    </div>
  );
}
