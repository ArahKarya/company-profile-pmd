import { Headline } from "@/components/ui/RichText";
import type { SplitSection } from "@/content/types";

/**
 * Naskah diapit satu atau dua foto.
 *
 * Paragraf pertama dirender sebagai *lead*: berukuran lebih besar dan rata kiri, supaya
 * pernyataan pembuka terbaca sebagai pernyataan — bukan sebagai paragraf brosur.
 */
export function Split({
  content,
  className = "",
}: {
  readonly content: SplitSection;
  readonly className?: string;
}) {
  const [first, second] = content.media;

  return (
    <section className={`d-flex align-items-center ${className}`}>
      <div className="container-fluid h-100">
        <div className="row align-items-center gy-4">
          <div className={`col-12 col-md-3 split-media${content.mediaFirst ? "" : " order-md-1"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={first.src} alt={first.alt} width={first.width} height={first.height} />
          </div>

          <div className="col-12 col-md-6 order-md-2 px-md-4 split-copy">
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            {content.headline && <Headline lines={content.headline} className="marker-none" />}
            {content.body.map((paragraph, position) => (
              <p key={paragraph} className={position === 0 ? "split-lead" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          {second && (
            <div className="col-12 col-md-3 order-md-3 split-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={second.src} alt={second.alt} width={second.width} height={second.height} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
