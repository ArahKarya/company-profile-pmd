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
        "PT Pangan Masa Depan mengolah padi petani menjadi beras bermutu — pengeringan, penggilingan, penyosohan, dan pengemasan dalam satu rantai produksi terintegrasi.",
    },
    about: {
      title: "Tentang Kami | PT Pangan Masa Depan",
      description: "Visi, misi, dan cara kerja PT Pangan Masa Depan sebagai pengolah padi terintegrasi.",
    },
    services: {
      title: "Produk | PT Pangan Masa Depan",
      description:
        "Beras medium hingga premium super, produk samping bernilai jual, serta kemitraan petani, kemitraan strategis, dan jasa penggilingan.",
    },
    careers: {
      title: "Karier | PT Pangan Masa Depan",
      description: "Peluang bergabung bersama tim PT Pangan Masa Depan.",
    },
    contact: {
      title: "Kontak | PT Pangan Masa Depan",
      description: "Hubungi PT Pangan Masa Depan untuk pembelian padi, pemesanan beras, dan kemitraan.",
    },
  },

  footer: { officeLabel: "Kantor Pusat", contactsLabel: "Kontak" },

  home: {
    hero: {
      eyebrow: "PT PANGAN MASA DEPAN",
      headline: ["Penggilingan beras modern, terintegrasi", "dari padi sampai kemasan."],
      body: "Mengintegrasikan teknologi pemrosesan mutakhir dengan ketertelusuran penuh, mendedikasikan kualitas tanpa kompromi dari hasil bumi nusantara.",
      image: { src: "/images/facility-mill.jpg", alt: "Lantai giling di fasilitas PT Pangan Masa Depan", width: 1800, height: 1014 },
      actions: [
        { label: "Lihat Produk", href: site.routes.id.services, variant: "solid" },
        { label: "Kemitraan Petani", href: site.routes.id.contact, variant: "outline" },
        { label: "Kemitraan Strategis", href: site.routes.id.contact, variant: "outline" },
      ],
    },

    intro: {
      eyebrow: "VISI KAMI",
      body: [
        "Menjadi pelopor transformasi industri beras yang didorong oleh inovasi, teknologi mutakhir, dan kolaborasi.",
        "Kami mengarahkan ketiganya pada satu tujuan: pengembangan sistem terbarukan, proses yang efisien, dan kebermanfaatan yang menyeluruh. Melalui ekosistem sirkular yang terintegrasi, setiap fase pengolahan saling menghidupkan untuk menghadirkan standar mutu terbaik yang berkelanjutan.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Padi dijemur di lantai pengeringan", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Padi dan mesin di lantai giling", width: 1200, height: 900 },
      ],
    },

    stats: {
      items: [
        { value: "300", unit: "ton/hari", label: "Kapasitas proses" },
        { value: "100+", unit: "agen", label: "Jaringan agen dan mitra dagang" },
        { value: "8", unit: "tahap", label: "Intake sampai packaging terintegrasi" },
        { value: "2021", unit: "", label: "Melayani mitra sejak" },
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
          image: { src: "/images/feature-byproducts.jpg", alt: "Gudang curah: gundukan padi dan karung", width: 1400, height: 900 },
          link: { href: site.routes.id.services, label: "Selengkapnya" },
        },
        {
          id: "jasa",
          title: "Jasa penggilingan",
          body: "Pengeringan, penggilingan, sampai pengemasan bermerk sendiri — dilaporkan lengkap dengan rendemen.",
          image: { src: "/images/facility-hall.jpg", alt: "Lini mesin di fasilitas PMD", width: 788, height: 444 },
          link: { href: site.routes.id.services, label: "Selengkapnya" },
        },
      ],
    },

    clients: {
      eyebrow: "KLIEN & MITRA",
      headline: ["Beras kami masuk ke dapur industri, gudang pemerintah, dan pasar induk"],
      note: "Bekerja sama sejak 2021",
      items: [
        "Mayora",
        "Food Station",
        "Bulog",
        "Charoen Pokphand",
        "Badan Gizi Nasional",
        "Pasar Induk Cipinang",
        "RM Taman Selera",
        "PT East Bogor",
      ],
      footnote: "Bersama CV Kawan Karya, Grosir Berkah Mandiri, JBM, RAI, dan lebih dari 100 agen lainnya.",
    },

    process: {
      title: "Productions Landscape",
      moreLabel: "Rincian",
      closeLabel: "Tutup",
      from: {
        label: "Padi",
        image: { src: "/images/gallery-3.jpg", alt: "Butir padi sebelum digiling", width: 1000, height: 750 },
      },
      to: {
        label: "Beras kemasan",
        image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh", width: 1000, height: 750 },
      },
      steps: [
        {
          step: "01",
          title: "Intake / Reception",
          body: "Timbang, uji mutu, dan penomoran batch.",
          unit: "PMD-1",
          image: { src: "/images/feature-milling.jpg", alt: "Padi dituang ke lubang penerimaan", width: 1400, height: 900 },
          detail: {
            body: [
              "Padi melewati jembatan timbang dan titik uji mutu sebelum dibongkar. Kadar air, kebersihan, dan varietas diukur di tempat, lalu seluruh hasilnya terikat pada satu nomor batch yang mengikuti padi itu sampai keluar sebagai beras kemasan.",
            ],
            points: [
              "Diukur: berat, kadar air, varietas, dan asal",
              "Masuk: padi dari petani, kelompok tani, dan pemasok",
            ],
          },
        },
        {
          step: "02",
          title: "Cleaning & Aspiration",
          body: "Ayakan bertingkat dan hisapan udara sebelum pengeringan.",
          unit: "PMD-1",
          image: { src: "/images/facility-cleaning.jpg", alt: "Operator di panel kendali lini pembersihan PMD", width: 665, height: 1181 },
          detail: {
            body: [
              "Padi dibersihkan sebelum mencapai pengering. Ayakan bertingkat dan hisapan udara memisahkan jerami, debu, batu, dan partikel logam, sehingga yang dikeringkan hanya padi — sekaligus menjaga presisi mesin pada tahap-tahap berikutnya.",
            ],
            points: [
              "Dipisahkan: jerami, debu, batu, dan partikel logam",
              "Keluar: padi bersih siap dikeringkan",
            ],
          },
        },
        {
          step: "03",
          title: "Drying",
          body: "Penurunan kadar air bertahap dengan suhu terkendali.",
          unit: "PMD-1",
          image: { src: "/images/facility-drying.jpg", alt: "Lini pengering di fasilitas PMD", width: 1050, height: 1400 },
          detail: {
            body: [
              "Pengeringan berjalan bertahap dengan suhu dan laju yang dikendalikan. Penurunan kadar air yang terlalu cepat menimbulkan retakan di dalam butir, sehingga prosesnya diatur untuk menjaga butir tetap utuh sampai penggilingan, bukan untuk mengejar waktu.",
            ],
            points: [
              "Dikendalikan: suhu, laju, dan lama pengeringan",
              "Dicatat: kadar air masuk dan keluar per batch",
            ],
          },
        },
        {
          step: "04",
          title: "Hulling",
          body: "Pelepasan sekam pada tekanan rol yang diatur.",
          unit: "PMD-1",
          image: { src: "/images/facility-hulling.jpg", alt: "Lini pemecah kulit di fasilitas PMD", width: 788, height: 444 },
          detail: {
            body: [
              "Sekam dilepas dari butir beras pada tekanan rol yang diatur agar butir tidak ikut pecah. Sekam yang terpisah tidak berakhir sebagai limbah: ia dikumpulkan sebagai bahan baku pelet energi terbarukan.",
            ],
            points: [
              "Keluar: beras pecah kulit — bahan baku tahap penyosohan",
              "Hasil samping: sekam, bahan baku pelet energi terbarukan",
            ],
          },
        },
        {
          step: "05",
          title: "Whitening & Polishing",
          body: "Pelepasan kulit ari melalui beberapa lintasan.",
          unit: "PMD-2",
          image: { src: "/images/facility-whitening.jpg", alt: "Mesin penyosoh lintasan pertama di fasilitas PMD", width: 788, height: 444 },
          detail: {
            body: [
              "Lapisan kulit ari dilepas melalui beberapa lintasan, bukan sekaligus, sehingga derajat sosoh dapat disetel sesuai tingkat mutu yang dituju. Bekatul yang terpisah dikumpulkan sebagai produk tersendiri, bukan sebagai sisa.",
            ],
            points: [
              "Disetel: derajat sosoh sesuai tingkat mutu",
              "Hasil samping: bekatul, kaya serat dan vitamin B kompleks",
            ],
          },
        },
        {
          step: "06",
          title: "Grading",
          body: "Pemisahan menurut ukuran dan keutuhan butir.",
          unit: "PMD-2",
          image: { src: "/images/facility-grading.jpg", alt: "Pemeriksaan beras di lini grading PMD", width: 788, height: 444 },
          detail: {
            body: [
              "Butir dipisahkan menurut ukuran dan keutuhannya. Hasil pengukuran inilah yang menentukan tingkat mutu — dari Medium sampai Premium Super — sehingga mutu yang tercetak pada kemasan berasal dari angka, bukan dari perkiraan.",
            ],
            points: [
              "Ditetapkan: tingkat mutu, dari Medium sampai Premium Super",
              "Hasil samping: broken dan menir",
            ],
          },
        },
        {
          step: "07",
          title: "Sorting",
          body: "Pemeriksaan butir demi butir menurut warna dan bentuk.",
          unit: "PMD-2",
          image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh", width: 1000, height: 750 },
          detail: {
            body: [
              "Beras diperiksa butir demi butir menurut warna dan bentuknya. Butir yang menyimpang serta benda asing yang masih tersisa dikeluarkan secara otomatis, menghasilkan kemurnian yang dituntut industri pangan dan pasar premium.",
            ],
            points: [
              "Dikeluarkan: butir menyimpang warna dan benda asing",
              "Hasil samping: beras reject",
            ],
          },
        },
        {
          step: "08",
          title: "Packing",
          body: "Pengemasan menurut tingkat mutu, klasifikasi, dan merk.",
          unit: "PMD-2",
          image: { src: "/images/facility-packing.jpg", alt: "Lini pengemasan di fasilitas PMD", width: 788, height: 444 },
          detail: {
            body: [
              "Beras dikemas menurut tingkat mutu, klasifikasi, dan merk dalam ukuran 5 sampai 50 kilogram. Nomor batch dari tahap penerimaan ikut sampai ke karung, sehingga setiap kemasan tetap dapat ditelusuri setelah meninggalkan pabrik.",
            ],
            points: [
              "Keluar: beras kemasan 5, 10, 25, dan 50 kg",
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
        { src: "/images/gallery-3.jpg", alt: "Butir padi sebelum digiling" },
        { src: "/images/gallery-4.jpg", alt: "Silo penyimpanan" },
        { src: "/images/gallery-5.jpg", alt: "Karung beras dimuat ke truk" },
        { src: "/images/gallery-6.jpg", alt: "Terminal biji-bijian dilihat dari udara" },
        { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh" },
        { src: "/images/gallery-8.jpg", alt: "Petak sawah dilihat dari udara" },
      ],
    },

    cta: {
      headline: ["Menjual padi, atau mencari", "pemasok beras?"],
      button: { href: site.routes.id.contact, label: "Hubungi tim kami" },
    },
  },

  about: {
    hero: {
      headline: ["Teknologi Modern untuk **Ketahanan Pangan**", "**Indonesia**"],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan adalah perusahaan agribisnis pengolahan padi dan beras di Kandanghaur, Indramayu. Dari penerimaan padi hingga beras kemasan bermerk, seluruh tahap berjalan di fasilitas kami sendiri dengan kapasitas giling 300 ton padi per hari.",

    vision: {
      eyebrow: "VISI KAMI",
      headline: ["Menjadi pelopor transformasi industri beras", "melalui **inovasi, teknologi, dan kolaborasi**."],
      body: [
        "Kami mengarahkan ketiganya untuk mewujudkan pertanian yang efisien, berkelanjutan, dan menyejahterakan.",
        "Teknologi bagi kami bukan sekadar alat produksi, melainkan fondasi untuk menciptakan efisiensi, konsistensi mutu, dan keberlanjutan — sistem penggilingan yang modern, ramah lingkungan, dan berbasis data.",
      ],
      media: [{ src: "/images/facility-tower.jpg", alt: "Menara pengering di fasilitas PMD", width: 760, height: 1351 }],
    },

    mission: {
      eyebrow: "MISI KAMI",
      headline: ["Lima hal yang kami kerjakan", "untuk sampai ke sana"],
      body: [
        "Meningkatkan nilai hasil panen melalui pengolahan modern yang efisien dan berstandar tinggi.",
        "Mengintegrasikan teknologi dan data dalam setiap lini bisnis, dari pasca panen hingga distribusi.",
        "Membangun ekosistem pertanian kolaboratif yang menghubungkan petani, mitra, dan pelanggan dalam rantai pasok beras yang transparan.",
        "Menciptakan budaya kerja inovatif dan adaptif, di mana setiap tim merasa memiliki dampak nyata bagi ketahanan pangan nasional.",
        "Menjadi benchmark industri beras Indonesia dalam efisiensi, keberlanjutan, dan tanggung jawab sosial.",
      ],
      media: [
        { src: "/images/about-mission-1.jpg", alt: "Elevator padi dan truk di unit penerimaan", width: 1000, height: 800 },
        { src: "/images/about-mission-2.jpg", alt: "Karung tersusun di gudang penyimpanan", width: 1000, height: 800 },
        { src: "/images/about-mission-3.jpg", alt: "Tim mengangkut karung di lantai produksi", width: 1000, height: 800 },
      ],
      art: "/brand/closing-art.svg",
    },

    values: {
      eyebrow: "NILAI KAMI",
      headline: ["TERDEPAN"],
      note: "Delapan nilai yang menjadi ukuran cara kami bekerja.",
      items: [
        {
          letter: "T",
          title: "Tanggung Jawab",
          body: "Kami menjunjung tinggi integritas dan tanggung jawab dalam setiap proses — dari pengadaan bahan baku hingga distribusi beras kepada pelanggan.",
        },
        {
          letter: "E",
          title: "Efisiensi",
          body: "Kami berkomitmen menciptakan sistem kerja yang hemat energi, waktu, dan biaya dengan menerapkan teknologi modern dalam setiap lini produksi.",
        },
        {
          letter: "R",
          title: "Reliabilitas",
          body: "Kami menjadi mitra terpercaya dengan menjaga konsistensi mutu, ketepatan waktu, dan pelayanan terbaik kepada pelanggan.",
        },
        {
          letter: "D",
          title: "Dedikasi",
          body: "Kami bekerja dengan sepenuh hati untuk memberikan hasil terbaik bagi perusahaan, petani, dan masyarakat.",
        },
        {
          letter: "E",
          title: "Ekselensi",
          body: "Kami terus mendorong perbaikan berkelanjutan dan inovasi untuk mencapai standar tertinggi dalam industri pangan.",
        },
        {
          letter: "P",
          title: "Profesionalisme",
          body: "Kami mengutamakan etika kerja, kompetensi, dan tanggung jawab dalam setiap tindakan dan keputusan.",
        },
        {
          letter: "A",
          title: "Adaptif",
          body: "Kami cepat beradaptasi terhadap perubahan teknologi, pasar, dan kebutuhan pelanggan agar selalu relevan dan kompetitif.",
        },
        {
          letter: "N",
          title: "Nasionalisme",
          body: "Kami bangga berkontribusi dalam memperkuat ketahanan pangan nasional dan meningkatkan kesejahteraan petani Indonesia.",
        },
      ],
    },
  },

  services: {
    overview: {
      id: "overview",
      label: "Produk Kami",
      eyebrow: "Produk & Layanan",
      headline: ["Kualitas Tanpa Kompromi,", "Layanan yang Terhubung"],
      body: [
        "Kami mempersembahkan beras pilihan dengan standar klasifikasi mutu dan varietas terbaik. Setiap fase pengolahan, termasuk produk turunannya, dikelola secara transparan dan terukur dengan sistem penelusuran batch yang ketat.",
        "Kami juga membuka ruang kolaborasi yang luas melalui kemitraan strategis pengadaan padi bersama petani, serta menyediakan fasilitas layanan penggilingan modern yang andal.",
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
            headline: ["Empat Tingkat Mutu"],
            image: { src: "/images/beras-mutu.jpg", alt: "Beras putih pada sendok kayu", width: 1400, height: 933 },
            body: [
              "Tingkat mutu ditetapkan setelah grading dan sorting, bukan sebelum penggilingan. Yang menentukan adalah hasil pengukuran: derajat sosoh, proporsi butir utuh, dan kebersihan warna butir.",
              "Karena diukur dan bukan diperkirakan, satu tingkat mutu berarti hal yang sama pada setiap pengiriman — itulah yang membuat kiriman kesepuluh sama dengan yang pertama.",
            ],
            tiers: [
              {
                code: "MD",
                name: "Medium",
                character: "Derajat sosoh sedang, proporsi butir patah masih terbawa",
                market: "Konsumsi rumah tangga dan grosir",
              },
              {
                code: "MDS",
                name: "Medium Super",
                character: "Sosoh lebih bersih, butir utuh lebih banyak daripada medium",
                market: "Rumah tangga, kuliner, dan katering",
              },
              {
                code: "PR",
                name: "Premium",
                character: "Butir bening dan seragam, warna menyimpang sudah dikeluarkan",
                market: "Ritel bermerk, hotel, dan restoran",
              },
              {
                code: "PRS",
                name: "Premium Super",
                character: "Butir paling utuh dan paling bersih dari seluruh lini",
                market: "Pasar premium dan pelanggan berspesifikasi ketat",
              },
            ],
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
            image: { src: "/images/gallery-3.jpg", alt: "Butir padi sebelum digiling" },
          },
          {
            id: "samping-lain",
            label: "Broken, Reject & Sekam",
            headline: ["Broken, Reject & Sekam"],
            body: [
              "Broken adalah beras patah hasil pemisahan pada tahap grading, dijual terpisah dari beras utuh.",
              "Beras reject dipisahkan agar tidak masuk ke kemasan bermerk, dan sekam — kulit padi dari unit PMD-1 — diserap sebagai bahan bakar, media tanam, dan bahan baku industri.",
            ],
            image: { src: "/images/gallery-6.jpg", alt: "Lantai jemur padi dilihat dari udara" },
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
            "Kapasitas pengeringan dan penggilingan kami terbuka untuk tiga bentuk kemitraan: petani yang menjual padi, industri dan lembaga yang membutuhkan pasokan beras berkelanjutan, serta pelaku usaha yang ingin mengolah dan mengemas berasnya di fasilitas kami.",
          ],
          image: { src: "/images/service-detail-2.jpg", alt: "Lantai jemur padi di unit produksi", width: 1200, height: 800 },
        },
        children: [
          {
            id: "layanan-kemitraan",
            label: "Kemitraan Petani",
            headline: ["Kemitraan Petani"],
            body: [
              "Kami membeli padi kering panen maupun padi kering giling langsung dari petani dan kelompok tani, dengan penimbangan dan penetapan mutu yang terbuka untuk disaksikan.",
              "Alur di bawah ini adalah perjalanan padi setelah diterima di unit PMD-1.",
            ],
            diagram: {
              base: { src: "/brand/process-pmd1.svg", alt: "Alur unit PMD-1", width: 1460, height: 460 },
              hotspots: [
                { id: "penerimaan", label: "Penerimaan Padi", rect: [4.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-1.svg" },
                { id: "pengeringan", label: "Pengeringan", rect: [28.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-2.svg" },
                { id: "husking", label: "Pemecah Kulit", rect: [52.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-3.svg" },
                { id: "pk", label: "Beras Pecah Kulit", rect: [76.0, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-4.svg" },
              ],
            },
          },
          {
            id: "layanan-strategis",
            label: "Kemitraan Strategis",
            headline: ["Kemitraan Strategis"],
            body: [
              "Untuk industri pangan, distributor, lembaga pemerintah, dan jaringan ritel, kami menyediakan pasokan beras berkelanjutan dengan spesifikasi dan jadwal yang disepakati di muka — termasuk pengemasan dengan merk mitra.",
              "Kapasitas 300 ton padi per hari dan ketertelusuran per batch membuat volume besar tetap dapat dipertanggungjawabkan mutunya. Bentuk kerja samanya terbuka: kontrak pasokan berkala, pengemasan merk mitra, maupun penyerapan produk samping dalam jumlah tetap.",
            ],
            image: { src: "/images/facility-packing.jpg", alt: "Lini pengemasan di fasilitas PMD", width: 788, height: 444 },
          },
          {
            id: "layanan-maklon",
            label: "Jasa Penggilingan",
            headline: ["Jasa Penggilingan & Pengemasan"],
            body: [
              "Untuk pemilik padi atau beras pecah kulit, kami menyediakan jasa pengeringan, penggilingan, penyosohan, hingga pengemasan dengan merk sendiri.",
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
