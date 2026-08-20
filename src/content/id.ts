import type { LocaleContent } from "./types";
import { site } from "./site";

/**
 * Copy bahasa Indonesia untuk PT Pangan Masa Depan.
 * `**tebal**` di dalam baris headline dirender sebagai <b>.
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
        "PT Pangan Masa Depan mengolah gabah petani menjadi beras bermutu — pengeringan, penggilingan, penyosohan, dan pengemasan dalam satu rantai produksi terintegrasi.",
    },
    about: {
      title: "Tentang Kami | PT Pangan Masa Depan",
      description: "Visi, misi, dan cara kerja PT Pangan Masa Depan sebagai pengolah padi terintegrasi.",
    },
    services: {
      title: "Produk | PT Pangan Masa Depan",
      description:
        "Beras medium hingga premium super, produk samping bernilai jual, serta layanan penggilingan dan kemitraan petani.",
    },
    careers: {
      title: "Karier | PT Pangan Masa Depan",
      description: "Peluang bergabung bersama tim PT Pangan Masa Depan.",
    },
    contact: {
      title: "Kontak | PT Pangan Masa Depan",
      description: "Hubungi PT Pangan Masa Depan untuk pembelian gabah, pemesanan beras, dan kemitraan.",
    },
  },

  footer: { officeLabel: "Kantor Pusat", contactsLabel: "Kontak" },

  home: {
    hero: {
      headline: ["Penggilingan Beras Modern Terintegrasi", "untuk Ketahanan Pangan", "Indonesia."],
      body: "PT Pangan Masa Depan mengolah gabah petani menjadi beras bermutu melalui dua unit produksi yang saling terhubung: pengeringan dan penggilingan di PMD-1, penyosohan dan pengemasan di PMD-2.",
      scrollCue: "Gulir untuk Jelajahi",
      background: { desktop: "/images/hero-home-desktop.jpg", mobile: "/images/hero-home-mobile.jpg" },
    },

    intro: {
      body: [
        "Mutu beras ditentukan jauh sebelum penyosohan — pada kadar air gabah saat diterima, pada lama pengeringan, dan pada ketelitian pemisahan di setiap tahap. Karena itu kami menjalankan seluruh rantai di fasilitas sendiri, bukan menyerahkannya ke pihak ketiga.",
        "Setiap penerimaan gabah, hasil giling, dan produk samping tercatat dengan nomor batch, sehingga satu karung beras selalu dapat ditelusuri kembali ke gabah yang menjadi asalnya.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Gabah dijemur di lantai pengeringan", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Operator memeriksa mesin penggilingan", width: 1200, height: 900 },
      ],
    },

    features: {
      items: [
        {
          id: "penggilingan",
          label: "Penggilingan",
          eyebrow: "Lini Produksi",
          headline: ["Gabah dikeringkan", "dan digiling menjadi", "beras pecah kulit"],
          body: "Di unit PMD-1, gabah kering panen maupun gabah kering giling diterima, diperiksa kadar airnya, dikeringkan sampai batas aman simpan, lalu dipecah kulitnya menjadi beras pecah kulit.",
          image: { src: "/images/feature-milling.jpg", alt: "Gabah dan mesin di unit PMD-1", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Pelajari lebih lanjut", shortLabel: "Telusuri" },
        },
        {
          id: "penyosohan",
          label: "Penyosohan",
          eyebrow: "Lini Produksi",
          headline: ["Penyosohan dan", "grading dengan", "kendali mutu tiap batch"],
          body: "Di unit PMD-2, beras pecah kulit disosoh, dipisahkan menurut derajat sosoh dan keutuhan butir, lalu dikemas sesuai tingkat mutu dan merk yang dituju.",
          image: { src: "/images/feature-polishing.jpg", alt: "Mesin penggilingan di unit PMD-2", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Pelajari lebih lanjut", shortLabel: "Telusuri" },
        },
        {
          id: "produk-samping",
          label: "Produk Samping",
          eyebrow: "Lini Produksi",
          headline: ["Tidak ada bagian", "gabah yang", "terbuang percuma"],
          body: "Bekatul, broken, menir, sekam, dan beras reject dicatat dengan nomor batch dan masuk stok seperti produk utama — masing-masing punya pembeli dan nilai jualnya sendiri.",
          image: { src: "/images/feature-byproducts.jpg", alt: "Karung produk samping di gudang", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Pelajari lebih lanjut", shortLabel: "Telusuri" },
        },
      ],
    },

    gallery: {
      caption: "Klik untuk Perbesar",
      images: [
        { src: "/images/gallery-1.jpg", alt: "Petak sawah dilihat dari udara" },
        { src: "/images/gallery-2.jpg", alt: "Silo penyimpanan di fasilitas produksi" },
        { src: "/images/gallery-3.jpg", alt: "Butir gabah sebelum digiling" },
        { src: "/images/gallery-4.jpg", alt: "Pekerja menghamparkan gabah di lantai jemur" },
        { src: "/images/gallery-5.jpg", alt: "Karung beras dimuat ke truk" },
        { src: "/images/gallery-6.jpg", alt: "Lantai jemur gabah dilihat dari udara" },
        { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh" },
      ],
    },

    closing: {
      headline: ["Mari bangun rantai pangan", "yang **dapat ditelusuri**."],
      art: "/brand/closing-art.svg",
    },
  },

  about: {
    hero: {
      headline: ["PT Pangan Masa Depan Mengolah **Padi**", "Menjadi **Pangan yang Terpercaya**"],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan adalah perusahaan agribisnis pengolahan padi dan beras. Dari penerimaan gabah petani hingga beras kemasan bermerk, seluruh tahap berjalan di fasilitas kami sendiri dengan catatan mutu yang tersimpan pada setiap batch.",

    vision: {
      eyebrow: "Visi Kami",
      headline: ["Menjadi pengolah padi yang **paling dapat**", "**diandalkan** bagi petani dan pelanggan."],
      body: [
        "Kami ingin gabah petani dihargai secara adil dan diolah dengan benar, sehingga beras yang sampai ke konsumen konsisten dari satu pengiriman ke pengiriman berikutnya.",
        "Keandalan itu dibangun dari hal-hal sederhana yang dijalankan terus-menerus: penimbangan yang jujur, pengeringan yang cukup, dan pencatatan yang rapi.",
      ],
      media: [{ src: "/images/about-vision.jpg", alt: "Petani menampi gabah hasil panen", width: 1200, height: 900 }],
    },

    mission: {
      eyebrow: "Misi Kami",
      headline: ["**Mengolah** hasil panen", "dengan cara yang", "**bertanggung jawab**"],
      body: [
        "Membeli gabah petani dengan penimbangan dan penetapan mutu yang transparan.",
        "Menjaga mutu di setiap tahap, dari penerimaan gabah hingga beras dikemas.",
        "Memanfaatkan seluruh hasil samping — bekatul, broken, menir, sekam, dan reject — agar tidak ada yang terbuang.",
        "Mengembangkan kemampuan tim melalui pelatihan dan standar kerja yang terukur.",
      ],
      media: [
        { src: "/images/about-mission-1.jpg", alt: "Gabah dibongkar di unit penerimaan", width: 1000, height: 800 },
        { src: "/images/about-mission-2.jpg", alt: "Karung tersusun di gudang penyimpanan", width: 1000, height: 800 },
        { src: "/images/about-mission-3.jpg", alt: "Tim mengangkut karung di lantai produksi", width: 1000, height: 800 },
      ],
      art: "/brand/closing-art.svg",
    },
  },

  services: {
    overview: {
      id: "overview",
      label: "Produk Kami",
      eyebrow: "Produk & Layanan",
      headline: ["Produk Kami"],
      body: [
        "Produk utama kami adalah beras, dikemas menurut tingkat mutu, klasifikasi varietas, dan merk. Di sampingnya, seluruh hasil samping penggilingan kami perlakukan sebagai produk tersendiri yang bernomor batch dan tercatat dalam stok.",
        "Selain menjual produk, kami juga menerima jasa penggilingan dan membuka kemitraan pembelian gabah langsung dari petani dan kelompok tani.",
      ],
      image: { src: "/images/service-detail-1.jpg", alt: "Butir beras hasil sortir", width: 1200, height: 800 },
    },

    categories: [
      {
        id: "beras",
        label: "Beras",
        panel: {
          id: "beras",
          label: "Beras",
          eyebrow: "Produk Utama",
          headline: ["Beras Kemasan"],
          body: [
            "Setiap kemasan beras kami ditentukan oleh tiga hal: tingkat mutu, klasifikasi varietas padi yang digunakan, dan merk kemasannya. Kombinasi ketiganya membentuk satu jenis produk tersendiri.",
          ],
          image: { src: "/images/feature-polishing.jpg", alt: "Mesin penggilingan di unit PMD-2", width: 1400, height: 900 },
        },
        children: [
          {
            id: "beras-mutu",
            label: "Tingkat Mutu",
            headline: ["Tingkat Mutu"],
            body: [
              "Empat tingkat mutu kami tetapkan berdasarkan derajat sosoh dan proporsi butir utuh: Medium, Medium Super, Premium, dan Premium Super.",
              "Penentuan tingkat mutu dilakukan setelah grading, bukan sebelum penggilingan — sehingga yang tertulis pada kemasan adalah hasil yang benar-benar terukur.",
            ],
            diagram: {
              base: { src: "/brand/process-pmd2.svg", alt: "Alur unit PMD-2", width: 1460, height: 460 },
              hotspots: [
                { id: "penyosohan", label: "Penyosohan", rect: [4.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-1.svg" },
                { id: "grading", label: "Grading", rect: [28.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-2.svg" },
                { id: "pengemasan", label: "Pengemasan", rect: [52.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-3.svg" },
                { id: "distribusi", label: "Distribusi", rect: [76.0, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-4.svg" },
              ],
            },
          },
          {
            id: "beras-merk",
            label: "Klasifikasi & Merk",
            headline: ["Klasifikasi & Merk"],
            body: [
              "Klasifikasi mengikuti varietas padi yang digiling, sehingga karakter nasi pada tiap klasifikasi dapat dijaga tetap sama.",
              "Satu kombinasi tingkat mutu dan klasifikasi dapat dikemas ke dalam beberapa merk, termasuk merk milik pelanggan.",
            ],
            image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh" },
          },
        ],
      },
      {
        id: "samping",
        label: "Produk Samping",
        panel: {
          id: "samping",
          label: "Produk Samping",
          eyebrow: "Produk Samping",
          headline: ["Hasil Samping Penggilingan"],
          body: [
            "Lima hasil samping penggilingan kami perlakukan sebagai produk penuh: bekatul, broken, menir, sekam, dan beras reject. Semuanya bernomor batch, tercatat dalam stok, dan tersedia untuk dibeli.",
          ],
          image: { src: "/images/feature-byproducts.jpg", alt: "Karung produk samping di gudang", width: 1400, height: 900 },
        },
        children: [
          {
            id: "samping-pakan",
            label: "Bekatul & Menir",
            headline: ["Bekatul & Menir"],
            body: [
              "Bekatul — lapisan luar beras yang terlepas saat penyosohan — banyak diserap industri pakan ternak dan pangan olahan.",
              "Menir, butir beras yang pecah halus, umum digunakan sebagai bahan tepung beras dan bahan baku industri makanan.",
            ],
            image: { src: "/images/gallery-3.jpg", alt: "Butir gabah sebelum digiling" },
          },
          {
            id: "samping-lain",
            label: "Broken, Reject & Sekam",
            headline: ["Broken, Reject & Sekam"],
            body: [
              "Broken adalah beras patah hasil pemisahan pada tahap grading, dijual terpisah dari beras utuh.",
              "Beras reject dipisahkan agar tidak masuk ke kemasan bermerk, dan sekam — kulit gabah dari unit PMD-1 — diserap sebagai bahan bakar, media tanam, dan bahan baku industri.",
            ],
            image: { src: "/images/gallery-6.jpg", alt: "Lantai jemur gabah dilihat dari udara" },
          },
        ],
      },
      {
        id: "layanan",
        label: "Layanan",
        panel: {
          id: "layanan",
          label: "Layanan",
          eyebrow: "Layanan",
          headline: ["Kemitraan & Jasa Olah"],
          body: [
            "Kapasitas pengeringan dan penggilingan kami terbuka untuk mitra: petani yang menjual gabah, maupun pelaku usaha yang ingin mengolah dan mengemas berasnya di fasilitas kami.",
          ],
          image: { src: "/images/service-detail-2.jpg", alt: "Lantai jemur gabah di unit produksi", width: 1200, height: 800 },
        },
        children: [
          {
            id: "layanan-kemitraan",
            label: "Kemitraan Petani",
            headline: ["Kemitraan Petani"],
            body: [
              "Kami membeli gabah kering panen maupun gabah kering giling langsung dari petani dan kelompok tani, dengan penimbangan dan penetapan mutu yang terbuka untuk disaksikan.",
              "Alur di bawah ini adalah perjalanan gabah setelah diterima di unit PMD-1.",
            ],
            diagram: {
              base: { src: "/brand/process-pmd1.svg", alt: "Alur unit PMD-1", width: 1460, height: 460 },
              hotspots: [
                { id: "penerimaan", label: "Penerimaan Gabah", rect: [4.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-1.svg" },
                { id: "pengeringan", label: "Pengeringan", rect: [28.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-2.svg" },
                { id: "husking", label: "Pemecah Kulit", rect: [52.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-3.svg" },
                { id: "pk", label: "Beras Pecah Kulit", rect: [76.0, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-4.svg" },
              ],
            },
          },
          {
            id: "layanan-maklon",
            label: "Jasa Penggilingan",
            headline: ["Jasa Penggilingan & Pengemasan"],
            body: [
              "Untuk pemilik gabah atau beras pecah kulit, kami menyediakan jasa pengeringan, penggilingan, penyosohan, hingga pengemasan dengan merk sendiri.",
              "Hasil olahan dilaporkan lengkap dengan rendemen dan rincian hasil samping yang diperoleh.",
            ],
            image: { src: "/images/gallery-5.jpg", alt: "Karung beras dimuat ke truk" },
          },
        ],
      },
    ],
  },

  careers: {
    headline: ["**Bergabunglah**", "Bersama Kami"],
    body: [
      "Mengolah pangan adalah pekerjaan yang menuntut ketelitian setiap hari. Kami mencari orang-orang yang mau menjaga standar itu — di lantai produksi, di gudang, di laboratorium mutu, maupun di kantor.",
    ],
    emailLabel: "Kirim lamaran ke",
    image: { src: "/images/careers.jpg", alt: "Tim PT Pangan Masa Depan di lantai jemur", width: 2000, height: 1000 },
  },

  contact: {
    headline: ["Mari", "mulai", "percakapan"],
    officeLabel: "Kantor Pusat",
  },
};
