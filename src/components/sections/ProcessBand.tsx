import type { ProcessSection } from "@/content/types";

/**
 * Satu-satunya pita gelap di beranda: empat tahap PMD-1 → PMD-2.
 *
 * Sengaja hanya satu — gelap dipakai untuk menandai bagian yang berbeda sifatnya (proses,
 * bukan penawaran), bukan sebagai latar sepanjang halaman.
 */
export function ProcessBand({ content }: { readonly content: ProcessSection }) {
  return (
    <section className="process-band section-auto">
      <div className="container-fluid">
        <div className="process-head">
          <h2>{content.title}</h2>
          {content.note && <span className="process-note">{content.note}</span>}
        </div>

        <ol className="process-grid">
          {content.steps.map((step) => (
            <li className="process-step" key={step.step + step.title}>
              <span className="process-number">{step.step}</span>
              <span className="process-title">{step.title}</span>
              <span className="process-body">{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
