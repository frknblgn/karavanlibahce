"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { InstagramIcon } from "@/components/icons";
import { siteConfig } from "@/config/site.config";
import { instagram } from "@/data/instagram";

export function Instagram() {
  const { t } = useLanguage();

  return (
    <section id="instagram" data-screen-label="Instagram" className="section-y">
      <div className="wrap">
        <Reveal className="text-center">
          <Eyebrow center>{t.instagram.eyebrow}</Eyebrow>
          <h2 className="mt-[18px] text-[clamp(34px,5.2vw,58px)]">{t.instagram.title}</h2>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2.5 font-semibold text-green"
          >
            <InstagramIcon className="h-5 w-5" />
            {siteConfig.social.instagramHandle}
          </a>
        </Reveal>

        <div className="mt-[clamp(36px,4vw,52px)] grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {instagram.map((p) => (
            <a
              key={p.id}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded"
            >
              <Photo
                src={p.image}
                alt={siteConfig.social.instagramHandle}
                tone={p.tone}
                sizes="(max-width:640px) 33vw, (max-width:1024px) 25vw, 16vw"
                className="absolute inset-0"
              />
              <span className="absolute inset-0 z-[4] grid place-items-center bg-green/0 text-white opacity-0 transition duration-300 group-hover:bg-green/45 group-hover:opacity-100">
                <InstagramIcon className="h-[26px] w-[26px]" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
