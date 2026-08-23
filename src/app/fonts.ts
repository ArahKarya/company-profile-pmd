import { Archivo, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Plus Jakarta Sans — tipografi utama PMD.
 *
 * Bobot 700 untuk judul (tegas tapi tidak berteriak), 400/500/600 untuk teks dan label.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

/**
 * Archivo — lapis teknis: nomor tahap, satuan, kode unit, keterangan, dan label kecil
 * huruf kapital.
 *
 * Grotesk padat yang dirancang untuk cetakan berukuran kecil dan papan penanda. Dalam huruf
 * kapital berjarak, ia terbaca seperti label mesin — memberi kesan pabrik tanpa memakai
 * monospace yang cenderung terbaca seperti terminal komputer.
 *
 * Bukan monospace, jadi lebar angkanya tidak seragam secara bawaan; deretan angka yang perlu
 * sejajar (pita statistik, nomor stasiun) meminta `font-variant-numeric: tabular-nums`.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});
