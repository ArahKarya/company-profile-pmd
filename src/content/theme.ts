/**
 * Theme tokens.
 *
 * Mirrors the `:root` block in src/styles/theme.css. The stylesheet holds the values the
 * site falls back to; this file is what the seed writes into the database and what the
 * admin panel edits. Keep the two in step.
 */

export interface ThemeTokens {
  readonly brandDark: string;
  readonly brandDarker: string;
  readonly brandAccent: string;
  readonly brandAccentSoft: string;
  readonly brandAccentDeep: string;
  readonly surfaceOverlay: string;
  readonly textMuted: string;
  readonly navHeightPx: number;
  readonly pageGutterPx: number;
}

export const DEFAULT_THEME: ThemeTokens = {
  brandDark: "#1e1a10",
  brandDarker: "#100e08",
  brandAccent: "#e9bd0c",
  brandAccentSoft: "#f2ce45",
  brandAccentDeep: "#8c7200",
  surfaceOverlay: "#1e1a10",
  textMuted: "#a8a296",
  navHeightPx: 100,
  pageGutterPx: 40,
};

/** Renders the tokens as a `:root` override the layout can inline. */
export function themeStyleSheet(theme: ThemeTokens): string {
  return `:root{
--brand-dark:${theme.brandDark};
--brand-darker:${theme.brandDarker};
--brand-accent:${theme.brandAccent};
--brand-accent-soft:${theme.brandAccentSoft};
--brand-accent-deep:${theme.brandAccentDeep};
--surface-overlay:${theme.surfaceOverlay};
--text-muted:${theme.textMuted};
--nav-height:${theme.navHeightPx}px;
--page-gutter:${theme.pageGutterPx}px;
}`;
}
