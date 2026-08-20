"use client";

import type { AboutContent, ValueItem } from "@/content/types";
import { ImageInput, Repeater, StringList, TextArea, TextInput } from "../../../../_ui/fields";
import { HeroFields, SplitFields, type Options } from "./shared";

export function AboutEditor({
  value,
  onChange,
  options,
}: {
  readonly value: AboutContent;
  readonly onChange: (value: AboutContent) => void;
  readonly options: Options;
}) {
  const patch = (next: Partial<AboutContent>) => onChange({ ...value, ...next });

  return (
    <>
      <div className="admin-card">
        <h2>Hero</h2>
        <p className="hint">Shorter than the home hero, over a tinted photograph.</p>
        <HeroFields
          value={value.hero}
          onChange={(hero) => patch({ hero })}
          options={options}
          withBody={false}
          withCue={false}
        />
        <TextArea
          label="Statement"
          value={value.statement}
          onChange={(statement) => patch({ statement })}
          help="Short paragraph to the right of the headline."
        />
      </div>

      <div className="admin-card">
        <h2>Vision</h2>
        <SplitFields
          value={value.vision}
          onChange={(vision) => patch({ vision })}
          options={options}
          maxMedia={1}
        />
      </div>

      <div className="admin-card">
        <h2>Mission</h2>
        <p className="hint">
          Three images, each with the paragraph in the matching position below it.
        </p>
        <SplitFields
          value={value.mission}
          onChange={(mission) => patch({ mission: { ...value.mission, ...mission } })}
          options={options}
          maxMedia={3}
        />
        <ImageInput
          label="Decorative artwork"
          value={{ src: value.mission.art, alt: "" }}
          onChange={(asset) => patch({ mission: { ...value.mission, art: asset.src } })}
          options={options}
          withAlt={false}
        />
      </div>
      <div className="admin-card">
        <h2>Nilai perusahaan</h2>
        <p className="hint">
          Akronim TERDEPAN. Hurufnya berdiri di kolom kiri, jadi urutan barisnya menentukan
          bacaan akronimnya.
        </p>
        <div className="admin-grid">
          <TextInput
            label="Eyebrow"
            value={value.values.eyebrow}
            onChange={(eyebrow) => patch({ values: { ...value.values, eyebrow } })}
          />
          <TextInput
            label="Catatan"
            value={value.values.note ?? ""}
            onChange={(note) => patch({ values: { ...value.values, note } })}
          />
        </div>
        <StringList
          label="Judul"
          value={value.values.headline}
          onChange={(headline) => patch({ values: { ...value.values, headline } })}
        />
        <Repeater<ValueItem>
          label="Nilai"
          items={value.values.items}
          onChange={(items) => patch({ values: { ...value.values, items } })}
          title={(item) => `${item.letter} — ${item.title}` }
          addLabel="Tambah nilai"
          newItem={() => ({ letter: "", title: "", body: "" })}
          renderItem={(item, update) => (
            <>
              <div className="admin-grid">
                <TextInput
                  label="Huruf"
                  value={item.letter}
                  onChange={(letter) => update({ ...item, letter })}
                />
                <TextInput
                  label="Nama nilai"
                  value={item.title}
                  onChange={(title) => update({ ...item, title })}
                />
              </div>
              <TextArea
                label="Penjelasan"
                value={item.body}
                onChange={(body) => update({ ...item, body })}
              />
            </>
          )}
        />
      </div>

    </>
  );
}
