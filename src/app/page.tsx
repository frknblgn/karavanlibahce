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

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Facilities />
        <Nearby />
        <Pricing />
        <Reviews />
        <Faq />
        <HomeTeasers />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
