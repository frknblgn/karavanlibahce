"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { pricing } from "@/data/pricing";
import { waLink } from "@/config/site.config";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsCollection, CmsPricing } from "@/lib/cms-api";
import type { IconName } from "@/types";

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function Pricing() {
  const { t, locale } = useLanguage();
  const reduce = useReducedMotion();
  const cms = useCmsData<CmsCollection<CmsPricing>>("/pricing/", { items: [] });
  const items = cms.items.length ? cms.items.map((item) => ({ id: String(item.id), icon: (item.icon_name || "caravan") as IconName, featured: item.featured, tr: { title: item.title, subtitle: item.subtitle, features: item.features }, en: { title: item.title, subtitle: item.subtitle, features: item.features } })) : pricing;

  return (
    <section id="pricing" data-screen-label="Pricing" className="section-y bg-beige">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          lead={t.pricing.lead}
          align="center"
        />

        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          className="mt-[clamp(44px,5vw,64px)] grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
        >
          {items.map((p) => {
            const featured = p.featured;
            return (
              <motion.article
                key={p.id}
                variants={reduce ? undefined : fadeUp}
                className={cn(
                  "flex flex-col rounded-lg border p-8 transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-md",
                  featured
                    ? "border-green bg-green text-white"
                    : "border-line bg-cream",
                )}
              >
                {featured && (
                  <span className="mb-[18px] self-start rounded-full bg-orange px-3 py-[5px] text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                    {t.pricing.tag}
                  </span>
                )}
                <span
                  className={cn(
                    "mb-4 h-[30px] w-[30px]",
                    featured ? "text-orange-soft" : "text-green",
                  )}
                >
                  <Icon name={p.icon} className="h-full w-full" />
                </span>
                <h3 className={cn("text-[25px]", featured && "text-white")}>
                  {p[locale].title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[14.5px] leading-[1.5]",
                    featured ? "text-white/80" : "text-muted",
                  )}
                >
                  {p[locale].subtitle}
                </p>

                <ul className="my-6 grid gap-3.5">
                  {p[locale].features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        "flex items-start gap-3 text-[14.5px] leading-[1.45]",
                        featured ? "text-white/90" : "text-ink-soft",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex-none",
                          featured ? "text-orange-soft" : "text-green",
                        )}
                      >
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={waLink()}
                  variant={featured ? "whatsapp" : "outline"}
                  className="mt-auto w-full"
                >
                  {t.pricing.cta}
                </Button>
              </motion.article>
            );
          })}
        </motion.div>

        <Reveal>
          <p className="mx-auto mt-7 max-w-[680px] text-center text-[13.5px] text-muted">
            {t.pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
