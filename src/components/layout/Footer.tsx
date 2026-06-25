"use client";

import Link from "next/link";
import { footerLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Logo } from "./Logo";
import type { CmsSiteSettings } from "@/lib/cms-api";

interface FooterProps {
  settings?: CmsSiteSettings | null;
}

export function Footer({ settings = null }: FooterProps) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-darker pb-10 text-white/70">
      <div className="wrap flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
        <div className="[&_small]:!tracking-normal [&_small]:!text-white/70 [&_small]:!normal-case">
          <Logo footer />
        </div>

        <nav className="flex flex-wrap gap-6 text-[14px]">
          {footerLinks.map((l) => {
            const label = settings?.navigation[l.key] || t.nav[l.key as keyof typeof t.nav];
            return l.href.startsWith("/") ? (
              <Link key={l.key} href={l.href} className="transition-colors hover:text-white">
                {label}
              </Link>
            ) : (
              <a key={l.key} href={l.href} className="transition-colors hover:text-white">
                {label}
              </a>
            );
          })}
        </nav>

        <small className="text-[13px]">
          © {year} {settings?.site_name || siteConfig.name} · {settings?.footer.rights || t.footer.rights}
        </small>
      </div>
    </footer>
  );
}
