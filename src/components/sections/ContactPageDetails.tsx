"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/config/site.config";

export function ContactPageDetails() {
  const { t } = useLanguage();

  return (
    <section className="section-y">
      <div className="wrap grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-lg border border-line bg-cream p-[clamp(28px,5vw,56px)]">
          <Eyebrow>{t.contactPage.reservationEyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(30px,4vw,48px)]">
            {t.contactPage.reservationTitle}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            {t.contactPage.reservationText}
          </p>
          <Button href={waLink()} variant="whatsapp" className="mt-8">
            <WhatsAppIcon />
            {t.contactPage.reservationCta}
          </Button>
        </Reveal>

        <Reveal className="rounded-lg border border-line bg-beige-deep p-[clamp(28px,5vw,56px)]">
          <Eyebrow>{t.contactPage.faqEyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(30px,4vw,48px)]">{t.contactPage.faqTitle}</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            {t.contactPage.faqText}
          </p>
          <Button href="/#faq" variant="outline" className="mt-8">
            {t.contactPage.faqCta}
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
