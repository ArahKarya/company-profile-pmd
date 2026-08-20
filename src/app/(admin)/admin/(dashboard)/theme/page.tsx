import { requireUser } from "@/server/auth";
import { requireDb } from "@/server/db";
import { ThemeForm } from "./ThemeForm";

export const dynamic = "force-dynamic";

export default async function ThemePage() {
  await requireUser();
  const tokens = await requireDb().themeSettings.findUniqueOrThrow({
    where: { id: 1 },
    omit: { id: true, updatedAt: true },
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Brand colours</h1>
          <p className="subtitle">
            These become CSS custom properties on the public site, so a change here restyles
            every page at once.
          </p>
        </div>
      </div>
      <ThemeForm initial={tokens} />
    </>
  );
}
