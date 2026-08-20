"use client";

import { useState, useTransition } from "react";
import { savePageContent, saveLocaleStrings } from "@/server/actions";
import type { Locale, PageKey } from "@/content/types";
import { SaveBar, TextArea, TextInput } from "../../../_ui/fields";
import { mediaOptions } from "../../../_ui/useMediaOptions";
import { HomeEditor } from "./editors/HomeEditor";
import { AboutEditor } from "./editors/AboutEditor";
import { ServicesEditor } from "./editors/ServicesEditor";
import { CareersEditor } from "./editors/CareersEditor";
import { ContactEditor } from "./editors/ContactEditor";

export interface PageShellData {
  navLabel: string;
  metaTitle: string;
  metaDesc: string;
  data: unknown;
}

export interface LocaleStringsData {
  localeName: string;
  footerOfficeLabel: string;
  footerContactLabel: string;
}

/**
 * Wraps the per-page section editor with the fields every page shares — nav label, metadata
 * and, on the home page, the locale-wide strings.
 *
 * Section content is held as one object in state and saved whole. The shapes are nested
 * arrays (features, gallery, service categories) that a flat FormData cannot express, and
 * keeping the object intact means the editor and the site read the same structure.
 */
export function ContentEditor({
  locale,
  page,
  initial,
  localeStrings,
  library,
  bundled,
}: {
  readonly locale: Locale;
  readonly page: PageKey;
  readonly initial: PageShellData;
  readonly localeStrings: LocaleStringsData;
  readonly library: readonly { id: string; filename: string }[];
  readonly bundled: readonly string[];
}) {
  const [value, setValue] = useState<PageShellData>(initial);
  const [saved, setSaved] = useState<PageShellData>(initial);
  const [strings, setStrings] = useState<LocaleStringsData>(localeStrings);
  const [savedStrings, setSavedStrings] = useState<LocaleStringsData>(localeStrings);
  const [status, setStatus] = useState<{ ok?: string; error?: string }>({});
  const [pending, start] = useTransition();

  const options = mediaOptions(library, bundled);
  const dirty =
    JSON.stringify(value) !== JSON.stringify(saved) ||
    JSON.stringify(strings) !== JSON.stringify(savedStrings);

  const setData = (data: unknown) => setValue((current) => ({ ...current, data }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await savePageContent({
            locale,
            page,
            navLabel: value.navLabel,
            metaTitle: value.metaTitle,
            metaDesc: value.metaDesc,
            data: value.data,
          });
          if (result.error) {
            setStatus({ error: result.error });
            return;
          }

          if (JSON.stringify(strings) !== JSON.stringify(savedStrings)) {
            const stringsResult = await saveLocaleStrings(
              locale,
              strings.localeName,
              strings.footerOfficeLabel,
              strings.footerContactLabel,
            );
            if (stringsResult.error) {
              setStatus({ error: stringsResult.error });
              return;
            }
            setSavedStrings(strings);
          }

          setSaved(value);
          setStatus({ ok: "Saved and published." });
        });
      }}
    >
      {status.error && <div className="admin-alert error">{status.error}</div>}

      <div className="admin-card">
        <h2>Page settings</h2>
        <p className="hint">How this page appears in the menu and in search results.</p>
        <TextInput
          label="Navigation label"
          value={value.navLabel}
          onChange={(navLabel) => setValue((current) => ({ ...current, navLabel }))}
        />
        <TextInput
          label="Browser title"
          value={value.metaTitle}
          onChange={(metaTitle) => setValue((current) => ({ ...current, metaTitle }))}
        />
        <TextArea
          label="Meta description"
          rows={3}
          value={value.metaDesc}
          onChange={(metaDesc) => setValue((current) => ({ ...current, metaDesc }))}
          help="Roughly 150–160 characters is what search engines show."
        />
      </div>

      {page === "home" && (
        <div className="admin-card">
          <h2>Shared across this language</h2>
          <p className="hint">
            These appear on every page, not just the home page.
          </p>
          <div className="admin-grid">
            <TextInput
              label="Language button label"
              value={strings.localeName}
              onChange={(localeName) => setStrings((current) => ({ ...current, localeName }))}
              help="Shown in the navbar switch, e.g. IDN."
            />
            <TextInput
              label="Footer — office heading"
              value={strings.footerOfficeLabel}
              onChange={(footerOfficeLabel) =>
                setStrings((current) => ({ ...current, footerOfficeLabel }))
              }
            />
            <TextInput
              label="Footer — contacts heading"
              value={strings.footerContactLabel}
              onChange={(footerContactLabel) =>
                setStrings((current) => ({ ...current, footerContactLabel }))
              }
            />
          </div>
        </div>
      )}

      <SectionEditor page={page} data={value.data} onChange={setData} options={options} />

      <SaveBar pending={pending} dirty={dirty} status={status} />
    </form>
  );
}

function SectionEditor({
  page,
  data,
  onChange,
  options,
}: {
  readonly page: PageKey;
  readonly data: unknown;
  readonly onChange: (data: unknown) => void;
  readonly options: ReturnType<typeof mediaOptions>;
}) {
  switch (page) {
    case "home":
      return <HomeEditor value={data as never} onChange={onChange} options={options} />;
    case "about":
      return <AboutEditor value={data as never} onChange={onChange} options={options} />;
    case "services":
      return <ServicesEditor value={data as never} onChange={onChange} options={options} />;
    case "careers":
      return <CareersEditor value={data as never} onChange={onChange} options={options} />;
    case "contact":
      return <ContactEditor value={data as never} onChange={onChange} />;
  }
}
