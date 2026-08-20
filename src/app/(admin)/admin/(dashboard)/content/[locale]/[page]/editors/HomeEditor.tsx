"use client";

import type {
  CardItem,
  HeroAction,
  HomeContent,
  ImageAsset,
  ProcessStep,
  StatItem,
} from "@/content/types";
import { ImageInput, Repeater, StringList, TextArea, TextInput } from "../../../../_ui/fields";
import { SplitFields, emptyImage, type Options } from "./shared";

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
        <p className="hint">
          Naskah di kiri, satu foto sebagai blok di kanan. Judulnya dibaca di atas kanvas
          terang, jadi foto tidak perlu gelap.
        </p>
        <TextInput
          label="Eyebrow"
          value={value.hero.eyebrow ?? ""}
          onChange={(eyebrow) => patch({ hero: { ...value.hero, eyebrow } })}
          help="Label kecil huruf kapital di atas judul."
        />
        <StringList
          label="Judul"
          value={value.hero.headline}
          onChange={(headline) => patch({ hero: { ...value.hero, headline } })}
          help="Satu baris per baris visual. Bungkus sebagian dengan **dua bintang** untuk menebalkannya."
        />
        <TextArea
          label="Paragraf pendukung"
          value={value.hero.body ?? ""}
          onChange={(body) => patch({ hero: { ...value.hero, body } })}
        />
        <ImageInput
          label="Foto"
          value={value.hero.image}
          onChange={(image) => patch({ hero: { ...value.hero, image } })}
          options={options}
        />
        <Repeater<HeroAction>
          label="Tombol"
          items={value.hero.actions ?? []}
          onChange={(actions) => patch({ hero: { ...value.hero, actions } })}
          title={(action) => action.label || "Tombol"}
          addLabel="Tambah tombol"
          newItem={() => ({ label: "", href: "/", variant: "outline" })}
          renderItem={(action, update) => (
            <div className="admin-grid">
              <TextInput
                label="Teks"
                value={action.label}
                onChange={(label) => update({ ...action, label })}
              />
              <TextInput
                label="Alamat"
                value={action.href}
                onChange={(href) => update({ ...action, href })}
              />
              <TextInput
                label="Gaya"
                value={action.variant ?? "solid"}
                onChange={(variant) =>
                  update({ ...action, variant: variant === "outline" ? "outline" : "solid" })
                }
                help="solid = isi gelap, outline = bergaris."
              />
            </div>
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Pengantar</h2>
        <p className="hint">Naskah di tengah, diapit dua foto.</p>
        <SplitFields
          value={value.intro}
          onChange={(intro) => patch({ intro })}
          options={options}
        />
      </div>

      <div className="admin-card">
        <h2>Pita angka</h2>
        <p className="hint">
          Empat sel bergaris. Isi angkanya sebagai teks — boleh diisi penanda seperti
          [ANGKA] selama datanya belum resmi.
        </p>
        <Repeater<StatItem>
          label="Angka"
          items={value.stats.items}
          onChange={(items) => patch({ stats: { items } })}
          title={(item) => item.label || "Angka"}
          addLabel="Tambah angka"
          newItem={() => ({ value: "", unit: "", label: "" })}
          renderItem={(item, update) => (
            <div className="admin-grid">
              <TextInput
                label="Angka"
                value={item.value}
                onChange={(next) => update({ ...item, value: next })}
              />
              <TextInput
                label="Satuan"
                value={item.unit ?? ""}
                onChange={(unit) => update({ ...item, unit })}
              />
              <TextInput
                label="Keterangan"
                value={item.label}
                onChange={(label) => update({ ...item, label })}
              />
            </div>
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Kartu produk</h2>
        <p className="hint">Tiga kartu: foto, judul, satu paragraf, dan tautan.</p>
        <div className="admin-grid">
          <TextInput
            label="Eyebrow"
            value={value.products.eyebrow}
            onChange={(eyebrow) => patch({ products: { ...value.products, eyebrow } })}
          />
          <TextInput
            label="Tautan kanan — teks"
            value={value.products.link?.label ?? ""}
            onChange={(label) =>
              patch({
                products: {
                  ...value.products,
                  link: { href: value.products.link?.href ?? "/", label },
                },
              })
            }
          />
          <TextInput
            label="Tautan kanan — alamat"
            value={value.products.link?.href ?? ""}
            onChange={(href) =>
              patch({
                products: {
                  ...value.products,
                  link: href
                    ? { href, label: value.products.link?.label ?? "" }
                    : undefined,
                },
              })
            }
          />
        </div>
        <StringList
          label="Judul"
          value={value.products.headline}
          onChange={(headline) => patch({ products: { ...value.products, headline } })}
        />
        <Repeater<CardItem>
          label="Kartu"
          items={value.products.items}
          onChange={(items) => patch({ products: { ...value.products, items } })}
          title={(item) => item.title || "Kartu"}
          addLabel="Tambah kartu"
          newItem={() => ({
            id: `card-${Date.now()}`,
            title: "",
            body: "",
            image: emptyImage(),
          })}
          renderItem={(item, update) => (
            <>
              <TextInput
                label="Judul"
                value={item.title}
                onChange={(title) => update({ ...item, title })}
              />
              <TextArea
                label="Isi"
                value={item.body}
                onChange={(body) => update({ ...item, body })}
              />
              <ImageInput
                label="Foto"
                value={item.image}
                onChange={(image) => update({ ...item, image })}
                options={options}
              />
              <div className="admin-grid">
                <TextInput
                  label="Tautan — teks"
                  value={item.link?.label ?? ""}
                  onChange={(label) =>
                    update({ ...item, link: { href: item.link?.href ?? "/", label } })
                  }
                />
                <TextInput
                  label="Tautan — alamat"
                  value={item.link?.href ?? ""}
                  onChange={(href) =>
                    update({
                      ...item,
                      link: href ? { href, label: item.link?.label ?? "" } : undefined,
                    })
                  }
                />
              </div>
            </>
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Alur produksi</h2>
        <p className="hint">Satu-satunya pita gelap di beranda.</p>
        <div className="admin-grid">
          <TextInput
            label="Judul"
            value={value.process.title}
            onChange={(title) => patch({ process: { ...value.process, title } })}
          />
          <TextInput
            label="Catatan di sebelah judul"
            value={value.process.note ?? ""}
            onChange={(note) => patch({ process: { ...value.process, note } })}
          />
        </div>
        <Repeater<ProcessStep>
          label="Tahap"
          items={value.process.steps}
          onChange={(steps) => patch({ process: { ...value.process, steps } })}
          title={(step) => step.title || "Tahap"}
          addLabel="Tambah tahap"
          newItem={() => ({ step: "", title: "", body: "" })}
          renderItem={(step, update) => (
            <>
              <div className="admin-grid">
                <TextInput
                  label="Nomor"
                  value={step.step}
                  onChange={(next) => update({ ...step, step: next })}
                />
                <TextInput
                  label="Judul"
                  value={step.title}
                  onChange={(title) => update({ ...step, title })}
                />
              </div>
              <TextArea
                label="Isi"
                value={step.body}
                onChange={(body) => update({ ...step, body })}
              />
            </>
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Galeri</h2>
        <p className="hint">Grid foto; mengklik satu ubin membukanya penuh layar.</p>
        <TextInput
          label="Keterangan"
          value={value.gallery.caption}
          onChange={(caption) => patch({ gallery: { ...value.gallery, caption } })}
        />
        <Repeater<ImageAsset>
          label="Foto"
          items={value.gallery.images}
          onChange={(images) => patch({ gallery: { ...value.gallery, images } })}
          title={(image, index) => image.alt || `Foto ${index + 1}`}
          addLabel="Tambah foto"
          newItem={emptyImage}
          renderItem={(image, update) => (
            <ImageInput label="Foto" value={image} onChange={update} options={options} />
          )}
        />
      </div>

      <div className="admin-card">
        <h2>Pita ajakan</h2>
        <p className="hint">Bagian terakhir sebelum footer.</p>
        <StringList
          label="Judul"
          value={value.cta.headline}
          onChange={(headline) => patch({ cta: { ...value.cta, headline } })}
        />
        <div className="admin-grid">
          <TextInput
            label="Tombol — teks"
            value={value.cta.button.label}
            onChange={(label) =>
              patch({ cta: { ...value.cta, button: { ...value.cta.button, label } } })
            }
          />
          <TextInput
            label="Tombol — alamat"
            value={value.cta.button.href}
            onChange={(href) =>
              patch({ cta: { ...value.cta, button: { ...value.cta.button, href } } })
            }
          />
        </div>
      </div>
    </>
  );
}
