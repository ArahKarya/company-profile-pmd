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

/**
 * Misi: daftar bernomor, lalu tiga foto sebagai jeda visual.
 *
 * Poin misi dirender sebagai daftar penuh — jumlahnya tidak lagi terikat pada jumlah foto,
 * seperti pada versi sebelumnya yang diam-diam memotong poin ke berapa pun foto yang ada.
 */
export function Mission({ content }: { readonly content: AboutContent["mission"] }) {
  return (
    <section className="section-auto position-relative pt-5">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12 col-md-8 d-flex flex-column">
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            {content.headline && <Headline lines={content.headline} as="h2" className="marker-none" />}
          </div>
        </div>

        <ol className="mission-list">
          {content.body.map((point, index) => (
            <li key={point}>
              <span className="mission-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{point}</span>
            </li>
          ))}
        </ol>

        <div className="row gy-4 align-items-start mb-5 mt-5">
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
