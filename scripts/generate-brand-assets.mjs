#!/usr/bin/env node
/**
 * Generates the process diagrams and the closing-band artwork into public/brand/.
 *
 * The logo itself is NOT generated: logo-light.png, logo-dark.png and favicon.png are the
 * official PMD marks, copied in from the brand assets folder. Everything drawn here follows
 * the PMD colour system — sekam (near-black inked with gold), gold as a marker only, and a
 * warm paper background.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = 'public/brand';
const GOLD = '#E9BD0C';        /* --brand-accent      — emas PMD */
const GOLD_SOFT = '#F2CE45';   /* --brand-accent-soft */
const GOLD_DEEP = '#8C7200';   /* --brand-accent-deep — teks emas di latar terang */
const GOLD_TINT = '#FBF4DF';   /* emas 100            */
const DARK = '#1E1A10';        /* --brand-dark        — sekam 900 */
const INK = '#1F1D19';         /* teks judul          */
const MUTED = '#7A7468';       /* teks sekunder       */
const PAPER = '#FAF9F6';       /* kanvas hangat       */
const LINE = '#E6E3DC';        /* garis rambut        */

/**
 * Decorative band behind the closing section.
 *
 * Sengaja tipis: emas hanya sebagai garis horizon dan lapisan tipis, bukan bidang penuh —
 * mengikuti aturan proporsi ±3% emas dalam sistem warna PMD.
 */
const closingArt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" role="presentation">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="${GOLD}" stop-opacity=".16"/>
      <stop offset="1" stop-color="${GOLD_SOFT}" stop-opacity=".04"/>
    </linearGradient>
  </defs>
  <path d="M0 420 L520 150 L1080 330 L1600 90 L1600 420 Z" fill="url(#g)"/>
  <path d="M0 420 L520 150 L1080 330 L1600 90" fill="none" stroke="${GOLD}" stroke-width="2" stroke-opacity=".85"/>
  <path d="M0 420 L420 260 L900 400 L1600 240 L1600 420 Z" fill="${GOLD_SOFT}" opacity=".06"/>
  <path d="M0 420 L420 260 L900 400 L1600 240" fill="none" stroke="${GOLD_SOFT}" stroke-width="1.5" stroke-opacity=".35"/>
</svg>`;

/**
 * Process diagram with four labelled stations. `highlight` picks one station to tint,
 * which is how the hover previews are produced.
 */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const diagram = (title, hint, stations, highlight = null) => {
  const boxes = stations.map((label, i) => {
    const x = 60 + i * 350;
    const on = highlight === i;
    return `
    <g>
      <rect x="${x}" y="180" width="270" height="190" rx="0"
            fill="${on ? DARK : '#ffffff'}" stroke="${on ? DARK : LINE}" stroke-width="1.5"/>
      <circle cx="${x + 135}" cy="240" r="26" fill="${on ? GOLD : GOLD_TINT}"/>
      <text x="${x + 135}" y="248" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
            font-size="22" font-weight="700" fill="${on ? DARK : GOLD_DEEP}">${i + 1}</text>
      <text x="${x + 135}" y="308" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
            font-size="20" font-weight="600" fill="${on ? '#ffffff' : INK}">${esc(label)}</text>
    </g>`;
  }).join('');

  const arrows = stations.slice(0, -1).map((_, i) => {
    const x = 330 + i * 350;
    return `<path d="M${x} 275 H${x + 44} M${x + 34} 265 L${x + 48} 275 L${x + 34} 285"
                  stroke="${GOLD}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1460 460" role="img" aria-label="${esc(title)}">
  <rect width="1460" height="460" fill="${PAPER}"/>
  <text x="60" y="100" font-family="Helvetica,Arial,sans-serif" font-size="30" font-weight="600" fill="${INK}">${esc(title)}</text>
  <text x="60" y="134" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="${MUTED}">${esc(hint)}</text>
  ${arrows}${boxes}
</svg>`;
};

const HINT_ID = 'Arahkan kursor ke sebuah tahap untuk menyorotnya.';
const HINT_EN = 'Hover a stage to highlight it.';

/** [file base, title, hint, stations] */
const DIAGRAMS = [
  ['process-pmd1', 'Unit PMD-1 — Penggilingan', HINT_ID,
    ['Penerimaan Gabah', 'Pengeringan', 'Pemecah Kulit', 'Beras Pecah Kulit']],
  ['process-pmd1-en', 'PMD-1 — Milling unit', HINT_EN,
    ['Paddy intake', 'Drying', 'Husking', 'Brown rice']],
  ['process-pmd2', 'Unit PMD-2 — Penyosohan & Pengemasan', HINT_ID,
    ['Penyosohan', 'Grading', 'Pengemasan', 'Distribusi']],
  ['process-pmd2-en', 'PMD-2 — Polishing & packing', HINT_EN,
    ['Polishing', 'Grading', 'Packing', 'Distribution']],
];

await mkdir(OUT, { recursive: true });

const files = [
  ['closing-art.svg', closingArt],
];

for (const [name, title, hint, stations] of DIAGRAMS) {
  files.push([`${name}.svg`, diagram(title, hint, stations)]);
  stations.forEach((_, i) => files.push([`${name}-${i + 1}.svg`, diagram(title, hint, stations, i)]));
}

for (const [name, body] of files) {
  await writeFile(`${OUT}/${name}`, body.trimStart() + '\n');
  console.log(`wrote ${OUT}/${name}`);
}
