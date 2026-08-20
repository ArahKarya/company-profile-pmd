import Link from "next/link";
import { Headline } from "@/components/ui/RichText";
import type { CardsSection } from "@/content/types";

/**
 * Grid kartu produk: foto di atas, judul, satu paragraf, dan tautan.
 *
 * Menggantikan penelusur klik di beranda lama — semua lini terbaca sekaligus, tanpa
 * mengharuskan pengunjung menemukan bahwa daftar di kiri bisa diklik.
 */
export function Cards({
  content,
  index,
}: {
  readonly content: CardsSection;
  /** Nomor seksi pada halaman, mis. "02" — penanda bergaya lembar spesifikasi. */
  readonly index?: string;
}) {
  return (
    <section className="cards section-auto">
      <div className="container-fluid">
        <div className="cards-head">
          <div>
            <span className="section-label">
              {index && <span className="section-index">{index}</span>}
              {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            </span>
            <Headline lines={content.headline} as="h2" className="marker-none" />
          </div>
          {content.link && (
            <Link href={content.link.href} className="text-link">
              {content.link.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <hr className="rule" />

        <div className="card-grid">
          {content.items.map((item, position) => (
            <article className="product-card" key={item.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
              <div className="product-card-body">
                <span className="card-index">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.link && (
                  <Link href={item.link.href} className="text-link">
                    {item.link.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
