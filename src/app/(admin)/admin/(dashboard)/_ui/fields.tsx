"use client";

import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";

/* -------------------------------------------------------------------------- */
/*  Scalars                                                                     */
/* -------------------------------------------------------------------------- */

export function TextInput({
  label,
  value,
  onChange,
  help,
  type = "text",
  placeholder,
}: {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly help?: ReactNode;
  readonly type?: "text" | "email" | "url" | "number";
  readonly placeholder?: string;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {help && <div className="help">{help}</div>}
    </div>
  );
}

export function NumberInput({
  label,
  value,
  onChange,
  help,
  min,
  max,
}: {
  readonly label: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly help?: ReactNode;
  readonly min?: number;
  readonly max?: number;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (Number.isFinite(next)) onChange(next);
        }}
      />
      {help && <div className="help">{help}</div>}
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  help,
  rows = 4,
}: {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly help?: ReactNode;
  readonly rows?: number;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      {help && <div className="help">{help}</div>}
    </div>
  );
}

export function ColorInput({
  label,
  value,
  onChange,
}: {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <div className="color-row">
        <span className="swatch" style={{ background: value }} aria-hidden="true" />
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
          onChange={(event) => onChange(event.target.value)}
          style={{ width: 46, height: 34, padding: 2, marginRight: 8 }}
          aria-label={`${label} colour picker`}
        />
        <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lists                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * A list of plain strings — headline lines, paragraphs, phone numbers, address lines.
 *
 * Kept as discrete inputs rather than one textarea split on newlines: these arrays are
 * rendered as separate elements (`<br>`, `<p>`), so the editor should show the same
 * structure the page will.
 */
export function StringList({
  label,
  value,
  onChange,
  help,
  multiline = false,
  addLabel = "Add line",
}: {
  readonly label: string;
  readonly value: readonly string[];
  readonly onChange: (value: string[]) => void;
  readonly help?: ReactNode;
  readonly multiline?: boolean;
  readonly addLabel?: string;
}) {
  const update = (index: number, next: string) =>
    onChange(value.map((entry, i) => (i === index ? next : entry)));
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="admin-field">
      <label>{label}</label>
      {value.map((entry, index) => (
        <div key={index} className="d-flex gap-2 align-items-start mb-2">
          {multiline ? (
            <textarea
              rows={3}
              value={entry}
              onChange={(event) => update(index, event.target.value)}
              style={{ flex: 1 }}
            />
          ) : (
            <input
              type="text"
              value={entry}
              onChange={(event) => update(index, event.target.value)}
              style={{ flex: 1 }}
            />
          )}
          <div className="d-flex gap-1 flex-shrink-0">
            <RowButton label="Move up" icon="chevron-up" onClick={() => move(index, -1)} disabled={index === 0} />
            <RowButton
              label="Move down"
              icon="chevron-down"
              onClick={() => move(index, 1)}
              disabled={index === value.length - 1}
            />
            <RowButton label="Remove" icon="trash" onClick={() => remove(index)} danger />
          </div>
        </div>
      ))}
      <button type="button" className="btn-admin ghost" onClick={() => onChange([...value, ""])}>
        + {addLabel}
      </button>
      {help && <div className="help mt-2">{help}</div>}
    </div>
  );
}

function RowButton({
  label,
  icon,
  onClick,
  disabled,
  danger,
}: {
  readonly label: string;
  readonly icon: string;
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly danger?: boolean;
}) {
  return (
    <button
      type="button"
      className="btn-admin ghost"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "3px 8px",
        lineHeight: 1.2,
        color: danger ? "var(--admin-danger)" : undefined,
      }}
    >
      <i className={`bi bi-${icon}`} aria-hidden="true" />
    </button>
  );
}

/**
 * Repeating group of objects — feature items, gallery images, service categories.
 *
 * `renderItem` draws one entry's fields; this component owns add, remove and reorder so
 * every list in the panel behaves the same way.
 */
export function Repeater<T>({
  label,
  items,
  onChange,
  renderItem,
  newItem,
  title,
  addLabel = "Add item",
  help,
}: {
  readonly label: string;
  readonly items: readonly T[];
  readonly onChange: (items: T[]) => void;
  readonly renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode;
  readonly newItem: () => T;
  readonly title: (item: T, index: number) => string;
  readonly addLabel?: string;
  readonly help?: ReactNode;
}) {
  const update = (index: number, next: T) =>
    onChange(items.map((entry, i) => (i === index ? next : entry)));
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="admin-field">
      <label>{label}</label>
      {help && <div className="help mb-2">{help}</div>}
      {items.map((item, index) => (
        <div key={index} className="admin-repeat">
          <header>
            <strong>{title(item, index) || `Item ${index + 1}`}</strong>
            <div className="d-flex gap-1">
              <RowButton label="Move up" icon="chevron-up" onClick={() => move(index, -1)} disabled={index === 0} />
              <RowButton
                label="Move down"
                icon="chevron-down"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              />
              <RowButton label="Remove" icon="trash" onClick={() => remove(index)} danger />
            </div>
          </header>
          {renderItem(item, (next) => update(index, next), index)}
        </div>
      ))}
      <button type="button" className="btn-admin ghost" onClick={() => onChange([...items, newItem()])}>
        + {addLabel}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Images                                                                      */
/* -------------------------------------------------------------------------- */

export interface MediaOption {
  readonly path: string;
  readonly label: string;
}

/**
 * Picks an image from the media library, or takes a path typed by hand.
 *
 * The free-text path is kept on purpose: files that ship in `public/` never appear in the
 * library, and a template should not force those through an upload to be usable.
 */
export function ImageInput({
  label,
  value,
  onChange,
  options,
  withAlt = true,
}: {
  readonly label: string;
  readonly value: ImageAsset;
  readonly onChange: (value: ImageAsset) => void;
  readonly options: readonly MediaOption[];
  readonly withAlt?: boolean;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <div className="image-picker">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="preview" src={value.src || "/brand/logo-dark.png"} alt="" />
        <div className="fields">
          <select
            value={options.some((option) => option.path === value.src) ? value.src : ""}
            onChange={(event) =>
              event.target.value && onChange({ ...value, src: event.target.value })
            }
            aria-label={`${label} — choose from library`}
          >
            <option value="">Choose from library…</option>
            {options.map((option) => (
              <option key={option.path} value={option.path}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="mt-2"
            value={value.src}
            placeholder="/images/example.jpg"
            onChange={(event) => onChange({ ...value, src: event.target.value })}
            aria-label={`${label} — path`}
          />
          {withAlt && (
            <input
              type="text"
              className="mt-2"
              value={value.alt}
              placeholder="Alt text — what the image shows"
              onChange={(event) => onChange({ ...value, alt: event.target.value })}
              aria-label={`${label} — alt text`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Save bar                                                                    */
/* -------------------------------------------------------------------------- */

export function SaveBar({
  pending,
  dirty,
  status,
}: {
  readonly pending: boolean;
  readonly dirty: boolean;
  readonly status?: { readonly ok?: string; readonly error?: string };
}) {
  return (
    <div className="admin-actions">
      <button type="submit" className="btn-admin primary" disabled={pending || !dirty}>
        {pending ? "Saving…" : dirty ? "Save changes" : "Saved"}
      </button>
      {status?.error && <span style={{ color: "var(--admin-danger)" }}>{status.error}</span>}
      {status?.ok && !dirty && <span style={{ color: "var(--admin-success)" }}>{status.ok}</span>}
    </div>
  );
}
