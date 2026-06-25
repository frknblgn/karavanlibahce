import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Facilities } from "@/components/sections/Facilities";
import { Nearby } from "@/components/sections/Nearby";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { HomeTeasers } from "@/components/sections/HomeTeasers";
import {
  getCmsData,
  type CmsCollection,
  type CmsExperience,
  type CmsFacility,
  type CmsFaq,
  type CmsGalleryImage,
  type CmsHome,
  type CmsHomepageSection,
  type CmsNearbyAttraction,
  type CmsPricing,
  type CmsSiteSettings,
} from "@/lib/cms-api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    settings,
    home,
    sectionsResponse,
    experiencesResponse,
    facilitiesResponse,
    nearbyResponse,
    pricingResponse,
    faqsResponse,
    galleryResponse,
  ] = await Promise.all([
    getCmsData<CmsSiteSettings>("/site-settings/"),
    getCmsData<CmsHome>("/home/"),
    getCmsData<CmsCollection<CmsHomepageSection>>("/homepage-sections/"),
    getCmsData<CmsCollection<CmsExperience>>("/experiences/"),
    getCmsData<CmsCollection<CmsFacility>>("/facilities/"),
    getCmsData<CmsCollection<CmsNearbyAttraction>>("/nearby-attractions/"),
    getCmsData<CmsCollection<CmsPricing>>("/pricing/"),
    getCmsData<CmsCollection<CmsFaq>>("/faqs/"),
    getCmsData<CmsCollection<CmsGalleryImage>>("/gallery/"),
  ]);
  const sections = Object.fromEntries(
    (sectionsResponse?.items ?? []).map((section) => [section.key, section]),
  ) as Record<string, CmsHomepageSection | undefined>;

  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar settings={settings} />
      <main>
        <Hero home={home} />
        <Experience cmsItems={experiencesResponse?.items ?? []} section={sections.experience} />
        <Facilities cmsItems={facilitiesResponse?.items ?? []} home={home} section={sections.facilities} />
        <Nearby cmsItems={nearbyResponse?.items ?? []} section={sections.nearby} />
        <Pricing cmsItems={pricingResponse?.items ?? []} section={sections.pricing} />
        <Reviews section={sections.reviews} />
        <Faq cmsItems={faqsResponse?.items ?? []} section={sections.faq} />
        <HomeTeasers cmsGalleryItems={galleryResponse?.items ?? []} />
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </>
  );
}
