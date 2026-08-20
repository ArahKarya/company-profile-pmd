"use client";

import { useState, useTransition } from "react";
import { saveTheme } from "@/server/actions";
import { DEFAULT_THEME, type ThemeTokens } from "@/content/theme";
import { ColorInput, NumberInput } from "../_ui/fields";

export function ThemeForm({ initial }: { readonly initial: ThemeTokens }) {
  const [value, setValue] = useState<ThemeTokens>(initial);
  const [saved, setSaved] = useState<ThemeTokens>(initial);
  const [status, setStatus] = useState<{ ok?: string; error?: string }>({});
  const [pending, start] = useTransition();

  const dirty = JSON.stringify(value) !== JSON.stringify(saved);
  const patch = (next: Partial<ThemeTokens>) => setValue((current) => ({ ...current, ...next }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveTheme(value);
          if (result.error) {
            setStatus({ error: result.error });
          } else {
            setSaved(value);
            setStatus({ ok: "Saved." });
          }
        });
      }}
    >
      {status.error && <div className="admin-alert error">{status.error}</div>}

      <div className="admin-card">
        <h2>Palette</h2>
        <p className="hint">Hex values such as <code>#0f2d3d</code>.</p>
        <div className="admin-grid">
          <ColorInput
            label="Dark — sections and solid navbar"
            value={value.brandDark}
            onChange={(brandDark) => patch({ brandDark })}
          />
          <ColorInput
            label="Darker — footer"
            value={value.brandDarker}
            onChange={(brandDarker) => patch({ brandDarker })}
          />
          <ColorInput
            label="Accent — pills and active states"
            value={value.brandAccent}
            onChange={(brandAccent) => patch({ brandAccent })}
          />
          <ColorInput
            label="Accent soft — headings and markers"
            value={value.brandAccentSoft}
            onChange={(brandAccentSoft) => patch({ brandAccentSoft })}
          />
          <ColorInput
            label="Accent deep — accent on light backgrounds"
            value={value.brandAccentDeep}
            onChange={(brandAccentDeep) => patch({ brandAccentDeep })}
          />
          <ColorInput
            label="Mobile menu overlay"
            value={value.surfaceOverlay}
            onChange={(surfaceOverlay) => patch({ surfaceOverlay })}
          />
          <ColorInput
            label="Muted text"
            value={value.textMuted}
            onChange={(textMuted) => patch({ textMuted })}
          />
        </div>
      </div>

      <div className="admin-card">
        <h2>Layout</h2>
        <p className="hint">Applies across every page.</p>
        <div className="admin-grid">
          <NumberInput
            label="Navbar height (px)"
            value={value.navHeightPx}
            min={48}
            max={200}
            onChange={(navHeightPx) => patch({ navHeightPx })}
          />
          <NumberInput
            label="Page side padding (px)"
            value={value.pageGutterPx}
            min={0}
            max={160}
            onChange={(pageGutterPx) => patch({ pageGutterPx })}
          />
        </div>
      </div>

      <div className="admin-card">
        <h2>Preview</h2>
        <p className="hint">A rough sense of the palette — see the live site for the real thing.</p>
        <div
          style={{
            background: value.brandDark,
            color: "#fff",
            padding: 24,
            borderRadius: 9,
          }}
        >
          <div style={{ color: value.brandAccentSoft, fontSize: "0.8rem", letterSpacing: "0.04em" }}>
            EYEBROW
          </div>
          <div style={{ fontSize: "1.6rem", fontWeight: 300, margin: "6px 0 12px" }}>
            A headline in <b style={{ fontWeight: 600 }}>brand colours</b>
          </div>
          <span
            style={{
              background: value.brandAccent,
              color: value.brandDark,
              padding: "4px 14px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            Accent pill
          </span>
          <div style={{ color: value.textMuted, fontSize: "0.85rem", marginTop: 14 }}>
            Muted supporting text
          </div>
        </div>
        <div style={{ background: value.brandDarker, height: 42, borderRadius: 9, marginTop: 8 }} />
      </div>

      <div className="admin-actions">
        <button type="submit" className="btn-admin primary" disabled={pending || !dirty}>
          {pending ? "Saving…" : dirty ? "Save changes" : "Saved"}
        </button>
        <button
          type="button"
          className="btn-admin ghost"
          onClick={() => setValue(DEFAULT_THEME)}
          disabled={pending}
        >
          Reset to defaults
        </button>
        {status.ok && !dirty && <span style={{ color: "var(--admin-success)" }}>{status.ok}</span>}
      </div>
    </form>
  );
}
