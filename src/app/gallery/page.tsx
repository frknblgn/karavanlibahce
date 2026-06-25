import type { Metadata } from "next";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { siteConfig } from "@/config/site.config";
import {
  getCmsData,
  type CmsCollection,
  type CmsGalleryImage,
  type CmsGalleryPage,
  type CmsSiteSettings,
} from "@/lib/cms-api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.galleryTitle,
  description: siteConfig.seo.galleryDescription,
  path: "/gallery",
  image: siteConfig.hero.image,
});

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [settings, galleryResponse, page] = await Promise.all([
    getCmsData<CmsSiteSettings>("/site-settings/"),
    getCmsData<CmsCollection<CmsGalleryImage>>("/gallery/"),
    getCmsData<CmsGalleryPage>("/gallery-page/"),
  ]);

  return (
    <>
      <BlogHeader settings={settings} />
      <main>
        <Gallery cmsItems={galleryResponse?.items ?? []} page={page} />
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </>
  );
}
