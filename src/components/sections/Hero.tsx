import { Headline } from "@/components/ui/RichText";
import type { HeroSection } from "@/content/types";

/**
 * Hero halaman interior: foto dengan tirai gelap, judul putih di atasnya.
 *
 * Beranda tidak lagi memakainya — di sana judul dibaca di atas kanvas terang (`SplitHero`).
 * Di halaman interior fotonya tetap berguna sebagai pembeda tempat, dan tingginya hanya
 * sekitar sepertiga layar, bukan satu layar penuh.
 */
export function CompactHero({
  content,
  statement,
}: {
  readonly content: HeroSection;
  readonly statement?: string;
}) {
  return (
    <section
      className="hero hero-compact d-flex align-items-center"
      style={{ backgroundImage: `url(${content.background.desktop})` }}
    >
      <div className="container-fluid h-100 flex-column">
        <div className="row w-100">
          <div className="col-12 col-lg-8">
            <Headline lines={content.headline} className="marker-none" />
          </div>
        </div>
        {statement && (
          <div className="row w-100 mt-4 mt-md-5">
            <div className="col-12 col-md-6 col-lg-4 ms-md-auto">
              <p>{statement}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
