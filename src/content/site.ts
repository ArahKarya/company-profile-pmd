import type { SiteConfig } from "./types";

/**
 * Locale-independent facts about the company.
 *
 * Angka dan kontak di sini diambil dari company profile PMD 2025; alamatnya memakai versi
 * footer compro, yang dipakai di seluruh halamannya.
 *
 * Logo resmi ada di public/brand/: logo-light.png (versi putih, untuk latar gelap),
 * logo-dark.png (versi warna, untuk latar terang), favicon.png (mark tanpa tagline).
 */
export const site: SiteConfig = {
  name: "Pangan Masa Depan",

  logo: {
    src: "/brand/logo-light.png",
    alt: "PT Pangan Masa Depan",
    width: 1604,
    height: 405,
  },
  favicon: "/brand/favicon.png",

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

  email: "info@panganmasadepan.com",
  careersEmail: "info@panganmasadepan.com",
  phones: ["+62 811-3880-0034"],
  addressLines: [
    "Jalan Rancahan, Blok Sukamelang RT 08/04",
    "Karangmulya, Kec. Kandanghaur",
    "Kabupaten Indramayu, Jawa Barat 45254",
  ],

  /**
   * Map embed. This keyless `output=embed` form takes a plain place query, so it works
   * without a Google Maps API key — swap the `q=` value for your own address, or paste a
   * full "Embed a map" URL from Google Maps in its place.
   */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Kandanghaur%2C%20Indramayu%2C%20Jawa%20Barat&z=13&output=embed",

  copyright: "©2026 PT Pangan Masa Depan",
};
