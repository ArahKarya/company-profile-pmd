"use client";

import type { FeatureItem, HomeContent, ImageAsset } from "@/content/types";
import { ImageInput, Repeater, StringList, TextArea, TextInput } from "../../../../_ui/fields";
import { HeroFields, SplitFields, emptyImage, type Options } from "./shared";

export function HomeEditor({
  value,
  onChange,
  options,
}: {
  readonly value: HomeContent;
  readonly onChange: (value: HomeContent) => void;
  readonly options: Options;
}) {
  const patch = (next: Partial<HomeContent>) => onChange({ ...value, ...next });

  return (
    <>
      <div className="admin-card">
        <h2>Hero</h2>
        <p className="hint">The full-screen opening section.</p>
        <HeroFields value={value.hero} onChange={(hero) => patch({ hero })} options={options} />
      </div>

      <div className="admin-card">
        <h2>Introduction</h2>
        <p className="hint">Centred copy between two photographs.</p>
        <SplitFields
          value={value.intro}
          onChange={(intro) => patch({ intro })}
          options={options}
        />
      </div>

      <div className="admin-card">
        <h2>Feature switcher</h2>
        <p className="hint">
          A vertical list of labels; clicking one shows its panel. Two or three entries works
          best.
        </p>
        <Repeater<FeatureItem>
          label="Features"
          items={value.features.items}
          onChange={(items) => patch({ features: { items } })}
          title={(item) => item.label}
          addLabel="Add feature"
          newItem={() => ({
            id: `feature-${Date.now()}`,
            label: "New feature",
            eyebrow: "",
            headline: [""],
            body: "",
            image: emptyImage(),
          })}
          renderItem={(item, update) => (
            <>
              <div className="admin-grid">
                <TextInput
                  label="Menu label"
                  value={item.label}
                  onChange={(label) => update({ ...item, label })}
                />
                <TextInput
                  label="Eyebrow"
                  value={item.eyebrow}
                  onChange={(eyebrow) => update({ ...item, eyebrow })}
                />
              </div>
              <StringList
                label="Headline"
                value={item.headline}
                onChange={(headline) => update({ ...item, headline })}
              />
              <TextArea
                label="Body"
                value={item.body}
                onChange={(body) => update({ ...item, body })}
              />
              <ImageInput
                label="Image"
                value={item.image}
                onChange={(image) => update({ ...item, image })}
                options={options}
              />
              <div className="admin-nested">
                <p className="help mb-2">
                  Optional button under the copy. Leave the address empty to hide it.
                </p>
                <div className="admin-grid">
                  <TextInput
                    label="Button link"
                    value={item.link?.href ?? ""}
                    onChange={(href) =>
                      update({
                        ...item,
                        link: href
                          ? {
                              href,
                              label: item.link?.label ?? "Learn more",
                              shortLabel: item.link?.shortLabel ?? "Explore",
                            }
                          : undefined,
                      })
                    }
                  />
                  <TextInput
                    label="Button text"
                    value={item.link?.label ?? ""}
                    onChange={(label) =>
                      item.link && update({ ...item, link: { ...item.link, label } })
                    }
                  />
                  <TextInput
                    label="Button text — narrow screens"
                    value={item.link?.shortLabel ?? ""}
                    onChange={(shortLabel) =>
                      item.link && update({ ...item, link: { ...item.link, shortLabel } })
                    }
                  />
                </div>
              </div>
            </>
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Gallery</h2>
        <p className="hint">Photo grid; clicking a tile opens it full-screen.</p>
        <TextInput
          label="Caption"
          value={value.gallery.caption}
          onChange={(caption) => patch({ gallery: { ...value.gallery, caption } })}
        />
        <Repeater<ImageAsset>
          label="Images"
          items={value.gallery.images}
          onChange={(images) => patch({ gallery: { ...value.gallery, images } })}
          title={(image, index) => image.alt || `Image ${index + 1}`}
          addLabel="Add image"
          newItem={emptyImage}
          renderItem={(image, update) => (
            <ImageInput label="Image" value={image} onChange={update} options={options} />
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Closing band</h2>
        <p className="hint">The final section, over a decorative strip.</p>
        <StringList
          label="Headline"
          value={value.closing.headline}
          onChange={(headline) => patch({ closing: { ...value.closing, headline } })}
        />
        <ImageInput
          label="Decorative artwork"
          value={{ src: value.closing.art, alt: "" }}
          onChange={(asset) => patch({ closing: { ...value.closing, art: asset.src } })}
          options={options}
          withAlt={false}
        />
      </div>
    </>
  );
}
