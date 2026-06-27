import { siteConfig } from "@/config/site.config";
import type { BlogPost } from "@/types";

/** Generic JSON-LD injector. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness / Campground schema for the homepage. */
export function LocalBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Campground",
    name: siteConfig.name,
    description: siteConfig.description.tr,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: new URL("/images/og/og-default.jpg", siteConfig.url).toString(),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    sameAs: [siteConfig.social.instagram],
    openingHoursSpecification: siteConfig.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    hasMap: siteConfig.mapsUrl,
  };

  if (siteConfig.reviews.show && siteConfig.reviews.score && siteConfig.reviews.count) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.score,
      reviewCount: siteConfig.reviews.count,
    };
  }

  return <JsonLd data={data} />;
}

/** Blog listing page schema. */
export function BlogListJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} — Blog`,
    description: siteConfig.seo.blogDescription,
    url: new URL("/blog", siteConfig.url).toString(),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.branding.logo, siteConfig.url).toString(),
      },
    },
  };
  return <JsonLd data={data} />;
}

/** ImageGallery schema for the gallery page. */
export function GalleryJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.name} — Galeri`,
    description: siteConfig.seo.galleryDescription,
    url: new URL("/gallery", siteConfig.url).toString(),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
  return <JsonLd data={data} />;
}

/** BlogPosting schema for a single article. */
export function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: new URL(post.cover, siteConfig.url).toString(),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.branding.logo, siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
  };
  return <JsonLd data={data} />;
}
