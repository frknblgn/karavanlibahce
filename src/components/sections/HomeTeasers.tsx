"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ArrowIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { gallery } from "@/data/gallery";
import type { CmsGalleryImage } from "@/lib/cms-api";

interface HomeTeasersProps {
  cmsGalleryItems?: CmsGalleryImage[];
}

export function HomeTeasers({ cmsGalleryItems = [] }: HomeTeasersProps) {
  const { t, locale } = useLanguage();
  const usesCms = cmsGalleryItems.length > 0;
  const preview = usesCms
    ? cmsGalleryItems.slice(0, 3).map((item, index) => ({
        id: String(item.id),
        image: item.image || gallery[index]?.image || "/images/gallery/under-stars.jpg",
        tone: "forest" as const,
        tr: item.alt_text || item.title,
        en: item.alt_text || item.title,
      }))
    : gallery.slice(0, 3);

  return (
    <section className="section-y bg-green-darker text-white">
      <div className="wrap grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal className="relative min-h-[460px] overflow-hidden rounded-lg">
          <div className="absolute inset-0 grid grid-cols-3 gap-1">
            {preview.map((item) => (
              usesCms ? (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item[locale]}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Photo
                  key={item.id}
                  src={item.image}
                  alt={item[locale]}
                  tone={item.tone}
                  sizes="(max-width:1024px) 33vw, 25vw"
                  className="h-full"
                />
              )
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
