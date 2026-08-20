"use client";

import type { AboutContent } from "@/content/types";
import { ImageInput, TextArea } from "../../../../_ui/fields";
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
    </>
  );
}
