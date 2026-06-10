"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { nearby } from "@/data/nearby";

export function Nearby() {
  const { t, locale } = useLanguage();

  return (
    <section id="nearby" data-screen-label="Nearby" className="section-y bg-green-deep text-white">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.nearby.eyebrow}
          title={t.nearby.title}
          lead={t.nearby.lead}
          light
        />

        <div className="no-scrollbar mt-[clamp(40px,5vw,60px)] grid snap-x snap-mandatory grid-flow-col gap-5 overflow-x-auto pb-3.5 [grid-auto-columns:clamp(260px,30vw,340px)]">
          {nearby.map((n) => (
            <article
              key={n.id}
              className="group relative flex min-h-[440px] snap-start items-end overflow-hidden rounded-lg text-white"
            >
              <Photo
                src={n.image}
                alt={n[locale].title}
                tone={n.tone}
                sizes="340px"
                className="absolute inset-0"
                imgClassName="transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/10 via-transparent to-black/85" />
              <div className="relative z-[3] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-soft">
                  {n.distance}
                </div>
                <h3 className="mb-1.5 mt-2 text-[25px] text-white">{n[locale].title}</h3>
                <p className="text-[14px] leading-[1.55] text-white/80">
                  {n[locale].description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
