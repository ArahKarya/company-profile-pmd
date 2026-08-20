"use client";

import { useState } from "react";
import type { HotspotDiagram } from "@/content/types";

/**
 * A diagram whose regions swap the image while hovered or focused.
 *
 * Hotspot rectangles are percentages of the image box rather than absolute pixels, so they
 * track the image at any size without a resize listener. Each region is a real <button>,
 * which makes the diagram keyboard-reachable — an <area> map would not be.
 */
export function HotspotFigure({ diagram }: { readonly diagram: HotspotDiagram }) {
  const [active, setActive] = useState<string | null>(null);
  const current = diagram.hotspots.find((spot) => spot.id === active);

  return (
    <div className="hotspot-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current ? current.preview : diagram.base.src}
        alt={current ? `${diagram.base.alt} — ${current.label}` : diagram.base.alt}
        width={diagram.base.width}
        height={diagram.base.height}
      />
      {diagram.hotspots.map((spot) => {
        const [left, top, width, height] = spot.rect;
        return (
          <button
            key={spot.id}
            type="button"
            className="hotspot"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
            aria-label={spot.label}
            onMouseEnter={() => setActive(spot.id)}
            onMouseLeave={() => setActive((id) => (id === spot.id ? null : id))}
            onFocus={() => setActive(spot.id)}
            onBlur={() => setActive((id) => (id === spot.id ? null : id))}
          />
        );
      })}
    </div>
  );
}
