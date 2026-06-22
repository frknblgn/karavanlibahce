"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, InstagramIcon, PhoneIcon, PinIcon, ArrowIcon } from "@/components/icons";
import { siteConfig, waLink, telLink } from "@/config/site.config";
import { useCmsData } from "@/hooks/useCmsData";
import type { CmsContact } from "@/lib/cms-api";

export function Contact() {
  const { t } = useLanguage();
  const cmsContact = useCmsData<CmsContact | null>("/contact/", null);
  const phone = cmsContact?.phone || siteConfig.contact.phone;
  const whatsapp = cmsContact?.whatsapp_number || siteConfig.contact.whatsapp;
  const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;
  const address = cmsContact?.address || siteConfig.address.full;
  const mapsUrl = cmsContact?.google_maps_embed_url || siteConfig.mapsUrl;

  const rows = [
    { icon: <WhatsAppIcon className="h-full w-full" />, label: t.contact.whatsapp, value: phone, href: whatsappLink, external: true },
    { icon: <PhoneIcon className="h-full w-full" />, label: t.contact.phone, value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}`, external: false },
    { icon: <InstagramIcon className="h-full w-full" />, label: t.contact.instagram, value: siteConfig.social.instagramHandle, href: siteConfig.social.instagram, external: true },
    { icon: <PinIcon className="h-full w-full" />, label: t.contact.address, value: address, href: mapsUrl, external: true },
  ];

  return (
    <section id="contact" data-screen-label="Contact" className="section-y bg-green-darker text-white">
      <div className="wrap grid items-stretch gap-[clamp(36px,5vw,72px)] lg:grid-cols-2">
        <Reveal>
          <Eyebrow light>{t.contact.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] text-white">{cmsContact?.heading || t.contact.title}</h2>
          <p className="lead mt-5 !text-white/80">{cmsContact?.description || t.contact.lead}</p>

          <div className="mt-10 grid gap-1">
            {rows.map((r) => (
              <a
                key={r.label}
                href={r.href}
                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-[18px] border-b border-white/15 py-5 transition-colors hover:border-white/40"
              >
                <span className="h-6 w-6 flex-none text-orange-soft">{r.icon}</span>
                <div>
                  <small className="block text-xs uppercase tracking-[0.1em] text-white/60">
                    {r.label}
                  </small>
                  <b className="text-[17px] font-medium">{r.value}</b>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href={whatsappLink} variant="whatsapp">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {t.contact.primaryCta}
            </Button>
            <Button href={siteConfig.social.instagram} variant="ghost">
              {t.contact.secondaryCta}
            </Button>
          </div>
        </Reveal>

        {/* Map — textured placeholder linking to Google Maps.
            Swap for an <iframe> embed or a Map component when ready. */}
        <Reveal>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.mapSub}
            className="relative block h-full min-h-[440px] overflow-hidden rounded-lg shadow-lg"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg,#dfe4d6,#c7d2bd 55%,#aebfa3)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(62,95,68,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(62,95,68,.10) 1px, transparent 1px), linear-gradient(115deg, transparent 47%, rgba(162,123,92,.35) 47%, rgba(162,123,92,.35) 49%, transparent 49%)",
                backgroundSize: "46px 46px, 46px 46px, 100% 100%",
              }}
            />
            <span className="absolute left-1/2 top-[44%] z-[4] grid -translate-x-1/2 -translate-y-1/2 place-items-center">
              <span className="h-[18px] w-[18px] animate-pulse rounded-full bg-orange shadow-[0_0_0_8px_rgba(217,131,36,.3),0_0_0_18px_rgba(217,131,36,.16)]" />
            </span>
            <span className="absolute inset-x-5 bottom-5 z-[4] flex items-center justify-between gap-4 rounded bg-cream/95 px-5 py-[18px] text-ink backdrop-blur-sm">
              <span>
                <b className="block font-serif text-[17px]">{t.contact.mapTitle}</b>
                <span className="text-[13px] text-muted">{t.contact.mapSub}</span>
              </span>
              <ArrowIcon className="h-[22px] w-[22px] text-green" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
