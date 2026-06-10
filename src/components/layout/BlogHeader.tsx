"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { Logo } from "./Logo";
import { ArrowIcon } from "@/components/icons";

/** Solid header for inner pages (blog) where there is no hero behind it. */
export function BlogHeader() {
  const { t } = useLanguage();
  return (
    <header
      className="sticky top-0 z-[80] flex items-center justify-between gap-6 border-b border-line bg-beige/90 py-3.5 backdrop-blur-md"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Logo scrolled />
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[14px] font-semibold text-ink-soft transition-colors hover:text-green"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {t.nav.cta}
        </Link>
        <LanguageToggle scrolled />
      </div>
    </header>
  );
}
