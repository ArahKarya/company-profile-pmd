import Link from "next/link";
import { Headline } from "@/components/ui/RichText";
import type { SplitHeroSection } from "@/content/types";

/**
 * Hero beranda: naskah di kiri di atas kanvas terang, foto sebagai blok di kanan dengan
 * bidang emas menyembul di belakangnya.
 *
 * Berbeda dari `Hero` (foto satu layar penuh) yang masih dipakai halaman interior: di sini
 * judul dibaca di atas kertas, bukan di atas foto, jadi bobotnya bisa tebal dan kontrasnya
 * tidak bergantung pada bagian foto mana yang kebetulan terang.
 */
export function SplitHero({ content }: { readonly content: SplitHeroSection }) {
  return (
    <section className="hero-split section-auto">
      <div className="container-fluid">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-lg-6 hero-split-copy">
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            <Headline lines={content.headline} className="marker-none" />
            {content.body && <p className="lede">{content.body}</p>}
            {content.actions && content.actions.length > 0 && (
              <div className="d-flex flex-wrap gap-2 pt-2">
                {content.actions.map((action) => (
                  <Link
                    key={action.href + action.label}
                    href={action.href}
                    className={action.variant === "outline" ? "btn-line" : "btn-fill"}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-6">
            <div className="hero-split-figure">
              <span className="hero-split-block" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
