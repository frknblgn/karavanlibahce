"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/config/site.config";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Reviews() {
  const { t, locale } = useLanguage();
  const reduce = useReducedMotion();
  const showRating =
    siteConfig.reviews.show && siteConfig.reviews.score && siteConfig.reviews.count;

  return (
    <section id="reviews" data-screen-label="Reviews" className="section-y bg-cream">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
          {showRating && (
            <div className="flex items-center gap-3.5">
              <span className="font-serif text-[46px] leading-none">
                {siteConfig.reviews.score}
              </span>
              <div className="text-[13px] text-muted">
                {locale === "tr"
                  ? `${siteConfig.reviews.count} Google yorumu`
                  : `Based on ${siteConfig.reviews.count} reviews`}
              </div>
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
          {reviews.map((r) => (
            <motion.article
              key={r.id}
              variants={reduce ? undefined : fadeUp}
              className="flex flex-col gap-4 rounded-lg border border-line bg-white p-7 shadow-sm transition-transform duration-300 ease-brand hover:-translate-y-1"
            >
              <span className="block h-6 font-serif text-[56px] leading-[0.6] text-brown">
                &ldquo;
              </span>
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
