import type { Metadata } from "next";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { siteConfig } from "@/config/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.galleryTitle,
  description: siteConfig.seo.galleryDescription,
  path: "/gallery",
  image: siteConfig.hero.image,
});

export default function GalleryPage() {
  return (
    <>
      <BlogHeader />
      <main>
        <Gallery />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
