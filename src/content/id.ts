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
      eyebrow: "VISI KAMI",
      body: [
        "Menjadi pelopor transformasi industri beras melalui inovasi, teknologi, dan kolaborasi.",
        "Kami mengarahkan ketiganya pada satu tujuan: pertanian yang efisien, berkelanjutan, dan menyejahterakan. Prinsip itu berlaku sampai ke sisa prosesnya — hasil samping pengolahan kami olah menjadi biomassa, energi terbarukan yang mengembalikan sisa produksi ke dalam siklusnya.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Gabah dijemur di lantai pengeringan", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Gabah dan mesin di lantai giling", width: 1200, height: 900 },
      ],
    },

    stats: {
      items: [
        { value: "300", unit: "ton/hari", label: "Kapasitas giling gabah" },
        { value: "100+", unit: "agen", label: "Jaringan agen dan mitra dagang" },
        { value: "8", unit: "tahap", label: "Intake sampai packing, satu lini" },
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
        label: "Gabah",
        image: { src: "/images/gallery-3.jpg", alt: "Butir gabah sebelum digiling", width: 1000, height: 750 },
      },
      to: {
        label: "Beras kemasan",
        image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh", width: 1000, height: 750 },
      },
      steps: [
        {
          step: "01",
          title: "Intake / Reception",
          body: "Harga sudah ditentukan sebelum satu butir pun digiling.",
          unit: "PMD-1",
          image: { src: "/images/feature-milling.jpg", alt: "Gabah dituang ke lubang penerimaan", width: 1400, height: 900 },
          detail: {
            body: [
              "Timbangan dan alat uji kadar air adalah dua mesin paling menentukan di pabrik ini — keduanya bekerja sebelum mesin lain menyala. Petani menyaksikan sendiri angkanya keluar, dan angka itulah yang dibayar. Tidak ada penaksiran, tidak ada potongan yang muncul belakangan.",
            ],
            points: [
              "Dicatat: berat, kadar air, varietas, asal, dan nomor batch",
              "Masuk: gabah dari petani, kelompok tani, dan pemasok",
            ],
          },
        },
        {
          step: "02",
          title: "Cleaning & Aspiration",
          body: "Satu batu sebesar butir gabah cukup untuk melukai rol pemecah kulit.",
          unit: "PMD-1",
          image: { src: "/images/facility-plant.jpg", alt: "Instalasi elevator dan silo", width: 1400, height: 900 },
          detail: {
            body: [
              "Ayakan bertingkat dan hisapan udara memisahkan jerami, debu, dan batu — bukan demi penampilan, melainkan demi mesin di hilir dan demi bahan bakar. Setiap kilogram kotoran yang lolos ke pengering adalah panas yang dibakar untuk sesuatu yang toh akan dibuang.",
            ],
            points: [
              "Keluar: gabah bersih siap dikeringkan",
              "Menjaga: mesin di tahap berikutnya dan ketepatan susut",
            ],
          },
        },
        {
          step: "03",
          title: "Drying",
          body: "Kesalahan di tahap ini tidak terlihat hari itu juga.",
          unit: "PMD-1",
          image: { src: "/images/facility-drying.jpg", alt: "Lini pengering di fasilitas PMD", width: 1050, height: 1400 },
          detail: {
            body: [
              "Gabah yang dikeringkan terburu-buru akan retak di dalam butirnya — retakan halus yang tidak tampak oleh mata. Ia baru menampakkan diri tiga tahap kemudian, sebagai beras patah di ujung penggilingan. Karena itu suhu dan lajunya kami tahan, meski itu berarti pengering berjalan lebih lama.",
            ],
            points: [
              "Dicatat: kadar air awal dan akhir, lama pengeringan",
              "Tujuan: butir utuh maksimal pada tahap berikutnya",
            ],
          },
        },
        {
          step: "04",
          title: "Hulling",
          body: "Yang dilepas di sini kembali ke pabrik sebagai bahan bakar.",
          unit: "PMD-1",
          image: { src: "/images/mill-floor.jpg", alt: "Gabah dan mesin di lantai giling", width: 1400, height: 900 },
          detail: {
            body: [
              "Sekam adalah sekitar seperlima bobot gabah — bagian terbesar yang bukan beras. Alih-alih menumpuk sebagai limbah, ia menjadi produk tersendiri dan bahan baku pelet energi terbarukan. Sisa proses yang dulu dianggap masalah kini punya pembelinya sendiri.",
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
          body: "Putih ada harganya, dan harganya dibayar dengan bobot.",
          unit: "PMD-2",
          image: { src: "/images/feature-polishing.jpg", alt: "Mesin penggilingan di unit PMD-2", width: 1400, height: 900 },
          detail: {
            body: [
              "Setiap lapis yang disosoh membuat beras lebih putih sekaligus lebih ringan — dan yang terlepas justru lapisan paling bergizi. Karena itu derajat sosoh bukan soal semakin putih semakin baik, melainkan soal berhenti di titik yang tepat untuk mutu yang dituju.",
            ],
            points: [
              "Dicatat: derajat sosoh dan rendemen",
              "Hasil samping: bekatul, kaya serat dan vitamin B kompleks",
            ],
          },
        },
        {
          step: "06",
          title: "Grading",
          body: "Di sini mutu berhenti menjadi klaim dan berubah menjadi angka.",
          unit: "PMD-2",
          image: { src: "/images/service-detail-1.jpg", alt: "Butir beras hasil sortir", width: 1200, height: 800 },
          detail: {
            body: [
              "Butir dipisahkan menurut ukuran dan keutuhannya, lalu tingkat mutu ditetapkan dari hasil pengukuran itu — bukan dari niat sebelum digiling. Yang patah tidak dianggap gagal: broken dan menir punya pasarnya sendiri, dan dijual sebagai produk, bukan disembunyikan ke dalam karung beras utuh.",
            ],
            points: [
              "Dicatat: proporsi butir utuh dan tingkat mutu",
              "Hasil samping: broken dan menir",
            ],
          },
        },
        {
          step: "07",
          title: "Sorting",
          body: "Pembeli mengingat satu butir yang menghitam, bukan seribu yang bening.",
          unit: "PMD-2",
          image: { src: "/images/gallery-7.jpg", alt: "Butir beras hasil sosoh", width: 1000, height: 750 },
          detail: {
            body: [
              "Tahap ini memeriksa beras butir demi butir dan menyingkirkan yang menyimpang warnanya beserta benda asing yang lolos sejauh ini. Pekerjaan yang mustahil dilakukan tangan pada volume sebesar ini — dan justru di sinilah beras premium terpisah dari beras yang sekadar bersih.",
            ],
            points: [
              "Keluar: beras siap dikemas menurut merk dan ukuran",
              "Hasil samping: beras reject",
            ],
          },
        },
        {
          step: "08",
          title: "Packing",
          body: "Nomor batch itulah yang membuat pertanyaan enam bulan kemudian masih bisa dijawab.",
          unit: "PMD-2",
          image: { src: "/images/gallery-5.jpg", alt: "Karung beras dimuat ke truk", width: 1000, height: 750 },
          detail: {
            body: [
              "Beras dikemas menurut tingkat mutu, klasifikasi, dan merk — termasuk merk milik pelanggan. Nomor batch ikut tercetak sampai ke karung, sehingga satu kemasan di gudang pembeli selalu dapat dirunut kembali ke gabah, petani, dan tanggal penerimaannya.",
            ],
            points: [
              "Keluar: beras kemasan 5, 10, 25, dan 50 kg",
              "Ditelusuri: nomor batch dari intake sampai pengiriman",
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
      headline: ["Teknologi Modern untuk **Ketahanan Pangan**", "**Indonesia**"],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan adalah perusahaan agribisnis pengolahan padi dan beras di Kandanghaur, Indramayu. Dari penerimaan gabah hingga beras kemasan bermerk, seluruh tahap berjalan di fasilitas kami sendiri dengan kapasitas giling 300 ton gabah per hari.",

    vision: {
      eyebrow: "VISI KAMI",
      headline: ["Menjadi pelopor transformasi industri beras", "melalui **inovasi, teknologi, dan kolaborasi**."],
      body: [
        "Kami mengarahkan ketiganya untuk mewujudkan pertanian yang efisien, berkelanjutan, dan menyejahterakan.",
        "Teknologi bagi kami bukan sekadar alat produksi, melainkan fondasi untuk menciptakan efisiensi, konsistensi mutu, dan keberlanjutan — sistem penggilingan yang modern, ramah lingkungan, dan berbasis data.",
      ],
      media: [{ src: "/images/facility-plant.jpg", alt: "Instalasi elevator dan silo", width: 1400, height: 900 }],
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
        { src: "/images/about-mission-1.jpg", alt: "Elevator gabah dan truk di unit penerimaan", width: 1000, height: 800 },
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
