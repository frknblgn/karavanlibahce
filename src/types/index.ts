/**
 * Shared TypeScript types used across config, data and content.
 */

export type Locale = "tr" | "en";

/** A piece of content that exists in both languages. */
export type Localized<T = string> = Record<Locale, T>;

export interface BilingualItem {
  tr: { title: string; description?: string };
  en: { title: string; description?: string };
}

export interface ExperienceItem {
  id: string;
  image: string;
  tone: Tone;
  tr: { title: string; description: string };
  en: { title: string; description: string };
}

export interface FacilityItem {
  id: string;
  icon: IconName;
  tr: string;
  en: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  tone: Tone;
  category?: GalleryCategory;
  tr: string;
  en: string;
  /** masonry span hint */
  tall?: boolean;
}

export type GalleryCategory = "caravan" | "nature" | "fire" | "nearby";

export interface NearbyItem {
  id: string;
  image: string;
  tone: Tone;
  distance: string;
  tr: { title: string; description: string };
  en: { title: string; description: string };
}

export interface PricingItem {
  id: string;
  icon: IconName;
  featured?: boolean;
  tr: { title: string; subtitle: string; features: string[] };
  en: { title: string; subtitle: string; features: string[] };
}

export interface ReviewItem {
  id: string;
  name: string;
  color: string;
  role: Localized;
  text: Localized;
}

export interface FaqItem {
  id: string;
  tr: { q: string; a: string };
  en: { q: string; a: string };
}

export interface NavLink {
  href: string;
  key: string; // dictionary key under nav.*
}

export type Tone =
  | "sunset"
  | "forest"
  | "lake"
  | "warm"
  | "fire"
  | "dusk";

export type IconName =
  | "bolt"
  | "drop"
  | "shower"
  | "wifi"
  | "users"
  | "shield"
  | "paw"
  | "flame"
  | "caravan"
  | "tent"
  | "sun";

/** Blog frontmatter parsed from MDX files. */
export interface BlogFrontmatter {
  title: string;
  slug?: string;
  description: string;
  category?: string;
  date: string; // ISO
  cover: string;
  tags: string[];
  author: string;
  lang: Locale;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  readingTime: number; // minutes
  content: string; // raw MDX body
  contentFormat?: "html" | "mdx";
}
