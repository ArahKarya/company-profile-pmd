"use client";

import { useLightbox } from "@/components/ui/Lightbox";
import type { ImageAsset } from "@/content/types";

/**
 * Photo grid with click-to-enlarge.
 *
 * The tiles stay anchors so the images remain reachable without JavaScript; the click
 * handler takes over when it is available.
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
    <section className="gallery d-flex align-items-center">
      <div className="container-fluid h-100 my-5 d-flex flex-column">
        <div className="row g-3 w-100">
          {images.map((image, index) => (
            <div className={index < 2 ? "col-6 col-md-3" : "col-6 col-md-3 col-lg-2"} key={image.src + index}>
              <a
                href={image.src}
                onClick={(event) => {
                  event.preventDefault();
                  open(index);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} className="ratio-tile" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-3 d-flex align-items-center">
          {caption}
          <i className="bi bi-zoom-in ms-2 accent" aria-hidden="true" />
        </div>
      </div>
      {overlay}
    </section>
  );
}
