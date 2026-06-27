import type { Metadata } from "next";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { ContactPageDetails } from "@/components/sections/ContactPageDetails";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site.config";
import {
  getCmsData,
  type CmsContact,
  type CmsContactPage,
  type CmsSiteSettings,
} from "@/lib/cms-api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.contactTitle,
  description: siteConfig.seo.contactDescription,
  path: "/contact",
});

export const revalidate = 300;

export default async function ContactPage() {
  const [settings, contact, page] = await Promise.all([
    getCmsData<CmsSiteSettings>("/site-settings/"),
    getCmsData<CmsContact>("/contact/"),
    getCmsData<CmsContactPage>("/contact-page/"),
  ]);

  return (
    <>
      <LocalBusinessJsonLd />
      <BlogHeader settings={settings} />
      <main>
        <Contact cmsContact={contact} settings={settings} />
        <ContactPageDetails page={page} />
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </>
  );
}

