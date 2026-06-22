"use client";

import { useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons";
import { faq } from "@/data/faq";
import { waLink } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsCollection, CmsFaq } from "@/lib/cms-api";

export function Faq() {
  const { t, locale } = useLanguage();
  const cmsFaqs = useCmsData<CmsCollection<CmsFaq>>("/faqs/", { items: [] });
  const items = cmsFaqs.items.length
    ? cmsFaqs.items.map((item) => ({
        id: String(item.id),
        tr: { q: item.question, a: item.answer.replace(/<[^>]*>/g, "") },
        en: { q: item.question, a: item.answer.replace(/<[^>]*>/g, "") },
      }))
    : faq;
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="faq" data-screen-label="FAQ" className="section-y">
      <div className="wrap grid items-start gap-[clamp(40px,6vw,90px)] lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(32px,4.5vw,52px)]">{t.faq.title}</h2>

          <div className="mt-9 rounded-lg bg-green p-9 text-white">
            <h3 className="text-[27px] text-white">{t.faq.asideTitle}</h3>
            <p className="mb-6 mt-3.5 text-[15px] leading-[1.6] text-white/80">
              {t.faq.asideText}
            </p>
            <Button href={waLink()} variant="whatsapp">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {t.faq.asideCta}
            </Button>
          </div>
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
