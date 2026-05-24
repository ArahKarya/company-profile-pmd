import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Archivo_Black } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://panganmasadepan.com"),
  title: {
    default: "PT Pangan Masa Depan — Penggilingan Beras Modern Indonesia",
    template: "%s — PT Pangan Masa Depan",
  },
  description:
    "Pabrik penggilingan beras modern dengan kapasitas 300 ton/hari di Indramayu. Mitra terpercaya untuk distributor, retailer, dan industri pangan Indonesia.",
  keywords: [
    "penggilingan beras",
    "PT Pangan Masa Depan",
    "PMD",
    "beras premium",
    "rice mill Indonesia",
    "supplier beras",
    "Indramayu",
  ],
  authors: [{ name: "PT Pangan Masa Depan" }],
  icons: {
    icon: "/images/logo-pmd.png",
    apple: "/images/logo-pmd.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PT Pangan Masa Depan",
    title: "PT Pangan Masa Depan — Penggilingan Beras Modern Indonesia",
    description:
      "Pabrik penggilingan beras modern 300 ton/hari di Indramayu. Mitra terpercaya distributor dan industri pangan.",
    images: ["/images/hero-bg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Pangan Masa Depan",
    description: "Penggilingan beras modern 300 ton/hari di Indramayu.",
    images: ["/images/hero-bg.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d11" },
  ],
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} h-full`}
    >
      <head>
        {/* Prevent FOUC: set dark class from localStorage / system preference before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pmd-theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface-page text-text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink-900 focus:text-paper-base focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Lompat ke konten utama
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
