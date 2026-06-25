"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, InstagramIcon, PhoneIcon, PinIcon, ArrowIcon } from "@/components/icons";
import { siteConfig } from "@/config/site.config";
import type { CmsContact, CmsSiteSettings } from "@/lib/cms-api";

interface ContactProps {
  cmsContact?: CmsContact | null;
  settings?: CmsSiteSettings | null;
}

const defaultMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12001.683966795334!2d28.946379116791743!3d40.16253141600033!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca114fed16a187%3A0xf8927df8dffaf21e!2sBURSA%20KARAVANLI%20BAH%C3%87E!5e1!3m2!1str!2sus!4v1782424936293!5m2!1str!2sus";

function getMapEmbedUrl(value: string): string {
  const iframeSrc = value.match(/src=["']([^"']+)["']/i)?.[1];
  const url = iframeSrc || value;

  if (url.includes("/maps/embed") || url.includes("output=embed")) {
    return url;
  }

  return defaultMapEmbedUrl;
}

export function Contact({ cmsContact = null, settings = null }: ContactProps) {
  const { t } = useLanguage();
  const phone = cmsContact?.phone || siteConfig.contact.phone;
  const whatsapp = cmsContact?.whatsapp_number || settings?.whatsapp_number || siteConfig.contact.whatsapp;
  const whatsappMessage = settings?.whatsapp_message || siteConfig.contact.whatsappMessage;
  const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  const address = cmsContact?.address || siteConfig.address.full;
  const mapsUrl = cmsContact?.google_maps_embed_url || siteConfig.mapsUrl;
  const mapEmbedUrl = getMapEmbedUrl(mapsUrl);
  const instagramUrl = settings?.instagram_url || siteConfig.social.instagram;
  const instagramHandle = settings?.instagram_handle || siteConfig.social.instagramHandle;

  const rows = [
    { icon: <WhatsAppIcon className="h-full w-full" />, label: t.contact.whatsapp, value: phone, href: whatsappLink, external: true },
    { icon: <PhoneIcon className="h-full w-full" />, label: t.contact.phone, value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}`, external: false },
    { icon: <InstagramIcon className="h-full w-full" />, label: t.contact.instagram, value: instagramHandle, href: instagramUrl, external: true },
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
            <Button href={instagramUrl} variant="ghost">
              {t.contact.secondaryCta}
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative h-full min-h-[440px] overflow-hidden rounded-lg shadow-lg">
            <iframe
              src={mapEmbedUrl}
              title={t.contact.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
            <span className="absolute inset-x-5 bottom-5 z-[4] flex items-center justify-between gap-4 rounded bg-cream/95 px-5 py-[18px] text-ink backdrop-blur-sm">
              <span>
                <b className="block font-serif text-[17px]">{t.contact.mapTitle}</b>
                <span className="text-[13px] text-muted">{t.contact.mapSub}</span>
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.mapSub}
                className="grid h-10 w-10 flex-none place-items-center rounded-full bg-green text-white transition-colors hover:bg-green-deep"
              >
                <ArrowIcon className="h-[20px] w-[20px]" />
              </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
