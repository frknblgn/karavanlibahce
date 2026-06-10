"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { gallery } from "@/data/gallery";

export function HomeTeasers() {
  const { t, locale } = useLanguage();
  const preview = gallery.slice(0, 3);

  return (
    <section className="section-y bg-green-darker text-white">
      <div className="wrap grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal className="relative min-h-[460px] overflow-hidden rounded-lg">
          <div className="absolute inset-0 grid grid-cols-3 gap-1">
            {preview.map((item) => (
              <Photo
                key={item.id}
                src={item.image}
                alt={item[locale]}
                tone={item.tone}
                sizes="(max-width:1024px) 33vw, 25vw"
                className="h-full"
              />
            ))}
          </div>
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[4] p-[clamp(24px,4vw,48px)]">
            <Eyebrow light>{t.homeTeasers.galleryEyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-[520px] text-[clamp(34px,5vw,56px)] text-white">
              {t.homeTeasers.galleryTitle}
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-white/75">
              {t.homeTeasers.galleryLead}
            </p>
            <Button href="/gallery" variant="ghost" className="mt-7">
              {t.homeTeasers.galleryCta}
              <ArrowIcon />
            </Button>
          </div>
        </Reveal>

        <Reveal className="flex min-h-[460px] flex-col justify-end rounded-lg bg-green p-[clamp(28px,5vw,56px)] text-white">
          <Eyebrow light>{t.homeTeasers.contactEyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] text-white">
            {t.homeTeasers.contactTitle}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/75">
            {t.homeTeasers.contactLead}
          </p>
          <Button href="/contact" variant="primary" className="mt-8 self-start">
            {t.homeTeasers.contactCta}
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
