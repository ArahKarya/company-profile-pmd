import type { Locale } from "@/i18n/routing";

/**
 * Pick the locale-appropriate field from a bilingual record.
 *
 * Convention: DB models use `<field>Id` and `<field>En` suffix
 * (e.g. nameId / nameEn, titleId / titleEn).
 *
 * @example
 *   const name = localizeField(product, "name", locale);
 *   // -> product.nameId when locale="id"
 *   // -> product.nameEn when locale="en"
 */
export function localizeField<
  TField extends string,
  TRecord extends Record<`${TField}Id` | `${TField}En`, string>
>(record: TRecord, field: TField, locale: Locale): string {
  const key = (field + (locale === "id" ? "Id" : "En")) as keyof TRecord;
  return record[key] as string;
}
