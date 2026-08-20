import Link from "next/link";
import { Headline } from "@/components/ui/RichText";
import type { CardsSection } from "@/content/types";

/**
 * Grid kartu produk: foto di atas, judul, satu paragraf, dan tautan.
 *
 * Menggantikan penelusur klik di beranda lama — semua lini terbaca sekaligus, tanpa
 * mengharuskan pengunjung menemukan bahwa daftar di kiri bisa diklik.
 */
export function Cards({ content }: { readonly content: CardsSection }) {
  return (
    <section className="cards section-auto">
      <div className="container-fluid">
        <div className="cards-head">
          <div>
            {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
            <Headline lines={content.headline} as="h2" className="marker-none" />
          </div>
          {content.link && (
            <Link href={content.link.href} className="text-link">
              {content.link.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <div className="card-grid">
          {content.items.map((item) => (
            <article className="product-card" key={item.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
              <div className="product-card-body">
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
