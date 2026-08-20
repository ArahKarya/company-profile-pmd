"use client";

import type { HeroSection, ImageAsset, SplitSection } from "@/content/types";
import { ImageInput, StringList, TextArea, TextInput } from "../../../../_ui/fields";
import type { mediaOptions } from "../../../../_ui/useMediaOptions";

export type Options = ReturnType<typeof mediaOptions>;

export const emptyImage = (): ImageAsset => ({ src: "", alt: "" });

/** Hero fields, shared by the home hero and the compact interior heroes. */
export function HeroFields({
  value,
  onChange,
  options,
  withBody = true,
  withCue = true,
}: {
  readonly value: HeroSection;
  readonly onChange: (value: HeroSection) => void;
  readonly options: Options;
  readonly withBody?: boolean;
  readonly withCue?: boolean;
}) {
  const patch = (next: Partial<HeroSection>) => onChange({ ...value, ...next });

  return (
    <>
      <StringList
        label="Headline"
        value={value.headline}
        onChange={(headline) => patch({ headline })}
        help="One row per visual line. Wrap part of a line in **double asterisks** to bold it."
      />
      {withBody && (
        <TextArea
          label="Supporting paragraph"
          value={value.body ?? ""}
          onChange={(body) => patch({ body })}
        />
      )}
      {withCue && (
        <TextInput
          label="Scroll cue"
          value={value.scrollCue ?? ""}
          onChange={(scrollCue) => patch({ scrollCue })}
          help="Small label under the arrow at the bottom of the hero. Leave empty to hide it."
        />
      )}
      <div className="admin-grid">
        <ImageInput
          label="Background — desktop"
          value={{ src: value.background.desktop, alt: "" }}
          onChange={(asset) =>
            patch({ background: { ...value.background, desktop: asset.src } })
          }
          options={options}
          withAlt={false}
        />
        <ImageInput
          label="Background — mobile"
          value={{ src: value.background.mobile, alt: "" }}
          onChange={(asset) => patch({ background: { ...value.background, mobile: asset.src } })}
          options={options}
          withAlt={false}
        />
      </div>
    </>
  );
}

/** Copy-beside-images block, used for the home intro and the about vision. */
export function SplitFields({
  value,
  onChange,
  options,
  maxMedia = 2,
}: {
  readonly value: SplitSection;
  readonly onChange: (value: SplitSection) => void;
  readonly options: Options;
  readonly maxMedia?: number;
}) {
  const patch = (next: Partial<SplitSection>) => onChange({ ...value, ...next });
  const setMedia = (index: number, asset: ImageAsset) =>
    patch({ media: value.media.map((entry, i) => (i === index ? asset : entry)) });

  const slots = Array.from({ length: maxMedia }, (_, index) => value.media[index] ?? emptyImage());

  return (
    <>
      <TextInput
        label="Eyebrow"
        value={value.eyebrow ?? ""}
        onChange={(eyebrow) => patch({ eyebrow })}
        help="Small label above the headline. Leave empty to hide it."
      />
      <StringList
        label="Headline"
        value={value.headline ?? []}
        onChange={(headline) => patch({ headline })}
        help="Leave empty for a block with no headline."
      />
      <StringList
        label="Paragraphs"
        value={value.body}
        onChange={(body) => patch({ body })}
        multiline
        addLabel="Add paragraph"
      />
      <div className="admin-grid">
        {slots.map((asset, index) => (
          <ImageInput
            key={index}
            label={maxMedia > 1 ? `Image ${index + 1}` : "Image"}
            value={asset}
            onChange={(next) => setMedia(index, next)}
            options={options}
          />
        ))}
      </div>
    </>
  );
}
