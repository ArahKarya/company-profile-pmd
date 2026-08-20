<div align="center">

# Website PT Pangan Masa Depan

**Profil perusahaan agribisnis pengolahan padi & beras — dua bahasa, dengan panel admin.**

[![Stack](https://img.shields.io/badge/Next.js%2016-React%2019-14331f?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Locales](https://img.shields.io/badge/Dwibahasa-ID%20%2B%20EN-d9a520?style=flat-square)](#halaman)
[![Admin](https://img.shields.io/badge/Admin-Postgres%20%2B%20Prisma-336791?style=flat-square&logo=postgresql&logoColor=white)](#panel-admin)

</div>

Dibangun di atas **Meridian**, template company profile milik Arah Karya Sinergi
(`~/Project/company-profile-template`), lalu di-*rebrand* penuh untuk PT Pangan Masa Depan:
identitas, palet warna, seluruh naskah dua bahasa, diagram proses PMD-1/PMD-2, dan fotografi.

## <a id="halaman"></a>📄 Halaman

| Halaman | Indonesia | English |
|---|---|---|
| Beranda | `/` | `/en` |
| Tentang Kami | `/tentang` | `/en/about` |
| Produk | `/produk` | `/en/products` |
| Karier | `/karier` | `/en/careers` |
| Kontak | `/kontak` | `/en/contact` |

Halaman **Produk** memakai penelusur dua tingkat: *Beras* (tingkat mutu, klasifikasi & merk),
*Produk Samping* (bekatul, menir, broken, reject, sekam), dan *Layanan* (kemitraan petani, jasa
penggilingan). Dua panel di dalamnya memuat **diagram proses interaktif** — arahkan kursor ke
sebuah tahap untuk menyorotnya:

- `process-pmd1` — Penerimaan Gabah → Pengeringan → Pemecah Kulit → Beras Pecah Kulit
- `process-pmd2` — Penyosohan → Grading → Pengemasan → Distribusi

Masing-masing punya varian `-en` dengan label bahasa Inggris.

## 🚀 Menjalankan

```bash
npm install
cp .env.example .env      # isi DATABASE_URL
npm run db:migrate:dev    # buat tabel
npm run db:seed           # muat konten default + akun admin pertama
npm run dev               # http://localhost:3000
```

Butuh Node **24+** (lihat `.nvmrc`) dan Postgres **14+**.

Postgres lokal cepat lewat Docker:

```bash
docker run -d --name pmd-postgres \
  -e POSTGRES_USER=pmd -e POSTGRES_PASSWORD=pmd -e POSTGRES_DB=pangan_masa_depan \
  -p 5433:5432 postgres:16-alpine
```

Tanpa `DATABASE_URL`, situs tetap jalan memakai konten bawaan di `src/content/` — hanya panel
admin yang tidak tersedia. Berguna untuk build statis atau sekadar melihat-lihat.

```bash
npm run check             # lint + typecheck + production build
```

`db:seed` sengaja **tidak** menimpa baris yang sudah ada, supaya edit klien di `/admin` aman.
Selama konten masih ditulis di kode, dorong isi `src/content/` (termasuk token warna) ke
database dengan:

```bash
npm run db:resync         # DESTRUKTIF: menimpa konten & tema di database
```

## <a id="panel-admin"></a>🔐 Panel admin

Di `/admin`, di balik login. Akun pertama dibuat oleh `npm run db:seed` dari `ADMIN_EMAIL` /
`ADMIN_PASSWORD` di `.env`. **Ganti password itu setelah login pertama.**

| Bagian | Yang bisa diubah |
|---|---|
| Konten → *halaman* | Setiap seksi halaman tersebut, per bahasa |
| Situs & kontak | Nama, logo, favicon, email, telepon, alamat, peta, URL tiap halaman |
| Warna brand | Palet dan konstanta layout, dengan pratinjau langsung |
| Media | Unggah, beri keterangan, dan hapus gambar |
| Pengguna | Akun dan peran — khusus administrator |

Menyimpan berarti menerbitkan; tidak ada status draf. Setiap penyimpanan me-*revalidate* laman
publik, jadi perubahan tampil pada permintaan berikutnya.

## ✏️ Mengubah lewat kode

Panel admin menutupi semuanya. Mengubahnya sebagai kode berarti mengubah **nilai bawaan** yang
dipakai `npm run db:seed`.

1. **`src/content/site.ts`** — nama, logo, favicon, rute per bahasa, email, telepon, alamat, peta.
2. **`src/content/id.ts` / `en.ts`** — seluruh naskah. Keduanya bercermin seksi demi seksi;
   `**tebal**` di dalam baris headline dirender sebagai `<b>`.
3. **`src/styles/theme.css`** — blok `:root` memegang palet PMD:

   ```css
   --brand-dark: #1e1a10;        /* sekam 900 — navbar solid & seksi gelap */
   --brand-darker: #100e08;      /* sekam 950 — footer */
   --brand-accent: #e9bd0c;      /* emas PMD — pil, status aktif, penanda */
   --brand-accent-soft: #f2ce45; /* emas 400 — hover & marker di latar gelap */
   --brand-accent-deep: #8c7200; /* emas 700 — label & tautan di latar terang (AA) */
   ```

   `src/content/theme.ts` mencerminkan nilai yang sama untuk seed dan panel admin — ubah keduanya.
4. **`scripts/generate-brand-assets.mjs`** — diagram proses dan ornamen penutup digambar oleh
   skrip ini (`node scripts/generate-brand-assets.mjs`) memakai warna sistem PMD. Logo tidak
   ikut dibuat di sini: itu berkas resmi di `public/brand/`.
5. **`scripts/fetch-demo-photos.mjs`** — mengunduh ulang fotografi sementara ke `public/images/`.

## 🎨 Sistem warna & tipografi

Mengikuti dokumen internal **"Website Color System v2 — Palet PMD dengan formula Reethau"**:
kanvas putih yang luas, satu gelap pekat bertinta emas untuk navigasi dan footer, dan emas
dalam porsi kecil sebagai penanda. Proporsi yang dituju **±72% putih · ±25% sekam · ±3% emas** —
emas hanya di pil bahasa, segitiga penanda, satu tombol utama, dan angka aksen.

| Peran | Token | Nilai |
|---|---|---|
| Nav & seksi gelap | `--brand-dark` | `#1E1A10` (sekam 900) |
| Footer | `--brand-darker` | `#100E08` (sekam 950) |
| Penanda, pil, status aktif | `--brand-accent` | `#E9BD0C` (emas PMD) |
| Hover & marker di latar gelap | `--brand-accent-soft` | `#F2CE45` |
| Label & tautan di latar terang | `--brand-accent-deep` | `#8C7200` (kontras AA) |
| Teks sekunder di latar gelap | `--text-muted` | `#A8A296` |

Emas murni `#E9BD0C` **tidak** dipakai sebagai warna teks di latar putih (rasio kontrasnya
gagal WCAG) — untuk itu ada `--brand-accent-deep`.

Tipografi: **Plus Jakarta Sans** lewat `next/font` (`src/app/fonts.ts`, dipasang di kedua root
layout publik). Judul besar berbobot 200 dengan `<b>` naik ke 700; panel admin sengaja tidak
ikut, karena punya lapisan gaya sendiri.

Logo resmi ada di `public/brand/`: `logo-light.png` (versi putih, untuk latar gelap — dipakai
navbar dan footer), `logo-dark.png` (versi warna, untuk latar terang), dan `favicon.png`.

## ⚠️ Yang masih harus diganti sebelum rilis

- [ ] **Kontak** di `src/content/site.ts` masih contoh: alamat, tiga nomor telepon, email, dan
      URL peta.
- [ ] **Foto** di `public/images/` diambil dari Pexels (bebas dipakai komersial tanpa atribusi)
      dan sebagian besar berlatar Asia Selatan, bukan fasilitas PMD. Ganti dengan foto pabrik,
      gudang, lantai jemur, dan produk sendiri.
- [ ] **Merk dan klasifikasi beras** disebut secara umum di halaman Produk; tambahkan daftar
      merk dan varietas yang sebenarnya bila sudah final.
- [x] ~~Logo~~ — logo resmi PMD sudah terpasang.
- [x] ~~Palet warna~~ — sudah mengikuti sistem warna PMD.

## 🧱 Stack

| Lapisan | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router), output `standalone` |
| UI | React 19, TypeScript 5 |
| Styling | Bootstrap 5.3 + Bootstrap Icons di atas design token sendiri |
| Data | Postgres 14+, Prisma 7 (`@prisma/adapter-pg`) |
| Auth | Sesi di database, scrypt dari `node:crypto` |
| Runtime | Node 24+ |
