import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";

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
 * IBM Plex Mono — lapis teknis: nomor tahap, satuan, kode unit, keterangan foto, dan label
 * kecil huruf kapital.
 *
 * Perusahaan pengolahan hidup dari angka yang tercatat; huruf monospace membuat angka dan
 * kode terbaca sebagai data, bukan hiasan — dan itu yang memberi kesan pabrik, bukan brosur.
 */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});
