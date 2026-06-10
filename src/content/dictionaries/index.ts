import type { Locale } from "@/types";
import { tr, type Dictionary } from "./tr";
import { en } from "./en";

export const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
