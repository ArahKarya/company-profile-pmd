import { Headline } from "@/components/ui/RichText";
import { getSite } from "@/server/content";
import type { CareersContent } from "@/content/types";

export async function Careers({ content }: { readonly content: CareersContent }) {
  const site = await getSite();

  return (
    <section className="closing section-auto d-flex flex-column pt-nav">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-7">
            <Headline lines={content.headline} />
            {content.body.map((paragraph) => (
              <p key={paragraph} className="mt-4">
                {paragraph}
              </p>
            ))}
            <div className="d-flex align-items-center flex-wrap gap-3 mt-5 mb-5">
              <p className="mb-0">{content.emailLabel}</p>
              <a href={`mailto:${site.careersEmail}`} className="pill-tag text-decoration-none">
                {site.careersEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.image.src}
        alt={content.image.alt}
        width={content.image.width}
        height={content.image.height}
        className="w-100 h-auto mt-3"
      />
    </section>
  );
}
