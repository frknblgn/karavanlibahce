import content from "@/content/cms/site.json";
import type { Locale } from "@/types";

export const siteConfig = {
  ...content,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? content.url,
  defaultLocale: content.defaultLocale as Locale,
} as const;

/** Build a wa.me deep link with the prefilled reservation message. */
export function waLink(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappMessage);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
}

/** Build a tel: link from the display phone number. */
export function telLink(): string {
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;
}

export type SiteConfig = typeof siteConfig;
