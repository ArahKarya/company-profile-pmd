import type { LocaleContent } from "./types";
import { site } from "./site";

/**
 * Indonesian copy — PT Pangan Masa Depan.
 * `**bold**` inside a headline line renders as <b>.
 */
export const id: LocaleContent = {
  localeName: "IDN",

  nav: {
    home: "Beranda",
    about: "Tentang Kami",
    services: "Produk",
    careers: "Karier",
    contact: "Kontak",
  },

  meta: {
    home: {
      title: "PT Pangan Masa Depan",
      description:
        "Penggilingan beras modern berkapasitas 300 ton per hari di Indramayu, Jawa Barat. Mitra terpercaya distributor, retailer, dan industri pangan.",
    },
    about: {
      title: "Tentang Kami | PT Pangan Masa Depan",
      description: "Visi, misi, dan perjalanan PT Pangan Masa Depan sejak 2021.",
    },
    services: {
      title: "Produk | PT Pangan Masa Depan",
      description: "Beras premium, beras medium, dan produk turunan hasil penggilingan.",
    },
    careers: {
      title: "Karier | PT Pangan Masa Depan",
      description: "Tumbuh bersama industri pangan modern Indonesia.",
    },
    contact: {
      title: "Kontak | PT Pangan Masa Depan",
      description: "Hubungi tim kami untuk kuotasi, kemitraan, atau kunjungan fasilitas.",
    },
  },

  footer: { officeLabel: "Kantor & Pabrik", contactsLabel: "Kontak" },

  home: {
    hero: {
      headline: ["Penggilingan Beras Modern", "untuk Ketahanan Pangan", "Indonesia."],
      body: "Kapasitas 300 ton per hari di Indramayu, Jawa Barat. Mitra terpercaya bagi distributor, retailer, dan industri pangan yang menuntut mutu konsisten di setiap pengiriman.",
      scrollCue: "Gulir untuk Jelajahi",
      background: {
        desktop: "/images/hero-home-desktop.jpg",
        mobile: "/images/hero-home-mobile.jpg",
      },
    },

    intro: {
      body: [
        "Berdiri sejak 2021, PT Pangan Masa Depan mengolah gabah menjadi beras siap konsumsi dengan lini produksi modern dan kendali mutu di setiap tahap. Fasilitas kami di Kandanghaur, Indramayu, berdiri di jantung salah satu lumbung padi terbesar Jawa Barat.",
        "Prinsip zero waste kami jalankan secara nyata: seluruh hasil samping penggilingan — menir, bekatul, hingga sekam — diolah kembali menjadi produk bernilai, bukan dibuang.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Lini penggilingan beras", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Tim produksi di lantai pabrik", width: 1200, height: 900 },
      ],
    },

    features: {
      items: [
        {
          id: "beras-premium",
          label: "Beras Premium",
          eyebrow: "Lini Produk",
          headline: ["Beras premium", "untuk rumah tangga,", "hotel, dan restoran"],
          body: "Cruise dan Wa Lemu diproses selektif dari gabah pilihan — butiran utuh, bersih, tanpa pengawet, pewarna, maupun pengharum tambahan.",
          image: { src: "/images/feature-processing.jpg", alt: "Beras premium hasil sortasi", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Lihat produk", shortLabel: "Telusuri" },
        },
        {
          id: "kapasitas",
          label: "Kapasitas",
          eyebrow: "Fasilitas",
          headline: ["300 ton per hari", "dengan kendali mutu", "di setiap tahap"],
          body: "Dari penerimaan gabah, pengeringan, penggilingan, sortasi warna, hingga pengemasan — seluruhnya berlangsung di fasilitas kami sendiri sehingga spesifikasi terjaga dari batch ke batch.",
          image: { src: "/images/feature-power.jpg", alt: "Fasilitas penggilingan berkapasitas besar", width: 1400, height: 900 },
          link: { href: site.routes.id.about, label: "Tentang fasilitas", shortLabel: "Telusuri" },
        },
        {
          id: "zero-waste",
          label: "Zero Waste",
          eyebrow: "Keberlanjutan",
          headline: ["Seluruh hasil samping", "diolah kembali", "menjadi produk bernilai"],
          body: "Menir, bekatul, dan sekam padi tidak berakhir sebagai limbah. Sekam kami olah menjadi pellet energi terbarukan yang mengurangi ketergantungan pada bahan bakar fosil.",
          image: { src: "/images/feature-logistics.jpg", alt: "Produk turunan hasil penggilingan", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Lihat produk turunan", shortLabel: "Telusuri" },
        },
      ],
    },

    gallery: {
      caption: "Klik untuk Perbesar",
      images: [
        { src: "/images/gallery-1.jpg", alt: "Lini mesin penggilingan" },
        { src: "/images/gallery-2.jpg", alt: "Bangunan fasilitas pabrik" },
        { src: "/images/gallery-3.jpg", alt: "Pemeriksaan mutu beras" },
        { src: "/images/gallery-4.jpg", alt: "Operator mengoperasikan mesin" },
        { src: "/images/gallery-5.jpg", alt: "Armada distribusi" },
        { src: "/images/gallery-6.jpg", alt: "Tim di lantai produksi" },
        { src: "/images/gallery-7.jpg", alt: "Fasilitas pada malam hari" },
      ],
    },

    closing: {
      headline: ["Mari bangun rantai pasok pangan", "yang **lebih dapat diandalkan**."],
      art: "/brand/closing-art.svg",
    },
  },

  about: {
    hero: {
      headline: [
        "PT Pangan Masa Depan Menghadirkan **Beras Bermutu**",
        "untuk **Meja Makan Indonesia**",
      ],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan bergerak di bidang penggilingan dan distribusi beras. Berdiri sejak 2021 di Kandanghaur, Indramayu, kami berdedikasi memajukan industri pangan Indonesia melalui teknologi modern dan praktik produksi berkelanjutan.",

    vision: {
      eyebrow: "Visi Kami",
      headline: ["Menjadi penggilingan beras **modern** yang", "menopang ketahanan pangan nasional."],
      body: [
        "Kami bertujuan menjadi mitra utama distributor, retailer, dan industri pangan di Indonesia — pilihan pertama bagi pelanggan yang mengutamakan konsistensi mutu dan keandalan pasokan.",
        "Dengan komitmen berkelanjutan pada kualitas, inovasi proses, dan kepuasan pelanggan.",
      ],
      media: [{ src: "/images/about-vision.jpg", alt: "Fasilitas penggilingan beras", width: 1200, height: 900 }],
    },

    mission: {
      eyebrow: "Misi Kami",
      headline: ["**Menyediakan** beras bermutu", "dengan proses modern", "dan **ramah lingkungan**"],
      body: [
        "Menyediakan beras berkualitas premium untuk kebutuhan rumah tangga, horeca, dan industri pangan.",
        "Menjaga mutu di setiap tahap, dari penerimaan gabah hingga pengiriman akhir ke pelanggan.",
        "Mengolah seluruh hasil samping penggilingan menjadi produk bernilai — menjalankan prinsip zero waste secara nyata.",
        "Mengembangkan kemampuan tim melalui pelatihan dan standar kerja yang terukur.",
      ],
      media: [
        { src: "/images/about-mission-1.jpg", alt: "Penerimaan gabah", width: 1000, height: 800 },
        { src: "/images/about-mission-2.jpg", alt: "Penanganan beras di gudang", width: 1000, height: 800 },
        { src: "/images/about-mission-3.jpg", alt: "Tim produksi", width: 1000, height: 800 },
      ],
      art: "/brand/closing-art.svg",
    },
  },

  services: {
    overview: {
      id: "overview",
      label: "Produk Kami",
      eyebrow: "Lini Produk",
      headline: ["Produk Kami"],
      body: [
        "Lini produk kami terbagi dua: beras konsumsi untuk rumah tangga, horeca, dan grosir; serta produk turunan hasil penggilingan yang diolah kembali dari hasil samping produksi.",
        "Seluruh produk melewati kendali mutu terstandarisasi sebelum dikemas dan dikirim.",
      ],
      image: { src: "/images/service-detail-1.jpg", alt: "Beras hasil penggilingan", width: 1200, height: 800 },
    },

    categories: [
      {
        id: "beras",
        label: "Beras Konsumsi",
        panel: {
          id: "beras",
          label: "Beras Konsumsi",
          eyebrow: "Lini Produk",
          headline: ["Beras Konsumsi"],
          body: [
            "Tiga merek beras kami diproses dari gabah pilihan dengan sortasi warna dan kendali mutu bertingkat, menyasar segmen rumah tangga hingga pasar premium.",
          ],
          image: { src: "/images/feature-processing.jpg", alt: "Beras konsumsi", width: 1400, height: 900 },
        },
        children: [
          {
            id: "cruise",
            label: "Cruise",
            headline: ["Cruise"],
            body: [
              "Elegan, murni, dan selektif. Cocok untuk konsumsi rumah tangga, hotel, restoran, dan pasar premium.",
            ],
            image: { src: "/images/gallery-1.jpg", alt: "Beras Cruise" },
          },
          {
            id: "wa-lemu",
            label: "Wa Lemu",
            headline: ["Wa Lemu"],
            body: [
              "Long grain pilihan keluarga Indonesia. Cocok untuk konsumsi rumah tangga, kuliner, dan grosir.",
            ],
            image: { src: "/images/gallery-2.jpg", alt: "Beras Wa Lemu" },
          },
          {
            id: "nick-well",
            label: "Nick Well",
            headline: ["Nick Well"],
            body: [
              "Beras medium tanpa pengawet, pewarna, dan pengharum. Cocok untuk konsumsi rumah tangga, kuliner premium, dan grosir.",
            ],
            image: { src: "/images/gallery-4.jpg", alt: "Beras Nick Well" },
          },
        ],
      },
      {
        id: "turunan",
        label: "Produk Turunan",
        panel: {
          id: "turunan",
          label: "Produk Turunan",
          eyebrow: "Zero Waste",
          headline: ["Produk Turunan"],
          body: [
            "Hasil samping penggilingan kami olah kembali menjadi produk bernilai — bukan limbah. Inilah wujud nyata prinsip zero waste di fasilitas kami.",
          ],
          image: { src: "/images/feature-logistics.jpg", alt: "Produk turunan penggilingan", width: 1400, height: 900 },
        },
        children: [
          {
            id: "menir",
            label: "Menir",
            headline: ["Menir"],
            body: [
              "Butiran beras patah berukuran jauh lebih kecil dari beras utuh. Meski ukurannya kecil, kandungan gizinya mirip beras utuh.",
            ],
            image: { src: "/images/gallery-3.jpg", alt: "Menir" },
          },
          {
            id: "bekatul",
            label: "Bekatul",
            headline: ["Bekatul"],
            body: [
              "Lapisan luar beras yang kaya nutrisi — serat, vitamin B kompleks, mineral, dan antioksidan.",
            ],
            image: { src: "/images/gallery-6.jpg", alt: "Bekatul" },
          },
          {
            id: "sekam-pellet",
            label: "Sekam Padi Pellet",
            headline: ["Sekam Padi Pellet"],
            body: [
              "Sumber energi terbarukan dari limbah pertanian yang membantu mengurangi ketergantungan pada bahan bakar fosil.",
            ],
            image: { src: "/images/gallery-7.jpg", alt: "Pellet sekam padi" },
          },
        ],
      },
    ],
  },

  careers: {
    headline: ["**Bergabunglah**", "Bersama Kami"],
    body: [
      "Tumbuh bersama industri pangan modern Indonesia. Untuk membangun rantai pasok pangan yang lebih baik, kami membutuhkan individu dengan kemampuan terbaik.",
    ],
    emailLabel: "Kirim CV ke",
    image: { src: "/images/careers.jpg", alt: "Tim PT Pangan Masa Depan", width: 2000, height: 1000 },
  },

  contact: {
    headline: ["Mari", "mulai", "percakapan"],
    officeLabel: "Kantor & Pabrik",
  },
};
