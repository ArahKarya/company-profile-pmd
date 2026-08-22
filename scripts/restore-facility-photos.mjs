#!/usr/bin/env node
/**
 * Catatan cara foto fasilitas PMD disiapkan — bukan skrip yang dijalankan otomatis.
 *
 * Foto di public/images/facility-*.jpg diekstrak dari company profile PMD 2025:
 *
 *   pdfimages -j -f 7 -l 7 "PMD 2025 - Compro.pdf" p7    # enam tahap produksi
 *   pdfimages -j -f 2 -l 2 "PMD 2025 - Compro.pdf" p2    # lantai giling (2362x1330)
 *   pdfimages -j -f 6 -l 6 "PMD 2025 - Compro.pdf" p6    # menara pengering
 *
 * Hasil ekstrak bersemburat kuning karena penerangan lampu natrium di dalam pabrik, jadi
 * tiap berkas dikoreksi: grey-world white balance 60% (bukan penuh — adegan yang memang
 * hangat akan berbalik jadi kemerahan), autocontrast, dan sedikit penajaman.
 *
 * facility-drying.jpg BUKAN dari PDF: itu foto langsung dari pabrik, tidak dikoreksi.
 *
 * Ganti berkas mana pun di sini begitu foto asli beresolusi penuh tersedia.
 */
