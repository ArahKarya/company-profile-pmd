import { Headline } from "@/components/ui/RichText";
import { getSite } from "@/server/content";
import type { ContactContent } from "@/content/types";

export async function Contact({ content }: { readonly content: ContactContent }) {
  const site = await getSite();

  return (
    <section className="section-auto d-flex align-items-center pt-nav pb-5">
      <div className="container-fluid w-100">
        <div className="row w-100 gy-5">
          <div className="col-12 col-md-6 d-flex flex-column">
            <Headline lines={content.headline} />
            <div className="mt-5 mt-md-auto">
              <b>{content.officeLabel}</b>
              <br />
              {site.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <br />
              {site.phones.map((phone) => (
                <span key={phone}>
                  {phone}
                  <br />
                </span>
              ))}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <iframe
              className="map-embed"
              src={site.mapEmbedUrl}
              title={content.officeLabel}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
