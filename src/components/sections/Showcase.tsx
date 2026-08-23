"use client";

import { Fragment, useState } from "react";
import { HotspotFigure } from "@/components/ui/HotspotFigure";
import { Headline } from "@/components/ui/RichText";
import type { ServicePanel, ServicesContent } from "@/content/types";

/**
 * Services page: a sidebar of categories and their children beside one visible panel.
 *
 * One piece of state — the id of the visible panel — drives everything. A child panel also
 * highlights its parent category, which is derived here rather than tracked separately.
 *
 * The sidebar is desktop-only; below `md` the same panels are reached through a pill row
 * (categories) plus a tab row (that category's children), which fits a narrow screen far
 * better than a tall vertical list.
 */
export function Showcase({ content }: { readonly content: ServicesContent }) {
  const [active, setActive] = useState(content.overview.id);

  const panels: ServicePanel[] = [
    content.overview,
    ...content.categories.flatMap((category) => [category.panel, ...category.children]),
  ];

  /** Category id that owns a panel id, for the parent-highlight rule. */
  const ownerOf = new Map<string, string>();
  for (const category of content.categories) {
    ownerOf.set(category.panel.id, category.id);
    for (const child of category.children) ownerOf.set(child.id, category.id);
  }
  const activeCategory = ownerOf.get(active);

  return (
    <section className="showcase section-auto">
      <div className="container-fluid py-2">
        {/* ---------- desktop: sidebar ---------- */}
        <div className="showcase-layout d-none d-lg-flex">
          <nav className="showcase-nav" aria-label={content.overview.label}>
            <SidebarButton
              label={content.overview.label}
              active={active === content.overview.id}
              onSelect={() => setActive(content.overview.id)}
              category
            />
            {content.categories.map((category) => (
              <div className="nav-group" key={category.id}>
                <SidebarButton
                  label={category.label}
                  active={activeCategory === category.id}
                  onSelect={() => setActive(category.panel.id)}
                  category
                />
                {category.children.map((child) => (
                  <SidebarButton
                    key={child.id}
                    label={child.label}
                    active={active === child.id}
                    onSelect={() => setActive(child.id)}
                  />
                ))}
              </div>
            ))}
          </nav>

          {panels.map((panel) => (
            <div
              key={panel.id}
              className={`showcase-panel${panel.id === active ? " active" : ""}`}
            >
              <PanelBody panel={panel} />
            </div>
          ))}
        </div>

        {/* ---------- mobile: pills + tabs ---------- */}
        <div className="d-flex d-lg-none flex-column w-100 gutter-1-mobile pt-nav pb-5">
          <MobileShowcase content={content} />
        </div>
      </div>
    </section>
  );
}

function SidebarButton({
  label,
  active,
  onSelect,
  category = false,
}: {
  readonly label: string;
  readonly active: boolean;
  readonly onSelect: () => void;
  readonly category?: boolean;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "true" : undefined}
      className={`${category ? "nav-category" : "nav-child"} btn-plain${
        active ? " active" : ""
      }`}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}

function PanelBody({ panel }: { readonly panel: ServicePanel }) {
  /* Panel bertabel dirender selebar halaman: tabel lima kolom tidak terbaca kalau
     dijejalkan ke separuh lebar di sebelah foto. */
  if (panel.tiers && panel.tiers.length > 0) {
    return (
      <div className="panel-wide">
        <div className="row align-items-center gy-4">
          <div className="col-12 col-lg-7">
            {panel.eyebrow && <span className="eyebrow">{panel.eyebrow}</span>}
            <Headline lines={panel.headline} />
            {panel.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {panel.image && (
            <div className="col-12 col-lg-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panel.image.src}
                alt={panel.image.alt}
                width={panel.image.width}
                height={panel.image.height}
                className="panel-figure w-100 h-auto m-0"
              />
            </div>
          )}
        </div>

        {/* Tabel dibalik: tingkat mutu menjadi kolom, sifatnya menjadi baris. Empat
            tingkat berdampingan lebih mudah dibandingkan daripada dibaca berurutan ke
            bawah. Kepala kolom menguat dari kiri ke kanan — dari netral ke sekam pekat —
            sehingga warnanya menyampaikan urutan mutu, bukan sekadar menghias. */}
        <div className="tier-grid">
          <span className="tier-corner" aria-hidden="true" />
          {panel.tiers.map((tier, index) => (
            <div className={`tier-head-cell tier-step-${index + 1}`} key={tier.code}>
              <span className="tier-code">{tier.code}</span>
              <span className="tier-name">{tier.name}</span>
            </div>
          ))}

          <span className="tier-label">Karakter butir</span>
          {panel.tiers.map((tier) => (
            <div className="tier-cell" key={`char-${tier.code}`}>
              <span className="tier-cell-label" aria-hidden="true">
                {tier.name}
              </span>
              {tier.character}
            </div>
          ))}

          <span className="tier-label">Pasar</span>
          {panel.tiers.map((tier) => (
            <div className="tier-cell" key={`market-${tier.code}`}>
              <span className="tier-cell-label" aria-hidden="true">
                {tier.name}
              </span>
              {tier.market}
            </div>
          ))}

          {panel.tierSpecs?.map((row) => (
            <Fragment key={row.label}>
              <span className="tier-label tier-label-spec">{row.label}</span>
              {panel.tiers?.map((tier, index) => (
                <div className="tier-cell tier-cell-spec" key={`${row.label}-${tier.code}`}>
                  <span className="tier-cell-label" aria-hidden="true">
                    {tier.name} · {row.label}
                  </span>
                  {row.values[index] ?? "—"}
                </div>
              ))}
            </Fragment>
          ))}
        </div>

        {panel.tierNote && <p className="tier-note">{panel.tierNote}</p>}
      </div>
    );
  }

  return (
    <div className="row align-items-center gy-4">
      <div className="col-12 col-lg-6">
        {panel.eyebrow && <span className="eyebrow">{panel.eyebrow}</span>}
        <Headline lines={panel.headline} />
        {panel.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="col-12 col-lg-6">
        {panel.diagram ? (
          <HotspotFigure diagram={panel.diagram} />
        ) : (
          panel.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={panel.image.src}
              alt={panel.image.alt}
              width={panel.image.width}
              height={panel.image.height}
              className="panel-figure w-100 h-auto m-0"
            />
          )
        )}
      </div>
    </div>
  );
}

/** Two-level mobile control: category pills, then that category's child tabs. */
function MobileShowcase({ content }: { readonly content: ServicesContent }) {
  const [category, setCategory] = useState(content.overview.id);
  const [panelId, setPanelId] = useState(content.overview.id);

  const selected = content.categories.find((entry) => entry.id === category);
  const visible: ServicePanel | undefined =
    category === content.overview.id
      ? content.overview
      : [selected?.panel, ...(selected?.children ?? [])].find((panel) => panel?.id === panelId) ??
        selected?.panel;

  const selectCategory = (id: string) => {
    setCategory(id);
    const next = content.categories.find((entry) => entry.id === id);
    setPanelId(next ? next.panel.id : content.overview.id);
  };

  return (
    <>
      <div className="showcase-pills">
        <button
          type="button"
          className={`pill btn-plain${
            category === content.overview.id ? " active" : ""
          }`}
          onClick={() => selectCategory(content.overview.id)}
        >
          {content.overview.label}
        </button>
        {content.categories.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`pill btn-plain${
              category === entry.id ? " active" : ""
            }`}
            onClick={() => selectCategory(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {selected && selected.children.length > 0 && (
        <div className="showcase-tabs">
          <button
            type="button"
            className={`tab btn-plain${
              panelId === selected.panel.id ? " active" : ""
            }`}
            onClick={() => setPanelId(selected.panel.id)}
          >
            {selected.panel.label}
          </button>
          {selected.children.map((child) => (
            <button
              key={child.id}
              type="button"
              className={`tab btn-plain${
                panelId === child.id ? " active" : ""
              }`}
              onClick={() => setPanelId(child.id)}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}

      {visible && (
        <div className="showcase-block active">
          <PanelBody panel={visible} />
        </div>
      )}
    </>
  );
}
