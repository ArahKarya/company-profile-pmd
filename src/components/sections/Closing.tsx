import { Headline } from "@/components/ui/RichText";
import type { ClosingSection } from "@/content/types";

/** Closing band: a headline over a decorative artwork strip. */
export function Closing({ content }: { readonly content: ClosingSection }) {
  return (
    <section className="closing section-auto d-flex flex-column justify-content-center position-relative">
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-12 col-lg-8">
            <Headline lines={content.headline} />
          </div>
        </div>
      </div>
      <div className="closing-art mt-4" aria-hidden="true">
        <span className="art-layer" style={{ backgroundImage: `url(${content.art})` }} />
      </div>
    </section>
  );
}
