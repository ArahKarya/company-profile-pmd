import type { Locale, LocaleContent } from "./types";
import { id } from "./id";
import { en } from "./en";

export * from "./types";
export { site } from "./site";

const CONTENT: Readonly<Record<Locale, LocaleContent>> = { id, en };

/** All copy for one locale. */
export function contentFor(locale: Locale): LocaleContent {
  return CONTENT[locale];
}
