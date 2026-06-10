import content from "@/content/cms/dictionaries/tr.json";

export const tr = content;

type WidenStrings<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { readonly [K in keyof T]: WidenStrings<T[K]> }
    : T extends object
      ? { readonly [K in keyof T]: WidenStrings<T[K]> }
      : T;

export type Dictionary = WidenStrings<typeof tr>;
