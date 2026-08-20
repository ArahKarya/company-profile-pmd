"use client";

import type {
  Hotspot,
  ServiceCategory,
  ServicePanel,
  ServicesContent,
} from "@/content/types";
import {
  ImageInput,
  NumberInput,
  Repeater,
  StringList,
  TextInput,
} from "../../../../_ui/fields";
import { emptyImage, type Options } from "./shared";

const newPanel = (label: string): ServicePanel => ({
  id: `panel-${Date.now()}`,
  label,
  headline: [label],
  body: [""],
});

export function ServicesEditor({
  value,
  onChange,
  options,
}: {
  readonly value: ServicesContent;
  readonly onChange: (value: ServicesContent) => void;
  readonly options: Options;
}) {
  return (
    <>
      <div className="admin-card">
        <h2>Overview panel</h2>
        <p className="hint">The panel shown when the page first loads.</p>
        <PanelFields
          panel={value.overview}
          onChange={(overview) => onChange({ ...value, overview })}
          options={options}
        />
      </div>

      <div className="admin-card">
        <h2>Categories</h2>
        <p className="hint">
          Each category is a heading in the sidebar with its own panel, plus any number of
          sub-panels beneath it.
        </p>
        <Repeater<ServiceCategory>
          label="Categories"
          items={value.categories}
          onChange={(categories) => onChange({ ...value, categories })}
          title={(category) => category.label}
          addLabel="Add category"
          newItem={() => ({
            id: `category-${Date.now()}`,
            label: "New category",
            panel: newPanel("New category"),
            children: [],
          })}
          renderItem={(category, update) => (
            <>
              <TextInput
                label="Sidebar heading"
                value={category.label}
                onChange={(label) => update({ ...category, label })}
              />
              <div className="admin-nested">
                <p className="help mb-2">Panel shown when the heading itself is clicked.</p>
                <PanelFields
                  panel={category.panel}
                  onChange={(panel) => update({ ...category, panel })}
                  options={options}
                />
              </div>
              <Repeater<ServicePanel>
                label="Sub-panels"
                items={category.children}
                onChange={(children) => update({ ...category, children })}
                title={(child) => child.label}
                addLabel="Add sub-panel"
                newItem={() => newPanel("New sub-panel")}
                renderItem={(child, updateChild) => (
                  <PanelFields panel={child} onChange={updateChild} options={options} />
                )}
              />
            </>
          )}
        />
      </div>
    </>
  );
}

function PanelFields({
  panel,
  onChange,
  options,
}: {
  readonly panel: ServicePanel;
  readonly onChange: (panel: ServicePanel) => void;
  readonly options: Options;
}) {
  const patch = (next: Partial<ServicePanel>) => onChange({ ...panel, ...next });
  const hasDiagram = Boolean(panel.diagram);

  return (
    <>
      <div className="admin-grid">
        <TextInput label="Sidebar label" value={panel.label} onChange={(label) => patch({ label })} />
        <TextInput
          label="Eyebrow"
          value={panel.eyebrow ?? ""}
          onChange={(eyebrow) => patch({ eyebrow })}
        />
      </div>
      <StringList
        label="Headline"
        value={panel.headline}
        onChange={(headline) => patch({ headline })}
      />
      <StringList
        label="Paragraphs"
        value={panel.body}
        onChange={(body) => patch({ body })}
        multiline
        addLabel="Add paragraph"
      />

      <div className="admin-field">
        <label>Illustration</label>
        <div className="help mb-2">
          A panel shows either a plain image or an interactive diagram — not both.
        </div>
        <select
          value={hasDiagram ? "diagram" : "image"}
          onChange={(event) => {
            if (event.target.value === "diagram") {
              patch({
                image: undefined,
                diagram: { base: emptyImage(), hotspots: [] },
              });
            } else {
              patch({ diagram: undefined, image: panel.image ?? emptyImage() });
            }
          }}
        >
          <option value="image">Plain image</option>
          <option value="diagram">Diagram with hover regions</option>
        </select>
      </div>

      {hasDiagram && panel.diagram ? (
        <div className="admin-nested">
          <ImageInput
            label="Diagram — resting image"
            value={panel.diagram.base}
            onChange={(base) => patch({ diagram: { ...panel.diagram!, base } })}
            options={options}
          />
          <Repeater<Hotspot>
            label="Hover regions"
            items={panel.diagram.hotspots}
            onChange={(hotspots) => patch({ diagram: { ...panel.diagram!, hotspots } })}
            title={(hotspot) => hotspot.label}
            addLabel="Add region"
            help="Positions are percentages of the image, so they follow it at any size."
            newItem={() => ({
              id: `hotspot-${Date.now()}`,
              label: "New region",
              rect: [10, 10, 20, 20],
              preview: "",
            })}
            renderItem={(hotspot, update) => (
              <>
                <TextInput
                  label="Region label"
                  value={hotspot.label}
                  onChange={(label) => update({ ...hotspot, label })}
                  help="Read out by screen readers when the region is focused."
                />
                <div className="admin-grid">
                  {(["Left", "Top", "Width", "Height"] as const).map((axis, index) => (
                    <NumberInput
                      key={axis}
                      label={`${axis} (%)`}
                      value={hotspot.rect[index]}
                      min={0}
                      max={100}
                      onChange={(next) => {
                        const rect = [...hotspot.rect] as [number, number, number, number];
                        rect[index] = next;
                        update({ ...hotspot, rect });
                      }}
                    />
                  ))}
                </div>
                <ImageInput
                  label="Image shown while hovered"
                  value={{ src: hotspot.preview, alt: "" }}
                  onChange={(asset) => update({ ...hotspot, preview: asset.src })}
                  options={options}
                  withAlt={false}
                />
              </>
            )}
          />
        </div>
      ) : (
        <ImageInput
          label="Image"
          value={panel.image ?? emptyImage()}
          onChange={(image) => patch({ image })}
          options={options}
        />
      )}
    </>
  );
}
