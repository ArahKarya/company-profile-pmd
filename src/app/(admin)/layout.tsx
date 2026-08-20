import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/admin.css";

/**
 * Root layout for the admin panel.
 *
 * A third root layout alongside the two locale groups.
 *
 * Bootstrap's reboot and utilities are used by the admin components; the public theme is
 * deliberately *not* imported, so editing the site's brand colours never restyles the editor.
 * admin.css comes last and wins wherever the two overlap.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="admin">{children}</body>
    </html>
  );
}
