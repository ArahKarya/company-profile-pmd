import Link from "next/link";
import { requireUser, pruneExpiredSessions } from "@/server/auth";
import { requireDb } from "@/server/db";
import { LOCALES, PAGE_ORDER } from "@/content/types";

export const dynamic = "force-dynamic";

const PAGE_LABEL: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  careers: "Careers",
  contact: "Contact",
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await requireUser();
  const { error } = await searchParams;
  const db = requireDb();

  // Cheap housekeeping on a page that is visited often and never hot.
  await pruneExpiredSessions();

  const [pages, mediaCount, userCount] = await Promise.all([
    db.pageContent.findMany({
      select: { locale: true, page: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    db.mediaAsset.count(),
    db.user.count(),
  ]);

  const recent = pages.slice(0, 6);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="subtitle">
            Edit the site&apos;s content, contact details and branding. Changes go live as soon as
            you save.
          </p>
        </div>
        <Link href="/" className="btn-admin ghost">
          View site
        </Link>
      </div>

      {error === "forbidden" && (
        <div className="admin-alert warn" role="alert">
          That page is only available to administrators.
        </div>
      )}

      <div className="admin-card">
        <h2>Pages</h2>
        <p className="hint">Ten pages — five in each language.</p>
        <div className="admin-grid">
          {LOCALES.map((locale) => (
            <div key={locale}>
              <strong style={{ fontSize: "0.85rem" }}>
                {locale === "id" ? "Indonesian" : "English"}
              </strong>
              <ul className="list-unstyled mt-2 mb-0">
                {PAGE_ORDER.map((page) => (
                  <li key={page} className="mb-1">
                    <Link href={`/admin/content/${locale}/${page}`}>{PAGE_LABEL[page]}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Recently edited</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Language</th>
              <th>Last saved</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((row) => (
              <tr key={`${row.locale}-${row.page}`}>
                <td>
                  <Link href={`/admin/content/${row.locale}/${row.page}`}>
                    {PAGE_LABEL[row.page]}
                  </Link>
                </td>
                <td>{row.locale === "id" ? "Indonesian" : "English"}</td>
                <td>{row.updatedAt.toLocaleString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>{mediaCount}</h2>
          <p className="hint mb-0">
            image{mediaCount === 1 ? "" : "s"} in the <Link href="/admin/media">media library</Link>
          </p>
        </div>
        <div className="admin-card">
          <h2>{userCount}</h2>
          <p className="hint mb-0">
            {user.role === "ADMIN" ? (
              <>
                account{userCount === 1 ? "" : "s"} — <Link href="/admin/users">manage</Link>
              </>
            ) : (
              <>account{userCount === 1 ? "" : "s"}</>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
