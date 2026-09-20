# Website PT Pangan Masa Depan (panganmasadepan.com)

Situs statis (HTML/CSS/JS murni) — pengganti permanen versi Next.js/Prisma sebelumnya.

## Struktur
- `index.html` — Beranda
- `products.html` — Produk
- `career.html` / `karir.html` — Karir
- `byproducts.html` — Produk Samping
- `css/`, `js/`, `images/`, `assets/` — aset statis

## Deploy
File disajikan langsung oleh Nginx (root statis) di VPS sumopod:
`/var/www/panganmasadepan-static`

Tidak ada build step, database, atau server-side rendering.
