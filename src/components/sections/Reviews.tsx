"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/config/site.config";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import type { CmsHomepageSection, CmsReview } from "@/lib/cms-api";

interface ReviewsProps {
  cmsItems?: CmsReview[];
  section?: CmsHomepageSection | null;
}

export function Reviews({ cmsItems = [], section = null }: ReviewsProps) {
  const { t, locale } = useLanguage();
  const reduce = useReducedMotion();
  const items = cmsItems.length
    ? cmsItems.map((item, index) => ({
        id: String(item.id),
        name: item.name,
        color: ["#A27B5C", "#3E5F44", "#D98324"][index % 3],
        rating: item.rating,
        role: { tr: item.source, en: item.source },
        text: { tr: item.comment, en: item.comment },
      }))
    : reviews;
  const showRating =
    siteConfig.reviews.show && siteConfig.reviews.score && siteConfig.reviews.count;

  return (
    <section id="reviews" data-screen-label="Reviews" className="section-y bg-cream">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={section?.eyebrow || t.reviews.eyebrow} title={section?.title || t.reviews.title} />
          {showRating && (
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={(siteConfig.reviews as any).googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 transition-opacity hover:opacity-75"
              >
                <span className="font-serif text-[46px] leading-none">
                  {siteConfig.reviews.score}
                </span>
                <div className="flex flex-col gap-0.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} viewBox="0 0 20 20" fill="#D98324" className="h-4 w-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <div className="text-[12px] text-muted">
                    {locale === "tr"
                      ? `${siteConfig.reviews.count} Google yorumu`
                      : `${siteConfig.reviews.count} Google reviews`}
                  </div>
                </div>
              </a>
              <a
                href={(siteConfig.reviews as any).googleWriteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-cream"
              >
                {locale === "tr" ? "Yorum Yaz" : "Write a Review"}
              </a>
            </div>
          )}
        </div>

        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          className="mt-[clamp(40px,5vw,56px)] grid grid-cols-1 gap-[22px] md:grid-cols-3"
        >
          {items.map((r) => (
            <motion.article
              key={r.id}
              variants={reduce ? undefined : fadeUp}
              className="flex flex-col gap-4 rounded-lg border border-line bg-white p-7 shadow-sm transition-transform duration-300 ease-brand hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="block h-6 font-serif text-[56px] leading-[0.6] text-brown">&ldquo;</span>
                {r.rating && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" fill="#D98324" className="h-3.5 w-3.5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[15.5px] leading-[1.62] text-ink-soft">
                {r.text[locale]}
              </p>
              <div className="mt-auto flex items-center gap-3.5">
                <span
                  className="grid h-11 w-11 flex-none place-items-center rounded-full font-serif text-[18px] text-white"
                  style={{ background: r.color }}
                >
                  {r.name.charAt(0)}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <b className="whitespace-nowrap text-[15px]">{r.name}</b>
                  <span className="whitespace-nowrap text-[12.5px] text-muted">
                    {r.role[locale]}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
