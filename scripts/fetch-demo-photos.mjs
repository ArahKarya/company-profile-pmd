#!/usr/bin/env node
/**
 * Downloads the demo photography into public/images/.
 *
 * Every photo is an Unsplash photo filtered to the Free license, which permits commercial
 * use without attribution. They are demo content only — replace them with your own before
 * shipping a real site. Re-runnable: existing files are skipped.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const OUT = 'public/images';
const CDN = 'https://images.unsplash.com/photo-';

/** [output name, unsplash id, width, height] — height omitted means natural aspect. */
const PHOTOS = [
  ['hero-home-desktop',   '1509390288171-ce2088f7d08e', 2000, 1200],
  ['hero-home-mobile',    '1509390288171-ce2088f7d08e',  800, 1400],
  ['hero-about',          '1588011930968-eadac80e6a5a', 2000, 1200],

  ['intro-1',             '1496247749665-49cf5b1022e9', 1200,  900],
  ['intro-2',             '1577894947058-cfdae4276bef', 1200,  900],

  ['feature-power',       '1716191300020-b52dec5b70a8', 1400,  900],
  ['feature-processing',  '1717386255773-1e3037c81788', 1400,  900],
  ['feature-logistics',   '1601584115197-04ecc0da31d7', 1400,  900],

  ['gallery-1',           '1647427060118-4911c9821b82', 1000, 1200],
  ['gallery-2',           '1578776349090-de61da00ff1a', 1000, 1200],
  ['gallery-3',           '1582489853490-cd3a53eb4530', 1000,  700],
  ['gallery-4',           '1598299803204-b73796f43289', 1000,  700],
  ['gallery-5',           '1565793298595-6a879b1d9492', 1000,  700],
  ['gallery-6',           '1652211955967-99c892925469', 1000, 1000],
  ['gallery-7',           '1588011930968-eadac80e6a5a', 1000, 1000],

  ['about-vision',        '1496247749665-49cf5b1022e9', 1200,  900],
  ['about-mission-1',     '1504328345606-18bbc8c9d7d1', 1000,  800],
  ['about-mission-2',     '1589792923962-537704632910', 1000,  800],
  ['about-mission-3',     '1651525670114-2b8117390b28', 1000,  800],

  ['careers',             '1581094488379-6a10d04c0f04', 2000,  900],
  ['service-detail-1',    '1504917595217-d4dc5ebe6122', 1200,  800],
  ['service-detail-2',    '1647427060118-4911c9821b82', 1200,  800],
];

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

async function download([name, id, w, h]) {
  const dest = join(OUT, `${name}.jpg`);
  if (await exists(dest)) return `skip  ${dest}`;
  const url = `${CDN}${id}?fm=jpg&q=78&fit=crop&w=${w}&h=${h}`;
  const res = await fetch(url);
  if (!res.ok) return `FAIL ${res.status}  ${dest}`;
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return `ok ${String(Math.round(buf.length / 1024)).padStart(4)}kB  ${dest}`;
}

const failures = [];
for (let i = 0; i < PHOTOS.length; i += 4) {
  const batch = await Promise.all(PHOTOS.slice(i, i + 4).map(download));
  for (const line of batch) {
    console.log(line);
    if (line.startsWith('FAIL')) failures.push(line);
  }
}
console.log(`\n${PHOTOS.length - failures.length}/${PHOTOS.length} available`);
if (failures.length) process.exitCode = 1;
