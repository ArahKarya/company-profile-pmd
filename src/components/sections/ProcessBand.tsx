"use client";

import { useState } from "react";
import type { ProcessSection } from "@/content/types";

/**
 * Rel alur produksi: gabah di ujung kiri, beras kemasan di ujung kanan, dan tahap-tahap
 * bernomor di antaranya.
 *
 * Dua lapis interaksi:
 * - kartu tahap **membalik** saat disentuh kursor atau menerima fokus keyboard, menampilkan
 *   foto tahap tersebut di sisi belakangnya;
 * - **mengklik** kartu membuka panel rincian di bawah rel — foto besar, penjelasan, dan
 *   poin apa yang dicatat serta apa keluarannya.
 *
 * Membalik ditangani CSS (`:hover`, `:focus-visible`) supaya tetap jalan tanpa JavaScript
 * dan otomatis mati saat pengunjung meminta gerak minimal; state di sini hanya menyimpan
 * tahap mana yang sedang terbuka. Satu-satunya pita gelap di beranda.
 */
export function ProcessBand({ content }: { readonly content: ProcessSection }) {
  const [openStep, setOpenStep] = useState<string | null>(null);
  const active = content.steps.find((step) => step.step === openStep) ?? null;

  return (
    <section className="process-band section-auto">
      <div className="container-fluid">
        <div className="process-head">
          <h2>{content.title}</h2>
          {content.note && <span className="process-note">{content.note}</span>}
        </div>

        <div className="process-rail">
          {content.from && (
            <div className="process-endpoint" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.from.image.src} alt="" />
              <span>{content.from.label}</span>
            </div>
          )}

          <ol className="process-grid">
            {content.steps.map((step) => {
              const open = step.step === openStep;
              return (
                <li key={step.step}>
                  <button
                    type="button"
                    className={`process-step${open ? " open" : ""}`}
                    aria-expanded={open}
                    aria-controls="process-detail"
                    onClick={() => setOpenStep(open ? null : step.step)}
                  >
                    <span className="process-card">
                      <span className="process-face process-front">
                        <span className="process-number">{step.step}</span>
                        {step.unit && <span className="process-unit">{step.unit}</span>}
                        <span className="process-title">{step.title}</span>
                        <span className="process-body">{step.body}</span>
                        <span className="process-more">
                          {open ? content.closeLabel : content.moreLabel}{" "}
                          <span aria-hidden="true">→</span>
                        </span>
                      </span>
                      <span
                        className="process-face process-back"
                        style={{ backgroundImage: `url(${step.image.src})` }}
                      >
                        <span className="process-back-label">{step.title}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {content.to && (
            <div className="process-endpoint" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.to.image.src} alt="" />
              <span>{content.to.label}</span>
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
