#!/usr/bin/env node
/**
 * Generates the brand marks and process diagrams into public/brand/.
 *
 * They are drawn here rather than downloaded so the site carries no third-party
 * artwork. Swap them for the real logo and nothing else has to change.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = 'public/brand';
const GRAIN = '#d9a520';       /* --brand-accent      — gabah */
const GRAIN_SOFT = '#efc766';  /* --brand-accent-soft */
const LEAF = '#2f7a44';        /* daun padi           */
const DARK = '#14331f';        /* --brand-dark        */

/**
 * Wordmark: a rice stalk glyph plus the company name on two lines.
 * `fg` is the wordmark colour, `sub` the strapline colour.
 */
const logo = (fg, sub) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120" role="img" aria-label="PT Pangan Masa Depan">
  <g>
    <path d="M56 106 C56 78 55 50 58 22" stroke="${LEAF}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M56 92 C40 90 30 80 28 66 C43 67 54 76 56 92 Z" fill="${LEAF}" opacity=".9"/>
    <path d="M57 80 C72 77 81 67 82 54 C68 56 58 65 57 80 Z" fill="${LEAF}" opacity=".55"/>
    <g fill="${GRAIN}">
      <ellipse cx="45" cy="58" rx="6" ry="10.5" transform="rotate(-24 45 58)"/>
      <ellipse cx="69" cy="52" rx="6" ry="10.5" transform="rotate(24 69 52)"/>
      <ellipse cx="47" cy="40" rx="6" ry="10.5" transform="rotate(-20 47 40)"/>
      <ellipse cx="68" cy="35" rx="6" ry="10.5" transform="rotate(20 68 35)"/>
      <ellipse cx="58" cy="18" rx="6" ry="10.5"/>
    </g>
    <g fill="${GRAIN_SOFT}">
      <ellipse cx="50" cy="49" rx="5.4" ry="9.5" transform="rotate(-10 50 49)"/>
      <ellipse cx="64" cy="43" rx="5.4" ry="9.5" transform="rotate(10 64 43)"/>
      <ellipse cx="52" cy="30" rx="5.4" ry="9.5" transform="rotate(-8 52 30)"/>
      <ellipse cx="64" cy="26" rx="5.4" ry="9.5" transform="rotate(8 64 26)"/>
    </g>
  </g>
  <text x="100" y="60" font-family="Helvetica,Arial,sans-serif" font-size="40" font-weight="700" fill="${fg}">PANGAN</text>
  <text x="102" y="90" font-family="Helvetica,Arial,sans-serif" font-size="21" letter-spacing="3.4" fill="${fg}">MASA DEPAN</text>
  <text x="102" y="110" font-family="Helvetica,Arial,sans-serif" font-size="10" letter-spacing="2.6" fill="${sub}">AGRIBISNIS PADI &amp; BERAS</text>
</svg>`;

/** Decorative band behind the closing section — a stylised paddy horizon. */
const closingArt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" role="presentation">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="${GRAIN}" stop-opacity=".8"/>
      <stop offset="1" stop-color="${GRAIN_SOFT}" stop-opacity=".2"/>
    </linearGradient>
  </defs>
  <path d="M0 420 L520 150 L1080 330 L1600 90 L1600 420 Z" fill="url(#g)"/>
  <path d="M0 420 L420 260 L900 400 L1600 240 L1600 420 Z" fill="${GRAIN_SOFT}" opacity=".18"/>
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
      <rect x="${x}" y="180" width="270" height="190" rx="14"
            fill="${on ? LEAF : '#ffffff'}" stroke="${on ? LEAF : '#cbd8cd'}" stroke-width="2"/>
      <circle cx="${x + 135}" cy="240" r="26" fill="${on ? '#ffffff' : GRAIN_SOFT}" opacity="${on ? '.9' : '.65'}"/>
      <text x="${x + 135}" y="248" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
            font-size="22" font-weight="700" fill="${on ? LEAF : DARK}">${i + 1}</text>
      <text x="${x + 135}" y="308" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
            font-size="20" font-weight="600" fill="${on ? '#ffffff' : DARK}">${esc(label)}</text>
    </g>`;
  }).join('');

  const arrows = stations.slice(0, -1).map((_, i) => {
    const x = 330 + i * 350;
    return `<path d="M${x} 275 H${x + 44} M${x + 34} 265 L${x + 48} 275 L${x + 34} 285"
                  stroke="${GRAIN}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1460 460" role="img" aria-label="${esc(title)}">
  <rect width="1460" height="460" fill="#f3f6f2"/>
  <text x="60" y="100" font-family="Helvetica,Arial,sans-serif" font-size="30" font-weight="600" fill="${DARK}">${esc(title)}</text>
  <text x="60" y="134" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#5f7065">${esc(hint)}</text>
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
  ['logo-light.svg', logo('#ffffff', GRAIN_SOFT)],   // for dark backgrounds
  ['logo-dark.svg', logo(DARK, LEAF)],               // for light backgrounds
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
