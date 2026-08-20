"use client";

import type { CareersContent } from "@/content/types";
import { ImageInput, StringList, TextInput } from "../../../../_ui/fields";
import type { Options } from "./shared";

export function CareersEditor({
  value,
  onChange,
  options,
}: {
  readonly value: CareersContent;
  readonly onChange: (value: CareersContent) => void;
  readonly options: Options;
}) {
  const patch = (next: Partial<CareersContent>) => onChange({ ...value, ...next });

  return (
    <div className="admin-card">
      <h2>Careers</h2>
      <p className="hint">
        The email address itself is set under Site &amp; contact, so it stays the same in both
        languages.
      </p>
      <StringList
        label="Headline"
        value={value.headline}
        onChange={(headline) => patch({ headline })}
      />
      <StringList
        label="Paragraphs"
        value={value.body}
        onChange={(body) => patch({ body })}
        multiline
        addLabel="Add paragraph"
      />
      <TextInput
        label="Label before the email"
        value={value.emailLabel}
        onChange={(emailLabel) => patch({ emailLabel })}
      />
      <ImageInput
        label="Banner image"
        value={value.image}
        onChange={(image) => patch({ image })}
        options={options}
      />
    </div>
  );
}
