import { Headline } from "@/components/ui/RichText";
import type { ClientsSection } from "@/content/types";

/**
 * Daftar klien dan mitra dagang.
 *
 * Ditulis sebagai teks, bukan logo: logo pihak ketiga menuntut izin pemakaian dan berkas
 * beresolusi benar dari masing-masing pemiliknya. Deretan nama dalam grid bergaris juga
 * lebih menyatu dengan lembar spesifikasi di seksi lain.
 */
export function Clients({
  content,
  index,
}: {
  readonly content: ClientsSection;
  /** Nomor seksi pada halaman, mis. "03". */
  readonly index?: string;
}) {
  return (
    <section className="clients section-auto">
      <div className="container-fluid">
        <div className="cards-head">
          <div>
            <span className="section-label">
              {index && <span className="section-index">{index}</span>}
              {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            </span>
            <Headline lines={content.headline} as="h2" className="marker-none" />
          </div>
          {content.note && <span className="clients-note">{content.note}</span>}
        </div>

        <hr className="rule" />

        <ul className="client-grid">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {content.footnote && <p className="clients-footnote">{content.footnote}</p>}
      </div>
    </section>
  );
}
