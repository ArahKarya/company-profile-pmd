#!/usr/bin/env node
/**
 * Downloads the placeholder photography into public/images/.
 *
 * Every photo comes from Pexels, whose licence permits commercial use without
 * attribution. They stand in until PT Pangan Masa Depan's own facility photography is
 * available — replace them before treating the site as final. Re-runnable: existing
 * files are skipped, so delete a file to refresh just that one.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const OUT = 'public/images';

/** [output name, pexels photo id, width, height] — cropped to the given box. */
const PHOTOS = [
  ['hero-home-desktop',  35386125, 2000, 1200],  // sawah berundak dari udara
  ['hero-home-mobile',   35386125,  800, 1400],
  ['hero-about',         20217104, 2000, 1200],  // lantai jemur gabah dari udara

  ['intro-1',             5563370, 1200,  900],  // gabah dijemur
  ['intro-2',            38247811, 1200,  900],  // operator di mesin

  ['feature-milling',    29118168, 1400,  900],  // gabah dan mesin penggilingan
  ['feature-polishing',   2496592, 1400,  900],  // mesin penggilingan, operator
  ['feature-byproducts', 29948462, 1400,  900],  // karung di gudang

  ['gallery-1',          35738185, 1000, 1200],  // hamparan sawah
  ['gallery-2',          36514665, 1000, 1200],  // silo penyimpanan
  ['gallery-3',          11789292, 1000,  700],  // butir gabah
  ['gallery-4',          27896277, 1000,  700],  // pekerja di lantai jemur
  ['gallery-5',          29948458, 1000,  700],  // karung dimuat ke truk
  ['gallery-6',          19707897, 1000, 1000],  // lantai jemur dari udara
  ['gallery-7',           4110251, 1000, 1000],  // butir beras

  ['about-vision',       16767062, 1200,  900],  // petani menampi gabah
  ['about-mission-1',     2965707, 1000,  800],  // gabah dibongkar
  ['about-mission-2',    26651061, 1000,  800],  // karung tersusun di gudang
  ['about-mission-3',     5262428, 1000,  800],  // tim di lantai produksi

  ['careers',            32851822, 2000,  900],  // gudang dan tim
  ['service-detail-1',   36346840, 1200,  800],  // butir beras hasil sortir
  ['service-detail-2',   20217108, 1200,  800],  // lantai jemur di unit produksi
];

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download([name, id, w, h]) {
  const dest = join(OUT, `${name}.jpg`);
  if (await exists(dest)) return `skip  ${dest}`;
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`
    + `?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
  const res = await fetch(url);
  if (!res.ok) return `FAIL ${res.status}  ${dest}`;
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return `ok ${String(Math.round(buf.length / 1024)).padStart(4)}kB  ${dest}`;
}

const failures = [];
for (const photo of PHOTOS) {
  const line = await download(photo);
  if (line.startsWith('FAIL')) failures.push(line);
  console.log(line);
}
if (failures.length) {
  console.error(`\n${failures.length} download(s) failed.`);
  process.exit(1);
}
