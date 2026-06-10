import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import type { Locale } from "@/types";

interface BuildMetaArgs {
  title?: string;
  description?: string;
  path?: string; // e.g. "/blog/slug"
  image?: string;
  locale?: Locale;
  type?: "website" | "article";
}

/**
 * Central metadata builder — every page calls this so OG, canonical and
 * Twitter tags stay consistent and absolute-URL correct.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.seo.defaultImage,
  locale = siteConfig.defaultLocale,
  type = "website",
}: BuildMetaArgs = {}): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.seo.defaultTitle[locale]}`;
  const desc = description ?? siteConfig.description[locale];
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = new URL(image, siteConfig.url).toString();

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}
