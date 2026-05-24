import { ThemeToggleDev } from "./theme-toggle-dev";

/**
 * Internal design system showcase — visual QA for tokens.
 * Removed before production deploy (gated behind /dev/ path only used during refactor).
 */
export default function ShowcasePage() {
  return (
    <main id="main" className="flex-1 px-6 md:px-12 py-12 max-w-[1440px] mx-auto w-full">
      <header className="flex items-start justify-between mb-16 pb-8 border-b-2 border-ink-900 dark:border-paper-base">
        <div>
          <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400 mb-2">
            00 — PMD Design System
          </div>
          <h1 className="font-display text-display-lg text-text-primary">
            Industrial Editorial Tokens
          </h1>
        </div>
        <ThemeToggleDev />
      </header>

      <ColorSection />
      <TypographySection />
      <SpacingSection />
      <ShadowSection />
      <RadiusSection />
      <MotionSection />
    </main>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-mono-sm uppercase tracking-[0.15em] text-text-muted">
          {number}
        </span>
        <h2 className="font-display text-display-sm text-text-primary">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="border border-surface-border-bold">
      <div className="h-20" style={{ background: `var(--${value})` }} />
      <div className="px-3 py-2 bg-surface-card border-t border-surface-border">
        <div className="font-mono text-mono-xs uppercase text-text-secondary">
          {name}
        </div>
        <div className="font-mono text-mono-xs text-text-muted">{value}</div>
      </div>
    </div>
  );
}

function ColorSection() {
  const goldScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const greenScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const inkScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const steelScale = [50, 100, 200, 300, 400, 500, 600, 700, 800];
  return (
    <Section number="01" title="Color">
      <div className="space-y-8">
        <div>
          <h3 className="font-mono text-mono-sm uppercase text-text-secondary mb-3">
            pmd-gold (primary)
          </h3>
          <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
            {goldScale.map((n) => (
              <Swatch key={n} name={`gold-${n}`} value={`pmd-gold-${n}`} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-mono text-mono-sm uppercase text-text-secondary mb-3">
            pmd-green (secondary)
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {greenScale.map((n) => (
              <Swatch key={n} name={`green-${n}`} value={`pmd-green-${n}`} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-mono text-mono-sm uppercase text-text-secondary mb-3">
            ink (text)
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {inkScale.map((n) => (
              <Swatch key={n} name={`ink-${n}`} value={`ink-${n}`} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-mono text-mono-sm uppercase text-text-secondary mb-3">
            steel (industrial)
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
            {steelScale.map((n) => (
              <Swatch key={n} name={`steel-${n}`} value={`steel-${n}`} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function TypographySection() {
  const samples = [
    { token: "display-2xl", text: "Industrial 2XL" },
    { token: "display-xl", text: "Industrial XL" },
    { token: "display-lg", text: "Industrial LG" },
    { token: "display-md", text: "Display MD" },
    { token: "display-sm", text: "Display SM" },
    { token: "heading-xl", text: "Heading XL" },
    { token: "heading-lg", text: "Heading LG" },
    { token: "heading-md", text: "Heading MD" },
    { token: "heading-sm", text: "Heading SM" },
    { token: "body-lg", text: "Body LG — Pabrik penggilingan beras modern 300 ton per hari di Indramayu." },
    { token: "body-md", text: "Body MD — Default body copy." },
    { token: "body-sm", text: "Body SM — Helper text & captions." },
    { token: "label-md", text: "LABEL MD" },
    { token: "label-sm", text: "LABEL SM" },
  ];
  const monoSamples = [
    { token: "mono-md", text: "300 TON/HARI" },
    { token: "mono-sm", text: "01 — INDUSTRIAL" },
    { token: "mono-xs", text: "ISO 22000 · HALAL" },
  ];
  return (
    <Section number="02" title="Typography">
      <div className="space-y-3 border border-surface-border-bold p-6 mb-6">
        {samples.map((s) => (
          <div key={s.token} className="flex items-baseline gap-6">
            <span className="font-mono text-mono-xs uppercase text-text-muted w-28 shrink-0">
              {s.token}
            </span>
            <span className={`text-${s.token} ${s.token.startsWith("display") ? "font-display" : ""}`}>
              {s.text}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-3 border border-surface-border-bold p-6 bg-surface-sunken">
        <div className="font-mono text-mono-sm uppercase text-text-secondary mb-3">
          Geist Mono (numerals + eyebrow tags)
        </div>
        {monoSamples.map((s) => (
          <div key={s.token} className="flex items-baseline gap-6">
            <span className="font-mono text-mono-xs uppercase text-text-muted w-28 shrink-0">
              {s.token}
            </span>
            <span className={`text-${s.token} font-mono`}>{s.text}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SpacingSection() {
  const sizes = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];
  return (
    <Section number="03" title="Spacing (8px rhythm)">
      <div className="space-y-2">
        {sizes.map((s) => (
          <div key={s} className="flex items-center gap-4">
            <span className="font-mono text-mono-xs uppercase text-text-muted w-16 shrink-0">
              space-{s}
            </span>
            <div
              className="bg-pmd-gold-500 h-4"
              style={{ width: `${s * 4}px` }}
            />
            <span className="font-mono text-mono-xs text-text-secondary">
              {s * 4}px
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ShadowSection() {
  const shadows = ["sm", "md", "lg", "xl"];
  return (
    <Section number="04" title="Shadow (hard offset)">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-4">
        {shadows.map((s) => (
          <div key={s} className="flex flex-col items-start gap-3">
            <div
              className="w-full h-24 bg-paper-base border-2 border-ink-900 dark:border-paper-base"
              style={{ boxShadow: `var(--shadow-${s})` }}
            />
            <div className="font-mono text-mono-xs uppercase text-text-secondary">
              shadow-{s}
            </div>
          </div>
        ))}
        <div className="flex flex-col items-start gap-3">
          <div
            className="w-full h-24 bg-paper-base border-2 border-ink-900 dark:border-paper-base"
            style={{ boxShadow: "var(--shadow-gold-md)" }}
          />
          <div className="font-mono text-mono-xs uppercase text-text-secondary">
            shadow-gold-md
          </div>
        </div>
      </div>
    </Section>
  );
}

function RadiusSection() {
  const radii = [
    { name: "none", value: "0" },
    { name: "xs", value: "2px" },
    { name: "sm", value: "4px" },
    { name: "md", value: "8px" },
  ];
  return (
    <Section number="05" title="Radius (industrial — sharp)">
      <div className="grid grid-cols-4 gap-4">
        {radii.map((r) => (
          <div key={r.name} className="flex flex-col items-start gap-2">
            <div
              className="w-full h-20 bg-ink-900 dark:bg-paper-base"
              style={{ borderRadius: r.value }}
            />
            <div className="font-mono text-mono-xs uppercase text-text-secondary">
              radius-{r.name} ({r.value})
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MotionSection() {
  const durations = ["instant", "fast", "default", "smooth", "entrance"];
  return (
    <Section number="06" title="Motion">
      <div className="space-y-2">
        {durations.map((d) => (
          <div
            key={d}
            className="font-mono text-mono-xs uppercase text-text-secondary"
          >
            duration-{d} = var(--duration-{d})
          </div>
        ))}
        <div className="pt-4 border-t border-surface-border mt-4">
          <div className="font-mono text-mono-xs uppercase text-text-secondary mb-2">
            Easing curves
          </div>
          <ul className="space-y-1 font-mono text-mono-xs text-text-muted">
            <li>ease-industrial-in — cubic-bezier(0.7, 0, 0.4, 1)</li>
            <li>ease-industrial-out — cubic-bezier(0.2, 0.8, 0.2, 1)</li>
            <li>ease-industrial-in-out — cubic-bezier(0.65, 0, 0.35, 1)</li>
            <li>ease-snap — cubic-bezier(0.9, 0, 0.1, 1)</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
