import type { SiteConfig } from "./types";

/**
 * Locale-independent facts about the company.
 *
 * This is the first file to edit when rebranding. Colours live in
 * `src/styles/theme.css` under `:root`.
 *
 * TODO(PMD): the contact block below is still placeholder — ganti dengan alamat,
 * telepon dan email PT Pangan Masa Depan yang sebenarnya (atau ubah lewat /admin).
 */
export const site: SiteConfig = {
  name: "Pangan Masa Depan",

  logo: {
    src: "/brand/logo-light.svg",
    alt: "PT Pangan Masa Depan",
    width: 340,
    height: 120,
  },
  favicon: "/brand/logo-dark.svg",

  /**
   * Routes per locale. The Indonesian pages sit at the root and the English ones under
   * /en, which is the usual arrangement for an Indonesian company site. Change the
   * strings here and every link, language switch and active-state check follows.
   *
   * `services` is the produk page: /produk and /en/products.
   */
  routes: {
    id: {
      home: "/",
      about: "/tentang",
      services: "/produk",
      careers: "/karier",
      contact: "/kontak",
    },
    en: {
      home: "/en",
      about: "/en/about",
      services: "/en/products",
      careers: "/en/careers",
      contact: "/en/contact",
    },
  },

  email: "info@panganmasadepan.co.id",
  careersEmail: "karier@panganmasadepan.co.id",
  phones: ["+62 21 000 0000", "+62 811 0000 000 (Penjualan)", "+62 812 0000 0000 (Pembelian Gabah)"],
  addressLines: ["Jl. Contoh Raya No. 1", "Kabupaten Contoh — Jawa Tengah 00000"],

  /**
   * Map embed. This keyless `output=embed` form takes a plain place query, so it works
   * without a Google Maps API key — swap the `q=` value for your own address, or paste a
   * full "Embed a map" URL from Google Maps in its place.
   */
  mapEmbedUrl: "https://maps.google.com/maps?q=Jawa%20Tengah&z=10&output=embed",

  copyright: "©2026 PT Pangan Masa Depan",
};
