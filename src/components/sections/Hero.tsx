"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site.config";
import type { CmsHome } from "@/lib/cms-api";

interface HeroProps {
  home?: CmsHome | null;
}

export function Hero({ home = null }: HeroProps) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={ref}
      id="hero"
      data-screen-label="Hero"
      className="relative grid min-h-[84svh] overflow-hidden text-white"
    >
      {/* Parallax background */}
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[8%]"
      >
        {home?.hero_video && !reduce ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={home.hero_image || siteConfig.hero.image}
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={home.hero_video} type="video/mp4" />
          </video>
        ) : (
          <Photo
            src={home?.hero_image || siteConfig.hero.image}
            alt={home?.hero_image_alt || siteConfig.hero.alt}
            tone="warm"
            priority
            sizes="100vw"
            className="h-full w-full"
          />
        )}
        {/* warm legibility scrim */}
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,22,14,.42) 0%, rgba(28,22,14,.18) 30%, rgba(24,20,12,.50) 78%, rgba(20,18,12,.70) 100%), radial-gradient(130% 90% at 50% 8%, rgba(217,131,36,.18), transparent 55%)",
          }}
        />
      </motion.div>

      {/* Content — upper-middle, lifted, capped width */}
      <div
        className="relative z-[4] grid min-h-[84svh] place-content-center justify-items-center text-center"
        style={{
          paddingInline: "var(--gutter)",
          paddingTop: "clamp(86px,12vh,116px)",
          paddingBottom: "clamp(40px,7vh,72px)",
        }}
      >
        <div className="grid max-w-[760px] -translate-y-[4%] justify-items-center">
          <Eyebrow center light>
            {home?.hero_eyebrow || t.hero.eyebrow}
          </Eyebrow>
          <h1 className="mt-5 text-[clamp(36px,5.4vw,74px)] font-medium leading-[1.04] text-white">
            {home?.hero_title || t.hero.title}
          </h1>
          <p className="lead mt-[22px] max-w-[600px] !text-white/90">
            {home?.hero_subtitle || home?.hero_description || t.hero.subtitle}
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Button href={home?.primary_cta_url || "/contact"} variant="primary">
              {home?.primary_cta_label || t.hero.primaryCta}
            </Button>
            <Button href={home?.secondary_cta_url || "/gallery"} variant="ghost">
              {home?.secondary_cta_label || t.hero.secondaryCta}
            </Button>
          </div>

          <div className="mt-[30px] flex flex-wrap justify-center gap-x-[clamp(20px,4vw,56px)] gap-y-5">
            {(home?.stats?.length ? home.stats : t.hero.stats).map((s) => (
              <div key={s.label} className="leading-tight">
                <b className="block font-serif text-[clamp(26px,3vw,38px)] font-medium">
                  {s.value}
                </b>
                <span className="text-[12.5px] uppercase tracking-[0.12em] text-white/75">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#experience"
        aria-label={t.hero.scroll}
        className="absolute bottom-7 left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/80"
      >
        <span className="relative block h-[46px] w-px overflow-hidden bg-gradient-to-b from-white/80 to-transparent">
          {!reduce && (
            <span className="absolute -top-1/2 left-0 h-1/2 w-full animate-cue bg-white" />
          )}
        </span>
        {t.hero.scroll}
      </a>
    </section>
  );
}
