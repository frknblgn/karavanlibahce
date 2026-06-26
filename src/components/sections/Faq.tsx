"use client";

import { useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";
import type { CmsFaq, CmsHomepageSection } from "@/lib/cms-api";

interface FaqProps {
  cmsItems?: CmsFaq[];
  section?: CmsHomepageSection | null;
}

export function Faq({ cmsItems = [], section = null }: FaqProps) {
  const { t, locale } = useLanguage();
  const items = cmsItems.length
    ? cmsItems.map((item) => ({
        id: String(item.id),
        tr: { q: item.question, a: item.answer.replace(/<[^>]*>/g, "") },
        en: { q: item.question, a: item.answer.replace(/<[^>]*>/g, "") },
      }))
    : faq;
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id="faq" data-screen-label="FAQ" className="section-y">
      <div className="wrap grid items-start gap-[clamp(40px,6vw,90px)] lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{section?.eyebrow || t.faq.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(32px,4.5vw,52px)]">{section?.title || t.faq.title}</h2>
        </Reveal>

        <Reveal className="border-t border-line">
          {items.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-1 py-[26px] text-left font-serif text-[clamp(18px,2vw,22px)] text-ink"
                >
                  {item[locale].q}
                  <span
                    className={cn(
                      "relative grid h-[30px] w-[30px] flex-none place-items-center rounded-full border border-line transition-all duration-500 ease-brand",
                      isOpen && "rotate-90 border-green bg-green",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute h-px w-3 transition-colors",
                        isOpen ? "bg-white" : "bg-green",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute h-3 w-px transition-opacity",
                        isOpen ? "opacity-0" : "bg-green",
                      )}
                    />
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-500 ease-brand"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="px-1 pb-7 pr-12 text-[15.5px] leading-[1.65] text-ink-soft">
                      {item[locale].a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
