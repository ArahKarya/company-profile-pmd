/**
 * Content contracts for the template.
 *
 * Everything the site renders comes from these shapes. Swapping in a different company
 * means editing `site.ts` and the per-locale content files — no component changes.
 */

export type Locale = "id" | "en";

export const LOCALES: readonly Locale[] = ["id", "en"] as const;

/** One of the five pages the template ships with. */
export type PageKey = "home" | "about" | "services" | "careers" | "contact";

export const PAGE_ORDER: readonly PageKey[] = [
  "home",
  "about",
  "services",
  "careers",
  "contact",
] as const;

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  /** Intrinsic size, when known. Lets the browser reserve space before load. */
  readonly width?: number;
  readonly height?: number;
}

/** Locale-independent brand and contact facts. */
export interface SiteConfig {
  readonly name: string;
  readonly logo: ImageAsset;
  readonly favicon: string;
  /** Route each page resolves to, per locale. */
  readonly routes: Readonly<Record<Locale, Readonly<Record<PageKey, string>>>>;
  readonly email: string;
  readonly careersEmail: string;
  readonly phones: readonly string[];
  readonly addressLines: readonly string[];
  readonly mapEmbedUrl: string;
  readonly certification?: ImageAsset;
  readonly copyright: string;
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                    */
/* -------------------------------------------------------------------------- */

export interface HeroSection {
  /** Rendered as separate lines. Wrap a fragment in <b> by using `**bold**`. */
  readonly headline: readonly string[];
  readonly body?: string;
  readonly scrollCue?: string;
  readonly background: { readonly desktop: string; readonly mobile: string };
}

export interface SplitSection {
  readonly eyebrow?: string;
  readonly headline?: readonly string[];
  readonly body: readonly string[];
  readonly media: readonly ImageAsset[];
  /** Put the media column first on desktop. */
  readonly mediaFirst?: boolean;
}

/** Tombol di bawah hero beranda. */
export interface HeroAction {
  readonly label: string;
  readonly href: string;
  /** "solid" (isi gelap) atau "outline" (bergaris). Default: solid. */
  readonly variant?: "solid" | "outline";
}

/** Hero beranda: naskah di kiri di atas kanvas terang, satu foto sebagai blok di kanan. */
export interface SplitHeroSection {
  readonly eyebrow?: string;
  /** Satu entri per baris visual; `**tebal**` di dalamnya dirender sebagai <b>. */
  readonly headline: readonly string[];
  readonly body?: string;
  readonly image: ImageAsset;
  readonly actions?: readonly HeroAction[];
}

/** Satu sel pada pita angka. `value` sengaja string: bisa berisi "[ANGKA]" saat data belum ada. */
export interface StatItem {
  readonly value: string;
  readonly unit?: string;
  readonly label: string;
}

export interface StatsSection {
  readonly items: readonly StatItem[];
}

/** Satu kartu pada grid produk beranda. */
export interface CardItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly image: ImageAsset;
  readonly link?: { readonly href: string; readonly label: string };
}

export interface CardsSection {
  readonly eyebrow: string;
  readonly headline: readonly string[];
  /** Tautan di kanan judul, mis. "Semua produk". */
  readonly link?: { readonly href: string; readonly label: string };
  readonly items: readonly CardItem[];
}

/** Satu tahap pada pita alur produksi. */
export interface ProcessStep {
  readonly step: string;
  readonly title: string;
  readonly body: string;
}

/** Satu-satunya pita gelap di beranda: alur PMD-1 → PMD-2. */
export interface ProcessSection {
  readonly title: string;
  readonly note?: string;
  readonly steps: readonly ProcessStep[];
}

/** Pita ajakan sebelum footer. */
export interface CtaSection {
  readonly headline: readonly string[];
  readonly button: { readonly href: string; readonly label: string };
}

export interface HomeContent {
  readonly hero: SplitHeroSection;
  readonly intro: SplitSection;
  readonly stats: StatsSection;
  readonly products: CardsSection;
  readonly process: ProcessSection;
  readonly gallery: {
    readonly caption: string;
    readonly images: readonly ImageAsset[];
  };
  readonly cta: CtaSection;
}

export interface AboutContent {
  readonly hero: HeroSection;
  readonly statement: string;
  readonly vision: SplitSection;
  readonly mission: SplitSection & { readonly art: string };
}

/** A clickable region over a diagram, expressed in percentages of the image box. */
export interface Hotspot {
  readonly id: string;
  readonly label: string;
  /** left, top, width, height — all 0-100, as percentages. */
  readonly rect: readonly [number, number, number, number];
  /** Image swapped in while the region is hovered. */
  readonly preview: string;
}

export interface HotspotDiagram {
  readonly base: ImageAsset;
  readonly hotspots: readonly Hotspot[];
}

/** A leaf panel in the services page. */
export interface ServicePanel {
  readonly id: string;
  readonly label: string;
  readonly eyebrow?: string;
  readonly headline: readonly string[];
  readonly body: readonly string[];
  readonly image?: ImageAsset;
  readonly diagram?: HotspotDiagram;
}

/** A sidebar heading with its child panels. */
export interface ServiceCategory {
  readonly id: string;
  readonly label: string;
  readonly panel: ServicePanel;
  readonly children: readonly ServicePanel[];
}

export interface ServicesContent {
  readonly overview: ServicePanel;
  readonly categories: readonly ServiceCategory[];
}

export interface CareersContent {
  readonly headline: readonly string[];
  readonly body: readonly string[];
  readonly emailLabel: string;
  readonly image: ImageAsset;
}

export interface ContactContent {
  readonly headline: readonly string[];
  readonly officeLabel: string;
}

/** Everything one locale needs. */
export interface LocaleContent {
  readonly localeName: string;
  readonly nav: Readonly<Record<PageKey, string>>;
  readonly meta: Readonly<Record<PageKey, { readonly title: string; readonly description: string }>>;
  readonly footer: {
    readonly officeLabel: string;
    readonly contactsLabel: string;
  };
  readonly home: HomeContent;
  readonly about: AboutContent;
  readonly services: ServicesContent;
  readonly careers: CareersContent;
  readonly contact: ContactContent;
}
