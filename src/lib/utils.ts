/** Join class names, dropping falsy values. Tiny clsx replacement. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format an ISO date for a given locale. */
export function formatDate(iso: string, locale: "tr" | "en"): string {
  return new Date(iso).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Rough reading-time estimate (200 wpm). */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
