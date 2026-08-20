"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, requireUser } from "./auth";
import { requireDb } from "./db";
import { hashPassword } from "./password";
import { LOCALES, PAGE_ORDER, type Locale, type PageKey } from "@/content/types";
import type { ThemeTokens } from "@/content/theme";

export interface ActionResult {
  readonly ok?: boolean;
  readonly error?: string;
}

/**
 * Public pages are prerendered, so every mutation has to invalidate them explicitly.
 * `"layout"` busts the whole tree, which is right here: the navbar, footer and theme are
 * shared, so almost any edit can affect any page.
 */
function revalidateSite(): void {
  revalidatePath("/", "layout");
}

/** Server actions are their own entry point, so each one re-checks the session itself. */

/* -------------------------------------------------------------------------- */
/*  Site settings                                                               */
/* -------------------------------------------------------------------------- */

export interface SitePayload {
  name: string;
  logoLightPath: string;
  logoDarkPath: string;
  faviconPath: string;
  email: string;
  careersEmail: string;
  phones: string[];
  addressLines: string[];
  mapEmbedUrl: string;
  copyright: string;
  routes: Record<Locale, Record<PageKey, string>>;
}

export async function saveSite(payload: SitePayload): Promise<ActionResult> {
  await requireUser();

  if (!payload.name.trim()) return { error: "The site name cannot be empty." };

  for (const locale of LOCALES) {
    for (const page of PAGE_ORDER) {
      const route = payload.routes[locale]?.[page];
      if (!route || !route.startsWith("/")) {
        return { error: `Route for ${locale}/${page} must start with "/".` };
      }
    }
  }

  const seen = new Set<string>();
  for (const locale of LOCALES) {
    for (const page of PAGE_ORDER) {
      const route = payload.routes[locale][page];
      if (seen.has(route)) return { error: `Two pages both use the route ${route}.` };
      seen.add(route);
    }
  }

  await requireDb().siteSettings.update({
    where: { id: 1 },
    data: {
      name: payload.name.trim(),
      logoLightPath: payload.logoLightPath.trim(),
      logoDarkPath: payload.logoDarkPath.trim(),
      faviconPath: payload.faviconPath.trim(),
      email: payload.email.trim(),
      careersEmail: payload.careersEmail.trim(),
      phones: payload.phones.map((phone) => phone.trim()).filter(Boolean),
      addressLines: payload.addressLines.map((line) => line.trim()).filter(Boolean),
      mapEmbedUrl: payload.mapEmbedUrl.trim(),
      copyright: payload.copyright.trim(),
      routes: payload.routes,
    },
  });

  revalidateSite();
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  Theme                                                                       */
/* -------------------------------------------------------------------------- */

const HEX = /^#[0-9a-fA-F]{6}$/;

export async function saveTheme(payload: ThemeTokens): Promise<ActionResult> {
  await requireUser();

  const colours: [string, string][] = [
    ["Dark", payload.brandDark],
    ["Darker", payload.brandDarker],
    ["Accent", payload.brandAccent],
    ["Accent soft", payload.brandAccentSoft],
    ["Accent deep", payload.brandAccentDeep],
    ["Menu overlay", payload.surfaceOverlay],
    ["Muted text", payload.textMuted],
  ];
  for (const [label, value] of colours) {
    if (!HEX.test(value)) return { error: `${label} must be a hex colour such as #1a2b3c.` };
  }
  if (payload.navHeightPx < 48 || payload.navHeightPx > 200) {
    return { error: "Navbar height must be between 48 and 200 pixels." };
  }
  if (payload.pageGutterPx < 0 || payload.pageGutterPx > 160) {
    return { error: "Page gutter must be between 0 and 160 pixels." };
  }

  await requireDb().themeSettings.update({ where: { id: 1 }, data: payload });
  revalidateSite();
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  Page content                                                                */
/* -------------------------------------------------------------------------- */

export interface PageContentPayload {
  locale: Locale;
  page: PageKey;
  navLabel: string;
  metaTitle: string;
  metaDesc: string;
  data: unknown;
}

export async function savePageContent(payload: PageContentPayload): Promise<ActionResult> {
  const user = await requireUser();

  if (!payload.navLabel.trim()) return { error: "The navigation label cannot be empty." };
  if (!payload.metaTitle.trim()) return { error: "The page title cannot be empty." };

  await requireDb().pageContent.update({
    where: { locale_page: { locale: payload.locale, page: payload.page } },
    data: {
      navLabel: payload.navLabel.trim(),
      metaTitle: payload.metaTitle.trim(),
      metaDesc: payload.metaDesc.trim(),
      data: payload.data as never,
      updatedById: user.id,
    },
  });

  revalidateSite();
  return { ok: true };
}

export async function saveLocaleStrings(
  locale: Locale,
  localeName: string,
  footerOfficeLabel: string,
  footerContactLabel: string,
): Promise<ActionResult> {
  await requireUser();
  if (!localeName.trim()) return { error: "The language button label cannot be empty." };

  await requireDb().localeStrings.update({
    where: { locale },
    data: {
      localeName: localeName.trim(),
      footerOfficeLabel: footerOfficeLabel.trim(),
      footerContactLabel: footerContactLabel.trim(),
    },
  });

  revalidateSite();
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  Media                                                                       */
/* -------------------------------------------------------------------------- */

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

export async function uploadMedia(formData: FormData): Promise<ActionResult> {
  await requireUser();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: `${file.type || "That file type"} is not an accepted image format.` };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: `Images must be ${MAX_UPLOAD_BYTES / 1024 / 1024} MB or smaller.` };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dimensions = readImageSize(bytes, file.type);

  await requireDb().mediaAsset.create({
    data: {
      filename: file.name,
      mimeType: file.type,
      bytes,
      size: bytes.length,
      width: dimensions?.width,
      height: dimensions?.height,
      alt: String(formData.get("alt") ?? "").trim(),
    },
  });

  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  await requireUser();
  await requireDb().mediaAsset.delete({ where: { id } });
  revalidatePath("/admin/media");
  revalidateSite();
  return { ok: true };
}

export async function updateMediaAlt(id: string, alt: string): Promise<ActionResult> {
  await requireUser();
  await requireDb().mediaAsset.update({ where: { id }, data: { alt: alt.trim() } });
  revalidatePath("/admin/media");
  return { ok: true };
}

/**
 * Reads intrinsic dimensions straight from the file header.
 *
 * Only the three raster formats that carry their size in a fixed position are handled; an
 * unknown result is stored as null and simply means the library shows no dimensions. Doing
 * it this way avoids pulling in an image library for a label.
 */
function readImageSize(buffer: Buffer, mimeType: string): { width: number; height: number } | null {
  try {
    if (mimeType === "image/png" && buffer.length > 24) {
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }
    if (mimeType === "image/jpeg") {
      let offset = 2;
      while (offset + 9 < buffer.length) {
        if (buffer[offset] !== 0xff) break;
        const marker = buffer[offset + 1];
        // SOF0/1/2 carry the frame dimensions; every other segment is skipped by length.
        if (marker >= 0xc0 && marker <= 0xc2) {
          return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
        }
        offset += 2 + buffer.readUInt16BE(offset + 2);
      }
    }
    if (mimeType === "image/webp" && buffer.length > 30 && buffer.toString("ascii", 12, 16) === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
  } catch {
    // Malformed header — the dimensions are optional, so fall through.
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Users                                                                       */
/* -------------------------------------------------------------------------- */

export async function createUser(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "EDITOR") === "ADMIN" ? "ADMIN" : "EDITOR";

  if (!email.includes("@")) return { error: "Enter a valid email address." };
  if (!name) return { error: "Enter a name." };
  if (password.length < 10) return { error: "Passwords must be at least 10 characters." };

  const db = requireDb();
  if (await db.user.findUnique({ where: { email } })) {
    return { error: "An account with that email already exists." };
  }

  await db.user.create({
    data: { email, name, passwordHash: await hashPassword(password), role },
  });

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function deleteUser(id: string): Promise<ActionResult> {
  const actor = await requireAdmin();
  if (actor.id === id) return { error: "You cannot delete the account you are signed in as." };

  const db = requireDb();
  const admins = await db.user.count({ where: { role: "ADMIN" } });
  const target = await db.user.findUnique({ where: { id }, select: { role: true } });
  if (!target) return { error: "That account no longer exists." };
  if (target.role === "ADMIN" && admins <= 1) {
    return { error: "There must be at least one administrator." };
  }

  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
  return { ok: true };
}

/** Changing a password revokes that account's other sessions. */
export async function changePassword(
  userId: string,
  password: string,
): Promise<ActionResult> {
  const actor = await requireUser();
  if (actor.id !== userId && actor.role !== "ADMIN") {
    return { error: "You can only change your own password." };
  }
  if (password.length < 10) return { error: "Passwords must be at least 10 characters." };

  const db = requireDb();
  await db.user.update({ where: { id: userId }, data: { passwordHash: await hashPassword(password) } });
  await db.session.deleteMany({ where: { userId } });

  revalidatePath("/admin/users");
  return { ok: true };
}
