"use client";

import { useState } from "react";
import type { ProcessSection } from "@/content/types";

/**
 * Diagram alur produksi: satu garis mendatar dari gabah ke beras kemasan, dengan stasiun
 * bernomor duduk di sepanjang garis itu.
 *
 * Bentuknya sengaja diagram, bukan deretan kartu. Semua stasiun berbagi satu rel yang sama,
 * fotonya tampil redup seperti lembar kontak, lalu menyala begitu stasiunnya disorot — cara
 * membaca yang sama dengan papan proses di lantai pabrik.
 *
 * - **kursor lewat atau fokus keyboard** → foto stasiun itu menyala;
 * - **diklik** → panel rincian terbuka di bawah rel: foto besar, penjelasan, dan poin apa
 *   yang dicatat serta apa keluarannya.
 *
 * Menyala ditangani CSS (`:hover`, `:focus-visible`) sehingga tetap jalan tanpa JavaScript;
 * state di sini hanya menyimpan stasiun mana yang sedang terbuka.
 */
export function ProcessBand({
  content,
  index,
}: {
  readonly content: ProcessSection;
  /** Nomor seksi pada halaman, mis. "03". */
  readonly index?: string;
}) {
  const [openStep, setOpenStep] = useState<string | null>(null);
  const active = content.steps.find((step) => step.step === openStep) ?? null;

  return (
    <section className="process-band section-auto">
      <div className="container-fluid">
        <div className="process-head">
          {index && <span className="section-index">{index}</span>}
          <h2>{content.title}</h2>
          {content.note && <span className="process-note">{content.note}</span>}
        </div>

        <div className="rail">
          {content.from && (
            <div className="rail-end" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.from.image.src} alt="" />
              <span className="rail-end-label">{content.from.label}</span>
            </div>
          )}

          <ol className="rail-stations">
            {content.steps.map((step) => {
              const open = step.step === openStep;
              return (
                <li key={step.step}>
                  <button
                    type="button"
                    className={`station${open ? " open" : ""}`}
                    aria-expanded={open}
                    aria-controls="process-detail"
                    onClick={() => setOpenStep(open ? null : step.step)}
                  >
                    <span className="station-well">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={step.image.src} alt="" />
                    </span>
                    <span className="station-tick">
                      <span className="station-no">{step.step}</span>
                    </span>
                    <span className="station-label">{step.title}</span>
                    {step.unit && <span className="station-unit">{step.unit}</span>}
                    <span className="station-more">
                      {open ? content.closeLabel : content.moreLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {content.to && (
            <div className="rail-end" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.to.image.src} alt="" />
              <span className="rail-end-label">{content.to.label}</span>
            </div>
          )}
        </div>

        <div id="process-detail" className="process-detail" hidden={!active}>
          {active && (
            <div className="process-detail-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image.src}
                alt={active.image.alt}
                width={active.image.width}
                height={active.image.height}
              />
              <div className="process-detail-copy">
                <span className="process-detail-step">
                  {active.step}
                  {active.unit && <span className="process-unit"> · {active.unit}</span>}
                </span>
                <h3>{active.title}</h3>
                {active.detail.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {active.detail.points && active.detail.points.length > 0 && (
                  <ul>
                    {active.detail.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
