"use client";

import { useState, useTransition } from "react";
import { saveSite, type SitePayload } from "@/server/actions";
import { LOCALES, PAGE_ORDER, type Locale, type PageKey } from "@/content/types";
import { ImageInput, SaveBar, StringList, TextInput } from "../_ui/fields";
import { mediaOptions } from "../_ui/useMediaOptions";

const PAGE_LABEL: Record<PageKey, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  careers: "Careers",
  contact: "Contact",
};

export function SiteForm({
  initial,
  library,
  bundled,
}: {
  readonly initial: SitePayload;
  readonly library: readonly { id: string; filename: string }[];
  readonly bundled: readonly string[];
}) {
  const [value, setValue] = useState<SitePayload>(initial);
  const [saved, setSaved] = useState<SitePayload>(initial);
  const [status, setStatus] = useState<{ ok?: string; error?: string }>({});
  const [pending, start] = useTransition();

  const options = mediaOptions(library, bundled);
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);
  const patch = (next: Partial<SitePayload>) => setValue((current) => ({ ...current, ...next }));

  const setRoute = (locale: Locale, page: PageKey, route: string) =>
    setValue((current) => ({
      ...current,
      routes: { ...current.routes, [locale]: { ...current.routes[locale], [page]: route } },
    }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveSite(value);
          if (result.error) {
            setStatus({ error: result.error });
          } else {
            setSaved(value);
            setStatus({ ok: "Saved." });
          }
        });
      }}
    >
      {status.error && <div className="admin-alert error">{status.error}</div>}

      <div className="admin-card">
        <h2>Identity</h2>
        <p className="hint">Shown in the navbar, the footer and the browser tab.</p>
        <TextInput label="Company name" value={value.name} onChange={(name) => patch({ name })} />
        <TextInput
          label="Copyright line"
          value={value.copyright}
          onChange={(copyright) => patch({ copyright })}
        />
        <div className="admin-grid">
          <ImageInput
            label="Logo — for dark backgrounds"
            value={{ src: value.logoLightPath, alt: value.name }}
            onChange={(asset) => patch({ logoLightPath: asset.src })}
            options={options}
            withAlt={false}
          />
          <ImageInput
            label="Logo — for light backgrounds"
            value={{ src: value.logoDarkPath, alt: value.name }}
            onChange={(asset) => patch({ logoDarkPath: asset.src })}
            options={options}
            withAlt={false}
          />
        </div>
        <ImageInput
          label="Favicon"
          value={{ src: value.faviconPath, alt: value.name }}
          onChange={(asset) => patch({ faviconPath: asset.src })}
          options={options}
          withAlt={false}
        />
      </div>

      <div className="admin-card">
        <h2>Contact</h2>
        <p className="hint">Used on the contact page, the careers page and in the footer.</p>
        <div className="admin-grid">
          <TextInput
            label="General email"
            type="email"
            value={value.email}
            onChange={(email) => patch({ email })}
          />
          <TextInput
            label="Careers email"
            type="email"
            value={value.careersEmail}
            onChange={(careersEmail) => patch({ careersEmail })}
          />
        </div>
        <StringList
          label="Phone numbers"
          value={value.phones}
          onChange={(phones) => patch({ phones })}
          addLabel="Add number"
        />
        <StringList
          label="Address"
          value={value.addressLines}
          onChange={(addressLines) => patch({ addressLines })}
          help="One line per row — each renders on its own line."
        />
        <TextInput
          label="Map embed URL"
          type="url"
          value={value.mapEmbedUrl}
          onChange={(mapEmbedUrl) => patch({ mapEmbedUrl })}
          help={
            <>
              Paste an embed URL from Google Maps, or use the keyless form{" "}
              <code>https://maps.google.com/maps?q=YOUR+ADDRESS&amp;output=embed</code>.
            </>
          }
        />
      </div>

      <div className="admin-card">
        <h2>Page addresses</h2>
        <p className="hint">
          The URL each page is served at. Every route must start with <code>/</code> and be
          unique across both languages.
        </p>
        <div className="admin-grid">
          {LOCALES.map((locale) => (
            <div key={locale}>
              <strong style={{ fontSize: "0.85rem" }}>
                {locale === "id" ? "Indonesian" : "English"}
              </strong>
              <div className="mt-2">
                {PAGE_ORDER.map((page) => (
                  <TextInput
                    key={page}
                    label={PAGE_LABEL[page]}
                    value={value.routes[locale][page]}
                    onChange={(route) => setRoute(locale, page, route)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SaveBar pending={pending} dirty={dirty} status={status} />
    </form>
  );
}
