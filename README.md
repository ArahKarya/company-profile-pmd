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
3. **`src/styles/theme.css`** — blok `:root` memegang palet:

   ```css
   --brand-dark: #14331f;        /* hijau sawah — seksi gelap, navbar solid */
   --brand-darker: #0b2114;      /* footer */
   --brand-accent: #d9a520;      /* emas gabah — pil, status aktif */
   --brand-accent-soft: #efc766;
   --brand-accent-deep: #7d5f0c; /* aksen di latar terang */
   ```

   `src/content/theme.ts` mencerminkan nilai yang sama untuk seed dan panel admin — ubah keduanya.
4. **`scripts/generate-brand-assets.mjs`** — logo padi, diagram proses, dan ornamen penutup
   digambar oleh skrip ini (`node scripts/generate-brand-assets.mjs`), bukan diunduh, sehingga
   repo tidak membawa karya pihak ketiga.
5. **`scripts/fetch-demo-photos.mjs`** — mengunduh ulang fotografi sementara ke `public/images/`.

## ⚠️ Yang masih harus diganti sebelum rilis

- [ ] **Kontak** di `src/content/site.ts` masih contoh: alamat, tiga nomor telepon, email, dan
      URL peta.
- [ ] **Logo** masih wordmark placeholder hasil skrip — ganti `public/brand/logo-light.svg`
      (untuk latar gelap) dan `logo-dark.svg` (latar terang) dengan logo resmi.
- [ ] **Foto** di `public/images/` diambil dari Pexels (bebas dipakai komersial tanpa atribusi)
      dan sebagian besar berlatar Asia Selatan, bukan fasilitas PMD. Ganti dengan foto pabrik,
      gudang, lantai jemur, dan produk sendiri.
- [ ] **Palet warna** memakai hijau sawah + emas gabah sebagai perkiraan; sesuaikan bila sudah
      ada warna korporat resmi.
- [ ] **Merk dan klasifikasi beras** disebut secara umum di halaman Produk; tambahkan daftar
      merk dan varietas yang sebenarnya bila sudah final.

## 🧱 Stack

| Lapisan | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router), output `standalone` |
| UI | React 19, TypeScript 5 |
| Styling | Bootstrap 5.3 + Bootstrap Icons di atas design token sendiri |
| Data | Postgres 14+, Prisma 7 (`@prisma/adapter-pg`) |
| Auth | Sesi di database, scrypt dari `node:crypto` |
| Runtime | Node 24+ |
