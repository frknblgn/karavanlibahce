import type { Metadata } from "next";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { ContactPageDetails } from "@/components/sections/ContactPageDetails";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.contactTitle,
  description: siteConfig.seo.contactDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <BlogHeader />
      <main>
        <Contact />
        <ContactPageDetails />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
