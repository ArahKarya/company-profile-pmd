import type { StatsSection } from "@/content/types";

/**
 * Pita angka: satu baris sel bergaris, tanpa latar warna.
 *
 * `value` adalah string, bukan angka, supaya sel bisa menampung penanda seperti "[ANGKA]"
 * selama datanya belum resmi — dan supaya format ribuan ditulis apa adanya oleh editor.
 */
export function Stats({ content }: { readonly content: StatsSection }) {
  if (content.items.length === 0) return null;

  return (
    <section className="stat-band section-auto">
      <div className="container-fluid">
        <div className="stat-grid">
          {content.items.map((item) => (
            <div className="stat-cell" key={item.label}>
              <span className="stat-value">
                {item.value}
                {item.unit && <span className="stat-unit"> {item.unit}</span>}
              </span>
              <span className="stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
