import { Headline } from "@/components/ui/RichText";
import type { ValuesSection } from "@/content/types";

/**
 * Nilai perusahaan sebagai akronim.
 *
 * Hurufnya berdiri di kolom kiri sebagai satu deret tegak, sehingga akronimnya terbaca dari
 * atas ke bawah — cara yang sama dipakai di company profile PMD.
 */
export function Values({
  content,
  index,
}: {
  readonly content: ValuesSection;
  /** Nomor seksi pada halaman, mis. "03". */
  readonly index?: string;
}) {
  return (
    <section className="values section-auto">
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

        <dl className="value-list">
          {content.items.map((item) => (
            <div className="value-row" key={item.letter + item.title}>
              <span className="value-letter" aria-hidden="true">
                {item.letter}
              </span>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
