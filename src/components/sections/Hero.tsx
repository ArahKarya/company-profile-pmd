import { Headline } from "@/components/ui/RichText";
import type { HeroSection } from "@/content/types";

/**
 * Full-bleed hero. The background is set inline because it comes from content rather than
 * from the stylesheet; the mobile variant is applied through a CSS custom property that
 * `theme.css` picks up below the `sm` breakpoint.
 */
export function Hero({ content }: { readonly content: HeroSection }) {
  return (
    <section
      className="hero d-flex align-items-end"
      style={{ backgroundImage: `url(${content.background.desktop})` }}
    >
      <div className="container-fluid h-100 position-relative pb-5">
        <div className="row w-100 align-items-end mb-5">
          <div className="col-12 col-md-7">
            <Headline lines={content.headline} />
          </div>
          <div className="col-12 col-md-1" />
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            {content.body && <p>{content.body}</p>}
          </div>
        </div>

        {content.scrollCue && (
          <div className="hero-scroll-cue d-none d-md-flex position-absolute start-50 bottom-0 translate-middle-x">
            <span className="cue-dot" aria-hidden="true">
              <i className="bi bi-chevron-down" />
            </span>
            <span className="cue-label">{content.scrollCue}</span>
            <span className="cue-line" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}

/** Shorter hero for interior pages: solid brand background, no scroll cue. */
export function CompactHero({
  content,
  statement,
}: {
  readonly content: HeroSection;
  readonly statement?: string;
}) {
  return (
    <section
      className="hero hero-compact d-flex align-items-center"
      style={{ backgroundImage: `url(${content.background.desktop})` }}
    >
      <div className="container-fluid h-100 flex-column">
        <div className="row w-100">
          <div className="col-12 col-lg-8">
            <Headline lines={content.headline} className="marker-none" />
          </div>
        </div>
        {statement && (
          <div className="row w-100 mt-4 mt-md-5">
            <div className="col-12 col-md-6 col-lg-4 ms-md-auto">
              <p>{statement}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
