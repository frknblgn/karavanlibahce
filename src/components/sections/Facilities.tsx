"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/icons";
import { facilities } from "@/data/facilities";
import { siteConfig } from "@/config/site.config";

export function Facilities() {
  const { t, locale } = useLanguage();

  return (
    <section id="facilities" data-screen-label="Facilities" className="section-y bg-cream">
      <div className="wrap grid items-center gap-[clamp(40px,6vw,90px)] lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="relative h-[min(72vh,600px)] overflow-hidden rounded-lg shadow-md">
          <Photo
            src={siteConfig.facilitiesImage.image}
            alt={siteConfig.facilitiesImage.alt[locale]}
            tone="warm"
            sizes="(max-width:1024px) 100vw, 45vw"
            className="absolute inset-0"
          />
          <div className="absolute bottom-[22px] left-[22px] z-[4] flex flex-col gap-0.5 rounded bg-cream/95 px-[18px] py-3.5 shadow-sm backdrop-blur-sm">
            <b className="whitespace-nowrap font-serif text-[17px] leading-tight">
              {t.facilities.badgeTitle}
            </b>
            <span className="whitespace-nowrap text-xs tracking-[0.04em] text-muted">
              {t.facilities.badgeSub}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow>{t.facilities.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(32px,4.5vw,52px)]">{t.facilities.title}</h2>
          <p className="lead mt-[18px] max-w-[460px]">{t.facilities.lead}</p>

          <div className="mt-[38px] grid grid-cols-1 gap-x-9 sm:grid-cols-2">
            {facilities.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-4 border-b border-line px-1 py-[18px]"
              >
                <span className="flex h-[26px] w-[26px] flex-none text-green">
                  <Icon name={f.icon} className="h-full w-full" />
                </span>
                <span className="text-[15.5px] font-medium text-ink-soft">
                  {f[locale]}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
