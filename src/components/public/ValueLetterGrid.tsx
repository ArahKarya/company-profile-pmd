import { cn } from "@/lib/cn";

interface Value {
  letter: string;
  name: string;
  description: string;
}

const TERDEPAN: Value[] = [
  { letter: "T", name: "Tanggung Jawab", description: "Komitmen pada kualitas dan keselamatan pangan" },
  { letter: "E", name: "Efisiensi", description: "Optimalisasi proses produksi modern" },
  { letter: "R", name: "Realibilitas", description: "Konsistensi kualitas untuk mitra jangka panjang" },
  { letter: "D", name: "Dedikasi", description: "Pengabdian pada ketahanan pangan Indonesia" },
  { letter: "E", name: "Ekselensi", description: "Standar internasional di setiap tahap" },
  { letter: "P", name: "Profesionalisme", description: "Tim ahli dengan etika kerja tinggi" },
  { letter: "A", name: "Adaptif", description: "Responsif terhadap kebutuhan pasar" },
  { letter: "N", name: "Nasionalisme", description: "Bangga produk lokal untuk Indonesia" },
];

interface ValueLetterGridProps {
  values?: Value[];
  className?: string;
}

export function ValueLetterGrid({
  values = TERDEPAN,
  className,
}: ValueLetterGridProps) {
  return (
    <ul
      aria-label="Nilai TERDEPAN"
      className={cn(
        "grid grid-cols-2 sm:grid-cols-4 gap-0 border-2 border-ink-900 dark:border-paper-base",
        className
      )}
    >
      {values.map((v, idx) => (
        <li
          key={idx}
          className={cn(
            "p-6 flex flex-col gap-3 bg-surface-card border-ink-900 dark:border-paper-base transition-colors duration-default hover:bg-pmd-gold-50 dark:hover:bg-pmd-gold-950/30",
            "[&:not(:nth-child(4n))]:border-r-2",
            "[&:nth-last-child(n+5)]:border-b-2"
          )}
        >
          <span
            aria-hidden="true"
            className="font-display text-display-lg leading-none text-pmd-gold-700 dark:text-pmd-gold-400"
          >
            {v.letter}
          </span>
          <div>
            <h3 className="font-display text-heading-md text-text-primary mb-1">
              {v.name}
            </h3>
            <p className="text-body-sm text-text-secondary">{v.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
