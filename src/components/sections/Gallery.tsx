"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/config/site.config";
import { gallery as fallbackGallery } from "@/data/gallery";
import type { GalleryCategory } from "@/types";
import type { CmsGalleryImage, CmsGalleryPage } from "@/lib/cms-api";
import {
  ArrowIcon,
  ExpandIcon,
  CloseIcon,
  ChevronLeft,
  ChevronRight,
} from "@/components/icons";

interface GalleryProps {
  cmsItems?: CmsGalleryImage[];
  page?: CmsGalleryPage | null;
}

export function Gallery({ cmsItems = [], page = null }: GalleryProps) {
  const { t, locale } = useLanguage();
  const usesCms = cmsItems.length > 0;
  const gallery = cmsItems.length
    ? cmsItems.map((item, index) => ({
        id: String(item.id),
        image: item.image || fallbackGallery[index]?.image || "/images/gallery/under-stars.jpg",
        tone: "forest" as const,
        category: item.category as GalleryCategory,
        tr: item.alt_text || item.title,
        en: item.alt_text || item.title,
        tall: index % 4 === 0,
      }))
    : fallbackGallery;
  const [index, setIndex] = useState<number | null>(null);
  const filtered = gallery;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, go]);

  const active = index === null ? null : filtered[index];

  return (
    <section id="gallery" data-screen-label="Gallery" className="section-y">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow={t.galleryPage.eyebrow}
            title={page?.intro_title || t.galleryPage.title}
            lead={page?.intro_text || t.galleryPage.lead}
          />
        </div>

        {/* Masonry via CSS columns */}
        <div className="mt-[clamp(40px,5vw,60px)] [column-gap:18px] sm:columns-2 lg:columns-3">
          {filtered.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative mb-[18px] block w-full break-inside-avoid overflow-hidden rounded-lg shadow-sm"
              aria-label={g[locale]}
            >
              {usesCms ? (
                <img
                  src={g.image}
                  alt={g[locale]}
                  className="h-auto w-full transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
                />
              ) : (
                <Photo
                  src={g.image}
                  alt={g[locale]}
                  tone={g.tone}
                  fill={false}
                  width={800}
                  height={g.tall ? 1100 : 800}
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  imgClassName="transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
                />
              )}
              <span className="absolute right-3.5 top-3.5 z-[4] grid h-9 w-9 scale-90 place-items-center rounded-full bg-white/90 opacity-0 transition duration-300 ease-brand group-hover:scale-100 group-hover:opacity-100">
                <ExpandIcon className="h-4 w-4 text-ink" />
              </span>
              <span className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-black/45 to-transparent p-4 pt-10 text-left text-[13px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {g[locale]}
              </span>
            </button>
          ))}
        </div>

        <Reveal className="mt-[clamp(56px,8vw,100px)] rounded-lg bg-green-deep px-7 py-[clamp(40px,6vw,72px)] text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-soft">
            {t.galleryPage.ctaEyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-[720px] text-[clamp(32px,5vw,56px)] text-white">
            {page?.cta_title || t.galleryPage.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] text-white/75">
            {page?.cta_text || t.galleryPage.ctaText}
          </p>
          <Button href={waLink()} variant="whatsapp" className="mt-7">
            {page?.cta_label || t.galleryPage.ctaButton}
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(20,24,20,.92)] p-[4vw] backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active[locale]}
        >
          <figure
            className="relative flex w-full max-w-[min(960px,92vw)] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -top-16 right-0 z-[5] grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/25 max-sm:-top-0 max-sm:right-2 max-sm:top-2"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute -left-[68px] top-1/2 z-[5] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/25 max-sm:left-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute -right-[68px] top-1/2 z-[5] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/25 max-sm:right-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            {usesCms ? (
              <img
                src={active.image}
                alt={active[locale]}
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
              />
            ) : (
              <Photo
                src={active.image}
                alt={active[locale]}
                tone={active.tone}
                fill={false}
                width={1500}
                height={1000}
                sizes="92vw"
                className="max-h-[78vh] w-full rounded-lg shadow-lg"
              />
            )}
            <figcaption className="mt-4 text-center text-[14px] tracking-[0.04em] text-white/85">
              {active[locale]}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
