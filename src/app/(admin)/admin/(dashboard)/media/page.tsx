import { requireUser } from "@/server/auth";
import { requireDb } from "@/server/db";
import { MediaManager } from "./MediaManager";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await requireUser();
  const assets = await requireDb().mediaAsset.findMany({
    select: {
      id: true,
      filename: true,
      mimeType: true,
      size: true,
      width: true,
      height: true,
      alt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Media library</h1>
          <p className="subtitle">
            Uploaded images are stored in the database and served from{" "}
            <code>/api/media/&lt;id&gt;</code>. Files that ship in <code>public/</code> are not
            listed here but can still be referenced by path.
          </p>
        </div>
      </div>

      <MediaManager
        assets={assets.map((asset) => ({ ...asset, createdAt: asset.createdAt.toISOString() }))}
      />
    </>
  );
}
