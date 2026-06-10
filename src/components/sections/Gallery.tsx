"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import { gallery } from "@/data/gallery";
import {
  ArrowIcon,
  ExpandIcon,
  CloseIcon,
  ChevronLeft,
  ChevronRight,
} from "@/components/icons";

export function Gallery() {
  const { t, locale } = useLanguage();
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
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

  const active = index === null ? null : gallery[index];

  return (
    <section id="gallery" data-screen-label="Gallery" className="section-y">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            lead={t.gallery.lead}
          />
          <Reveal>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-green"
            >
              {t.gallery.cta}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Masonry via CSS columns */}
        <div className="mt-[clamp(40px,5vw,60px)] [column-gap:18px] sm:columns-2 lg:columns-3">
          {gallery.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative mb-[18px] block w-full break-inside-avoid overflow-hidden rounded-lg shadow-sm"
              aria-label={g[locale]}
            >
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
              <span className="absolute right-3.5 top-3.5 z-[4] grid h-9 w-9 scale-90 place-items-center rounded-full bg-white/90 opacity-0 transition duration-300 ease-brand group-hover:scale-100 group-hover:opacity-100">
                <ExpandIcon className="h-4 w-4 text-ink" />
              </span>
              <span className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-black/45 to-transparent p-4 pt-10 text-left text-[13px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {g[locale]}
              </span>
            </button>
          ))}
        </div>
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
            className="relative w-full max-w-[min(1100px,92vw)]"
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
            <Photo
              src={active.image}
              alt={active[locale]}
              tone={active.tone}
              fill={false}
              width={1500}
              height={1000}
              sizes="92vw"
              className="aspect-[3/2] w-full rounded-lg shadow-lg"
            />
            <figcaption className="mt-4 text-center text-[14px] tracking-[0.04em] text-white/85">
              {active[locale]}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
