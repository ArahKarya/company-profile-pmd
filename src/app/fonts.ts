import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Plus Jakarta Sans — tipografi sistem PMD.
 *
 * Bobot 200 dipakai untuk judul besar (cukup tipis untuk gaya lapang, masih terbaca di
 * layar kecil — bobot 100 terlalu tipis untuk huruf Latin), 700 untuk penekanan di dalam
 * judul, 400/600 untuk teks dan label.
 *
 * Diekspos sebagai CSS variable; `theme.css` menariknya lewat `--font-body`, dengan
 * fallback ke stack Bootstrap kalau kelasnya tidak terpasang.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});
