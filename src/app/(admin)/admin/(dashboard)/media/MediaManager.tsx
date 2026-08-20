"use client";

import { useRef, useState, useTransition } from "react";
import { deleteMedia, updateMediaAlt, uploadMedia } from "@/server/actions";

export interface MediaRow {
  readonly id: string;
  readonly filename: string;
  readonly mimeType: string;
  readonly size: number;
  readonly width: number | null;
  readonly height: number | null;
  readonly alt: string;
  readonly createdAt: string;
}

export function MediaManager({ assets }: { readonly assets: readonly MediaRow[] }) {
  const [status, setStatus] = useState<{ ok?: string; error?: string }>({});
  const [alt, setAlt] = useState("");
  const [pending, start] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className="admin-card">
        <h2>Upload</h2>
        <p className="hint">JPEG, PNG, WebP, AVIF, GIF or SVG, up to 8 MB.</p>

        {status.error && <div className="admin-alert error">{status.error}</div>}
        {status.ok && <div className="admin-alert ok">{status.ok}</div>}

        <form
          ref={formRef}
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.set("alt", alt);
            start(async () => {
              const result = await uploadMedia(formData);
              if (result.error) {
                // Keep the alt text: a rejected upload should not make the user retype it.
                setStatus({ error: result.error });
              } else {
                setStatus({ ok: "Image uploaded." });
                setAlt("");
                formRef.current?.reset();
              }
            });
          }}
        >
          <div className="admin-grid">
            <div className="admin-field">
              <label htmlFor="file">Image file</label>
              <input id="file" name="file" type="file" accept="image/*" required />
            </div>
            <div className="admin-field">
              <label htmlFor="alt">Alt text</label>
              <input
                id="alt"
                type="text"
                placeholder="What the image shows"
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
              />
              <div className="help">Describes the image for screen readers and search engines.</div>
            </div>
          </div>
          <button type="submit" className="btn-admin primary" disabled={pending}>
            {pending ? "Uploading…" : "Upload"}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h2>Library</h2>
        <p className="hint">
          {assets.length} image{assets.length === 1 ? "" : "s"}. Copy a path to use it in a page.
        </p>

        {assets.length === 0 ? (
          <p className="hint mb-0">Nothing uploaded yet.</p>
        ) : (
          <div className="media-grid">
            {assets.map((asset) => (
              <MediaTile key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function MediaTile({ asset }: { readonly asset: MediaRow }) {
  const [alt, setAlt] = useState(asset.alt);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string>();
  const path = `/api/media/${asset.id}`;

  return (
    <figure className="media-tile m-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={path} alt={asset.alt || asset.filename} loading="lazy" />
      <figcaption className="meta">
        <div className="text-truncate" title={asset.filename}>
          {asset.filename}
        </div>
        <div>
          {asset.width && asset.height ? `${asset.width}×${asset.height} · ` : ""}
          {Math.max(1, Math.round(asset.size / 1024))} kB
        </div>
        <code>{path}</code>

        <input
          type="text"
          className="mt-2"
          value={alt}
          placeholder="Alt text"
          aria-label={`Alt text for ${asset.filename}`}
          onChange={(event) => setAlt(event.target.value)}
          onBlur={() => {
            if (alt === asset.alt) return;
            start(async () => {
              const result = await updateMediaAlt(asset.id, alt);
              setError(result.error);
            });
          }}
          style={{ width: "100%", fontSize: "0.75rem", padding: "4px 6px" }}
        />

        {error && <div style={{ color: "var(--admin-danger)" }}>{error}</div>}

        <div className="d-flex gap-2 mt-2">
          <button
            type="button"
            className="btn-admin ghost"
            style={{ fontSize: "0.72rem", padding: "3px 8px" }}
            onClick={() => void navigator.clipboard?.writeText(path)}
          >
            Copy path
          </button>
          <button
            type="button"
            className="btn-admin ghost"
            style={{ fontSize: "0.72rem", padding: "3px 8px", color: "var(--admin-danger)" }}
            disabled={pending}
            onClick={() => {
              if (!confirm(`Delete ${asset.filename}? Pages still using it will show a broken image.`)) return;
              start(async () => {
                const result = await deleteMedia(asset.id);
                setError(result.error);
              });
            }}
          >
            Delete
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
