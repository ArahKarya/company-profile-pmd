"use client";

import { useCallback, useEffect, useState } from "react";
import type { ImageAsset } from "@/content/types";

/**
 * Click-to-enlarge overlay for a set of images.
 *
 * Returns an `open(index)` callback and the overlay element to render. Wraps around at both
 * ends, closes on backdrop click or Escape, and steps with the arrow keys.
 */
export function useLightbox(images: readonly ImageAsset[]) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null ? null : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    // Stop the page behind the overlay from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, close, step]);

  const overlay =
    index === null ? null : (
      <div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={images[index].alt}
        onClick={close}
      >
        <button
          type="button"
          className="lightbox-nav"
          aria-label="Previous image"
          onClick={(event) => {
            event.stopPropagation();
            step(-1);
          }}
        >
          ‹
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index].src}
          alt={images[index].alt}
          onClick={(event) => event.stopPropagation()}
        />
        <button
          type="button"
          className="lightbox-nav"
          aria-label="Next image"
          onClick={(event) => {
            event.stopPropagation();
            step(1);
          }}
        >
          ›
        </button>
      </div>
    );

  return { open: setIndex, overlay };
}
