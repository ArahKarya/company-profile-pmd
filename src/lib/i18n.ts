export type Locale = "id" | "en";

export const defaultLocale: Locale = "id";
export const locales: Locale[] = ["id", "en"];

export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale
): string {
  const key = `${field}${locale === "id" ? "Id" : "En"}`;
  return (item[key] as string) ?? "";
}
