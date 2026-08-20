import type { SiteConfig } from "./types";

/**
 * Locale-independent facts about PT Pangan Masa Depan.
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
  careersEmail: "careers@panganmasadepan.com",
  phones: ["+62 811-3880-0034 (Sales)"],
  addressLines: [
    "Desa Karangmulya, Kec. Kandanghaur",
    "Kabupaten Indramayu — Jawa Barat 45254",
  ],

  mapEmbedUrl:
    "https://maps.google.com/maps?q=Kandanghaur%20Indramayu%20Jawa%20Barat&z=13&output=embed",

  copyright: "©2026 PT Pangan Masa Depan",
};
