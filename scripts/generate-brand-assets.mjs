#!/usr/bin/env node
/**
 * Generates the placeholder brand marks and diagrams into public/brand/.
 *
 * These are drawn here rather than downloaded so the template carries no third-party
 * artwork: swap them for real assets and nothing else has to change.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = 'public/brand';
const ACCENT = '#2f9e8f';
const ACCENT_SOFT = '#6cc2a8';
const DARK = '#0f2d3d';

/** Wordmark: a chevron glyph plus the company name. */
const logo = (fg, sub) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120" role="img" aria-label="Meridian">
  <g fill="none">
    <path d="M14 26 L52 60 L14 94 Z" fill="${ACCENT}"/>
    <path d="M44 26 L82 60 L44 94 Z" fill="${ACCENT_SOFT}" opacity=".75"/>
  </g>
  <text x="98" y="70" font-family="Helvetica,Arial,sans-serif" font-size="46" font-weight="600" fill="${fg}">Meridian</text>
  <text x="100" y="94" font-family="Helvetica,Arial,sans-serif" font-size="13" letter-spacing="4.5" fill="${sub}">INDUSTRIAL</text>
</svg>`;

/** Decorative band behind the closing section. */
const closingArt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" role="presentation">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity=".85"/>
      <stop offset="1" stop-color="${ACCENT_SOFT}" stop-opacity=".25"/>
    </linearGradient>
  </defs>
  <path d="M0 420 L520 150 L1080 330 L1600 90 L1600 420 Z" fill="url(#g)"/>
  <path d="M0 420 L420 260 L900 400 L1600 240 L1600 420 Z" fill="${ACCENT_SOFT}" opacity=".2"/>
</svg>`;

/**
 * Process diagram with four labelled stations. `highlight` picks one station to tint,
 * which is how the hover previews are produced.
 */
const diagram = (title, stations, highlight = null) => {
  const boxes = stations.map((label, i) => {
    const x = 60 + i * 350;
    const on = highlight === i;
    return `
    <g>
      <rect x="${x}" y="180" width="270" height="190" rx="14"
            fill="${on ? ACCENT : '#ffffff'}" stroke="${on ? ACCENT : '#c9d4d8'}" stroke-width="2"/>
      <circle cx="${x + 135}" cy="240" r="26" fill="${on ? '#ffffff' : ACCENT_SOFT}" opacity="${on ? '.9' : '.55'}"/>
      <text x="${x + 135}" y="248" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
            font-size="22" font-weight="700" fill="${on ? ACCENT : DARK}">${i + 1}</text>
      <text x="${x + 135}" y="308" text-anchor="middle" font-family="Helvetica,Arial,sans-serif"
            font-size="21" font-weight="600" fill="${on ? '#ffffff' : DARK}">${label}</text>
    </g>`;
  }).join('');

  const arrows = stations.slice(0, -1).map((_, i) => {
    const x = 330 + i * 350;
    return `<path d="M${x} 275 H${x + 44} M${x + 34} 265 L${x + 48} 275 L${x + 34} 285"
                  stroke="${ACCENT}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1460 460" role="img" aria-label="${title}">
  <rect width="1460" height="460" fill="#f2f6f7"/>
  <text x="60" y="100" font-family="Helvetica,Arial,sans-serif" font-size="30" font-weight="600" fill="${DARK}">${title}</text>
  <text x="60" y="134" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#5d6f76">Placeholder diagram — hover a stage to highlight it.</text>
  ${arrows}${boxes}
</svg>`;
};

const DIAGRAMS = [
  ['process-supply', 'Supply chain', ['Sourcing', 'Inspection', 'Storage', 'Dispatch']],
  ['process-plant', 'Plant operations', ['Intake', 'Processing', 'Quality', 'Output']],
];

await mkdir(OUT, { recursive: true });

const files = [
  ['logo-light.svg', logo('#ffffff', ACCENT_SOFT)],   // for dark backgrounds
  ['logo-dark.svg', logo(DARK, ACCENT)],              // for light backgrounds
  ['closing-art.svg', closingArt],
];

for (const [name, title, stations] of DIAGRAMS) {
  files.push([`${name}.svg`, diagram(title, stations)]);
  stations.forEach((_, i) => files.push([`${name}-${i + 1}.svg`, diagram(title, stations, i)]));
}

for (const [name, body] of files) {
  await writeFile(`${OUT}/${name}`, body.trimStart() + '\n');
  console.log(`wrote ${OUT}/${name}`);
}
