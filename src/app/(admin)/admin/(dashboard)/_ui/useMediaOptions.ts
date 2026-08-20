import type { MediaOption } from "./fields";

/**
 * Builds the media dropdown list: everything in the library, plus the demo images that ship
 * in `public/` so a fresh install can point at them without uploading anything first.
 */
export function mediaOptions(
  library: readonly { id: string; filename: string }[],
  bundled: readonly string[],
): MediaOption[] {
  return [
    ...library.map((asset) => ({ path: `/api/media/${asset.id}`, label: asset.filename })),
    ...bundled.map((path) => ({ path, label: `${path} (bundled)` })),
  ];
}
