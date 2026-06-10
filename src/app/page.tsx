import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Facilities } from "@/components/sections/Facilities";
import { Gallery } from "@/components/sections/Gallery";
import { Nearby } from "@/components/sections/Nearby";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Instagram } from "@/components/sections/Instagram";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Facilities />
        <Gallery />
        <Nearby />
        <Pricing />
        <Reviews />
        <Faq />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
