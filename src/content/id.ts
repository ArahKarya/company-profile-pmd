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
      eyebrow: "PT PANGAN MASA DEPAN",
      headline: ["Penggilingan beras modern, terintegrasi", "dari gabah sampai kemasan."],
      body: "Dua unit produksi yang saling terhubung: pengeringan dan penggilingan di PMD-1, penyosohan dan pengemasan di PMD-2. Setiap batch tercatat, dari gabah petani sampai karung siap kirim.",
      image: { src: "/images/hero-home-desktop.jpg", alt: "Instalasi elevator dan silo di pabrik penggilingan", width: 2000, height: 1200 },
      actions: [
        { label: "Lihat Produk", href: site.routes.id.services, variant: "solid" },
        { label: "Kemitraan Petani", href: site.routes.id.contact, variant: "outline" },
      ],
    },

    intro: {
      body: [
        "Mutu beras ditentukan jauh sebelum penyosohan — pada kadar air gabah saat diterima, pada lama pengeringan, dan pada ketelitian pemisahan di setiap tahap. Karena itu kami menjalankan seluruh rantai di fasilitas sendiri, bukan menyerahkannya ke pihak ketiga.",
        "Setiap penerimaan gabah, hasil giling, dan produk samping tercatat dengan nomor batch, sehingga satu karung beras selalu dapat ditelusuri kembali ke gabah yang menjadi asalnya.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Gabah dijemur di lantai pengeringan", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Gabah dan mesin di lantai giling", width: 1200, height: 900 },
      ],
    },

    stats: {
      items: [
        { value: "[ANGKA]", unit: "ton/hari", label: "Kapasitas giling" },
        { value: "[ANGKA]", unit: "petani", label: "Mitra pemasok gabah" },
        { value: "4", unit: "tingkat", label: "Medium sampai Premium Super" },
        { value: "5", unit: "produk samping", label: "Semua bernomor batch" },
      ],
    },

    products: {
      eyebrow: "PRODUK",
      headline: ["Tiga lini yang keluar dari satu rantai"],
      link: { href: site.routes.id.services, label: "Semua produk" },
      items: [
        {
          id: "beras",
          title: "Beras kemasan",
          body: "Empat tingkat mutu, dikemas menurut klasifikasi varietas dan merk — termasuk merk milik pelanggan.",
          image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh", width: 1000, height: 1000 },
          link: { href: site.routes.id.services, label: "Selengkapnya" },
        },
        {
          id: "samping",
          title: "Produk samping",
          body: "Bekatul, broken, menir, sekam, dan reject — bernomor batch, masuk stok, dan siap dibeli.",
          image: { src: "/images/feature-byproducts.jpg", alt: "Gudang curah: gundukan gabah dan karung", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Selengkapnya" },
        },
        {
          id: "jasa",
          title: "Jasa penggilingan",
          body: "Pengeringan, penggilingan, sampai pengemasan bermerk sendiri — dilaporkan lengkap dengan rendemen.",
          image: { src: "/images/facility-elevator.jpg", alt: "Elevator gabah dan truk di unit penerimaan", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Selengkapnya" },
        },
      ],
    },

    process: {
      title: "Alur produksi",
      note: "Arahkan kursor ke sebuah tahap, klik untuk membuka rinciannya.",
      from: {
        label: "Gabah",
        image: { src: "/images/gallery-3.jpg", alt: "Butir gabah sebelum digiling", width: 1000, height: 700 },
      },
      moreLabel: "Rincian",
      closeLabel: "Tutup",
      to: {
        label: "Beras kemasan",
        image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh", width: 1000, height: 1000 },
      },
      steps: [
        {
          step: "01",
          title: "Penerimaan gabah",
          body: "Timbang, uji kadar air, catat nomor batch.",
          unit: "PMD-1",
          image: { src: "/images/feature-milling.jpg", alt: "Gabah dituang ke lubang penerimaan", width: 1400, height: 900 },
          detail: {
            body: [
              "Gabah kering panen maupun gabah kering giling ditimbang di hadapan pengirimnya, lalu diambil sampelnya untuk diuji kadar air dan kebersihannya. Hasil uji itu yang menentukan harga dan perlakuan berikutnya — bukan taksiran di lapangan.",
            ],
            points: [
              "Dicatat: berat, kadar air, varietas, asal, dan nomor batch",
              "Masuk: GKP atau GKG dari petani dan kelompok tani",
            ],
          },
        },
        {
          step: "02",
          title: "Pengeringan",
          body: "Turun sampai kadar air aman simpan.",
          unit: "PMD-1",
          image: { src: "/images/intro-1.jpg", alt: "Gabah dijemur di lantai pengeringan", width: 1200, height: 900 },
          detail: {
            body: [
              "Gabah diturunkan kadar airnya secara bertahap sampai batas aman simpan. Pengeringan yang terlalu cepat membuat butir retak dan meningkatkan beras patah saat digiling, jadi lajunya dijaga, bukan dikejar.",
            ],
            points: [
              "Dicatat: kadar air awal dan akhir, lama pengeringan",
              "Tujuan: butir utuh maksimal pada tahap berikutnya",
            ],
          },
        },
        {
          step: "03",
          title: "Pemecah kulit",
          body: "Sekam dilepas, keluar beras pecah kulit.",
          unit: "PMD-1",
          image: { src: "/images/mill-floor.jpg", alt: "Gabah dan mesin di lantai giling unit PMD-1", width: 1400, height: 900 },
          detail: {
            body: [
              "Kulit gabah dilepas sehingga tersisa beras pecah kulit. Sekam yang terpisah tidak dibuang: ia masuk stok sebagai produk tersendiri, sama seperti hasil samping lainnya.",
            ],
            points: [
              "Keluar: beras pecah kulit — bahan baku unit PMD-2",
              "Hasil samping: sekam, bernomor batch",
            ],
          },
        },
        {
          step: "04",
          title: "Penyosohan & grading",
          body: "Derajat sosoh diatur, butir dipisah menurut mutu.",
          unit: "PMD-2",
          image: { src: "/images/feature-polishing.jpg", alt: "Mesin penggilingan di unit PMD-2", width: 1400, height: 900 },
          detail: {
            body: [
              "Lapisan luar beras disosoh sampai derajat yang dituju, lalu butirnya dipisahkan menurut keutuhan. Tingkat mutu — Medium sampai Premium Super — ditetapkan setelah grading, jadi yang tertulis pada kemasan adalah hasil yang benar-benar terukur.",
            ],
            points: [
              "Dicatat: derajat sosoh, proporsi butir utuh, rendemen",
              "Hasil samping: bekatul, broken, menir, dan reject",
            ],
          },
        },
        {
          step: "05",
          title: "Pengemasan",
          body: "Dikemas per merk, siap distribusi.",
          unit: "PMD-2",
          image: { src: "/images/gallery-5.jpg", alt: "Karung beras dimuat ke truk", width: 1000, height: 700 },
          detail: {
            body: [
              "Beras dikemas menurut kombinasi tingkat mutu, klasifikasi varietas, dan merk — termasuk merk milik pelanggan. Nomor batch ikut sampai ke karung, sehingga satu kemasan selalu bisa ditelusuri kembali ke gabah asalnya.",
            ],
            points: [
              "Keluar: beras kemasan per merk dan ukuran",
              "Ditelusuri: nomor batch dari penerimaan sampai pengiriman",
            ],
          },
        },
      ],
    },

    gallery: {
      caption: "Klik untuk Perbesar",
      images: [
        { src: "/images/gallery-1.jpg", alt: "Instalasi elevator dan silo" },
        { src: "/images/gallery-2.jpg", alt: "Silo dan konveyor di fasilitas produksi" },
        { src: "/images/gallery-3.jpg", alt: "Butir gabah sebelum digiling" },
        { src: "/images/gallery-4.jpg", alt: "Silo penyimpanan" },
        { src: "/images/gallery-5.jpg", alt: "Karung beras dimuat ke truk" },
        { src: "/images/gallery-6.jpg", alt: "Terminal biji-bijian dilihat dari udara" },
        { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh" },
        { src: "/images/gallery-8.jpg", alt: "Petak sawah dilihat dari udara" },
      ],
    },

    cta: {
      headline: ["Menjual gabah, atau mencari", "pemasok beras?"],
      button: { href: site.routes.id.contact, label: "Hubungi tim kami" },
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
