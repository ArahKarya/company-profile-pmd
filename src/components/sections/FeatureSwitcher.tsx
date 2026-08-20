"use client";

import { useState } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Headline } from "@/components/ui/RichText";
import type { FeatureItem } from "@/content/types";

/**
 * Click-driven switcher: a vertical list of labels beside one visible panel.
 *
 * Panels are mounted and toggled with a class rather than conditionally rendered, so their
 * images are already loaded when the visitor switches and the swap is instant.
 */
export function FeatureSwitcher({ items }: { readonly items: readonly FeatureItem[] }) {
  const [active, setActive] = useState(items[0].id);

  return (
    <section className="d-flex align-items-center">
      <div className="container-fluid h-100 my-5 flex-column">
        <div className="switcher-layout gutter-1-mobile flex-column flex-md-row">
          <div
            className="switcher-nav flex-row flex-md-column mb-4 mb-md-0 gap-4 gap-md-0"
            role="tablist"
            aria-label={items[0].eyebrow}
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === active}
                aria-controls={`feature-${item.id}`}
                className={`switcher-item btn-plain${
                  item.id === active ? " active" : ""
                }`}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              id={`feature-${item.id}`}
              role="tabpanel"
              className={`switcher-panel${item.id === active ? " active" : ""}`}
            >
              <div className="row align-items-center gy-4">
                <div className="col-12 col-md-6 d-flex flex-column">
                  <span className="eyebrow">{item.eyebrow}</span>
                  <Headline lines={item.headline} />
                  <p>{item.body}</p>
                  {item.link && (
                    <div className="mt-auto">
                      <ArrowLink
                        href={item.link.href}
                        label={item.link.label}
                        shortLabel={item.link.shortLabel}
                      />
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="w-100 h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
