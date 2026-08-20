import { Headline } from "@/components/ui/RichText";
import type { AboutContent } from "@/content/types";

/** Vision block: copy on one side, a single image on the other. */
export function Vision({ content }: { readonly content: AboutContent["vision"] }) {
  const [image] = content.media;
  return (
    <section className="d-flex align-items-center">
      <div className="container-fluid h-100">
        <div className="row align-items-center gy-4">
          <div className="col-12 col-md-6 d-flex flex-column">
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            {content.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {content.headline && <Headline lines={content.headline} className="mt-4" />}
          </div>
          <div className="col-12 col-md-6 split-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mission block: headline and bullets over a staggered image trio and the art strip. */
export function Mission({ content }: { readonly content: AboutContent["mission"] }) {
  return (
    <section className="section-auto position-relative pt-5">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 col-md-8 d-flex flex-column">
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            {content.headline && <Headline lines={content.headline} />}
          </div>
        </div>

        <div className="row gy-4 align-items-start mb-5">
          {content.media.map((image, index) => (
            <div className="col-12 col-md-4" key={image.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className={`w-100 h-auto${index === 1 ? " mt-md-5" : ""}`}
              />
              <p className="mt-3">{content.body[index]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="closing-art" aria-hidden="true">
        <span className="art-layer" style={{ backgroundImage: `url(${content.art})` }} />
      </div>
    </section>
  );
}
