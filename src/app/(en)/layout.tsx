import type { Metadata } from "next";
import { getSite, getTheme, themeStyleSheet } from "@/server/content";
import "../globals.css";

/**
 * Root layout for the English routes.
 *
 * The app has two root layouts — one per locale route group — so each can set its own
 * `lang` attribute. That is why there is no `src/app/layout.tsx`.
 *
 * Theme tokens are inlined as a `:root` override rather than written into the stylesheet,
 * so a colour change in the admin panel takes effect on the next request with no rebuild.
 * theme.css still carries the defaults, which is what renders when no database is set.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: { default: site.name, template: `%s | ${site.name}` },
    icons: { icon: site.favicon },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = await getTheme();

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyleSheet(theme) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
