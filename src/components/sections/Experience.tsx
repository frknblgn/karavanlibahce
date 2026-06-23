"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { experiences } from "@/data/experiences";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsCollection, CmsExperience } from "@/lib/cms-api";

export function Experience() {
  const { t, locale } = useLanguage();
  const reduce = useReducedMotion();
  const cms = useCmsData<CmsCollection<CmsExperience>>("/experiences/", { items: [] });
  const items = cms.items.length ? cms.items.map((item, index) => ({ id: String(item.id), image: item.image || experiences[index]?.image || "/images/experience/caravan-stays.jpg", tone: "forest" as const, tr: { title: item.title, description: item.description }, en: { title: item.title, description: item.description } })) : experiences;

  return (
    <section id="experience" data-screen-label="Experience" className="section-y">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          lead={t.experience.lead}
          align="center"
        />

        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          className="mt-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((e, i) => (
            <motion.article
              key={e.id}
              variants={reduce ? undefined : fadeUp}
              tabIndex={0}
              className="group relative flex min-h-[420px] items-end overflow-hidden rounded-lg text-white shadow-sm"
            >
              <Photo
                src={e.image}
                alt={e[locale].title}
                tone={e.tone}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                className="absolute inset-0"
                imgClassName="transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/5 via-transparent to-black/80" />
              <div className="absolute inset-x-0 bottom-0 z-[3] h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-brand group-hover:scale-x-100" />
              <div className="relative z-[3] p-6">
                <div className="font-serif text-[13px] tracking-[0.1em] opacity-70">
                  0{i + 1}
                </div>
                <h3 className="mb-2 mt-2.5 text-2xl text-white">{e[locale].title}</h3>
                <p className="max-h-0 overflow-hidden text-[14.5px] leading-[1.55] text-white/80 opacity-0 transition-all duration-500 ease-brand group-hover:max-h-[120px] group-hover:opacity-100 group-focus-within:max-h-[120px] group-focus-within:opacity-100">
                  {e[locale].description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
