"use client";

import type { ContactContent } from "@/content/types";
import { StringList, TextInput } from "../../../../_ui/fields";

export function ContactEditor({
  value,
  onChange,
}: {
  readonly value: ContactContent;
  readonly onChange: (value: ContactContent) => void;
}) {
  return (
    <div className="admin-card">
      <h2>Contact</h2>
      <p className="hint">
        The address, phone numbers and map come from Site &amp; contact — only the wording
        lives here.
      </p>
      <StringList
        label="Headline"
        value={value.headline}
        onChange={(headline) => onChange({ ...value, headline })}
      />
      <TextInput
        label="Office heading"
        value={value.officeLabel}
        onChange={(officeLabel) => onChange({ ...value, officeLabel })}
      />
    </div>
  );
}
