import { Headline } from "@/components/ui/RichText";
import type { SplitSection } from "@/content/types";

/**
 * Copy beside one or more images. With two images the layout brackets the text; with one
 * it is a plain two-column split.
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
          <div className={`col-12 col-md-4 split-media${content.mediaFirst ? "" : " order-md-1"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={first.src} alt={first.alt} width={first.width} height={first.height} />
          </div>

          <div className="col-12 col-md-4 order-md-2 text-md-center px-md-4">
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            {content.headline && <Headline lines={content.headline} className="marker-none" />}
            {content.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {second && (
            <div className="col-12 col-md-4 order-md-3 split-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={second.src} alt={second.alt} width={second.width} height={second.height} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
