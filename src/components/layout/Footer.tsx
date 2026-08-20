import { getContent, getSite } from "@/server/content";
import type { Locale } from "@/content/types";

export async function Footer({ locale }: { readonly locale: Locale }) {
  const [site, copy] = await Promise.all([getSite(), getContent(locale)]);

  return (
    <footer className="site-footer">
      <div className="container-fluid section-pad">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-4">
          <div className="d-flex flex-column justify-content-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.logo.src} alt={site.logo.alt} className="brand-logo" />
            <div className="d-none d-md-block mt-3">{site.copyright}</div>
          </div>

          <div className="d-flex flex-wrap justify-content-md-end justify-content-start gap-5 flex-grow-1">
            <div>
              <h2 className="footer-heading h5">{copy.footer.officeLabel}</h2>
              <p>
                {site.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            <div>
              <h2 className="footer-heading h5">{copy.footer.contactsLabel}</h2>
              <p>
                {site.phones.map((phone) => (
                  <span key={phone}>
                    {phone}
                    <br />
                  </span>
                ))}
                <a href={`mailto:${site.email}`} className="text-white">
                  {site.email}
                </a>
              </p>
            </div>

            {site.certification && (
              <div className="d-flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.certification.src}
                  alt={site.certification.alt}
                  className="certification"
                />
              </div>
            )}
          </div>
        </div>
        <div className="d-block d-md-none mt-4">{site.copyright}</div>
      </div>
    </footer>
  );
}
