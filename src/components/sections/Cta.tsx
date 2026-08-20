import Link from "next/link";
import { Headline } from "@/components/ui/RichText";
import type { CtaSection } from "@/content/types";

/** Pita ajakan sebelum footer: latar emas 100, satu tombol, tanpa ornamen. */
export function Cta({ content }: { readonly content: CtaSection }) {
  return (
    <section className="cta-band section-auto">
      <div className="container-fluid">
        <div className="cta-inner">
          <Headline lines={content.headline} as="h2" className="marker-none" />
          <Link href={content.button.href} className="btn-fill">
            {content.button.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
