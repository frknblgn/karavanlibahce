"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { Logo } from "./Logo";
import { navLinks } from "@/config/navigation";
import { Button } from "@/components/ui/Button";

/** Solid header for inner pages where there is no hero behind it. */
export function BlogHeader() {
  const { t } = useLanguage();
  return (
    <header
      className="sticky top-0 z-[80] flex items-center justify-between gap-6 border-b border-line bg-beige/90 py-3.5 backdrop-blur-md"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Logo scrolled />
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Ana menü">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="text-[14px] font-medium text-ink-soft transition-colors hover:text-green"
          >
            {t.nav[link.key as keyof typeof t.nav]}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Button href="/contact" variant="dark" className="hidden !px-5 !py-2.5 sm:inline-flex">
          {t.nav.cta}
        </Button>
        <LanguageToggle scrolled />
      </div>
    </header>
  );
}
