"use client";

import { waLink } from "@/config/site.config";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WhatsAppIcon } from "@/components/icons";
import type { CmsSiteSettings } from "@/lib/cms-api";

interface FloatingWhatsAppProps {
  settings?: CmsSiteSettings | null;
}

/** Fixed WhatsApp CTA: collapsed to a circle, expands with label on hover. */
export function FloatingWhatsApp({ settings = null }: FloatingWhatsAppProps) {
  const { t } = useLanguage();
  const href = settings?.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message || "")}`
    : waLink();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFab}
      className="group fixed bottom-6 right-6 z-[90] flex h-[58px] max-w-[58px] items-center overflow-hidden rounded-full bg-[#25D366] text-[#0b3d23] shadow-[0_12px_30px_rgba(37,211,102,.4)] transition-[max-width,transform,box-shadow] duration-500 ease-brand hover:max-w-[280px] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,211,102,.5)]"
    >
      <span className="grid h-[58px] w-[58px] flex-none place-items-center">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
      <span className="whitespace-nowrap pr-6 text-[15px] font-semibold">
        {t.whatsappFab}
      </span>
    </a>
  );
}
