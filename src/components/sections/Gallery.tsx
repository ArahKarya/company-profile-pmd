"use client";

import { useLightbox } from "@/components/ui/Lightbox";
import type { ImageAsset } from "@/content/types";

/**
 * Grid foto berukuran seragam dengan klik-untuk-perbesar.
 *
 * Ubinnya tetap anchor supaya foto tetap terjangkau tanpa JavaScript; penanganan klik
 * mengambil alih begitu JavaScript tersedia.
 */
export function Gallery({
  images,
  caption,
  index,
}: {
  readonly images: readonly ImageAsset[];
  readonly caption: string;
  /** Nomor seksi pada halaman, mis. "04". */
  readonly index?: string;
}) {
  const { open, overlay } = useLightbox(images);

  return (
    <section className="gallery section-auto">
      <div className="container-fluid">
        <div className="gallery-head">
          {index && <span className="section-index">{index}</span>}
          <span className="gallery-caption">
            {caption}
            <i className="bi bi-zoom-in ms-2" aria-hidden="true" />
          </span>
        </div>
        <hr className="rule" />

        <div className="gallery-grid">
          {images.map((image, position) => (
            <a
              key={image.src + position}
              href={image.src}
              className="gallery-tile"
              onClick={(event) => {
                event.preventDefault();
                open(position);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} />
            </a>
          ))}
        </div>
      </div>
      {overlay}
    </section>
  );
}
