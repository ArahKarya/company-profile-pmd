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
}: {
  readonly images: readonly ImageAsset[];
  readonly caption: string;
}) {
  const { open, overlay } = useLightbox(images);

  return (
    <section className="gallery section-auto">
      <div className="container-fluid">
        <div className="gallery-grid">
          {images.map((image, index) => (
            <a
              key={image.src + index}
              href={image.src}
              className="gallery-tile"
              onClick={(event) => {
                event.preventDefault();
                open(index);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} />
            </a>
          ))}
        </div>

        <div className="gallery-caption">
          {caption}
          <i className="bi bi-zoom-in ms-2" aria-hidden="true" />
        </div>
      </div>
      {overlay}
    </section>
  );
}
