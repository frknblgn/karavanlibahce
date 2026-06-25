"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { Logo } from "./Logo";
import { navLinks } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import type { CmsSiteSettings } from "@/lib/cms-api";

interface BlogHeaderProps {
  settings?: CmsSiteSettings | null;
}

/** Solid header for inner pages where there is no hero behind it. */
export function BlogHeader({ settings = null }: BlogHeaderProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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
            {settings?.navigation[link.key] || t.nav[link.key as keyof typeof t.nav]}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Button href="/contact" variant="dark" className="hidden !px-5 !py-2.5 sm:inline-flex">
          {settings?.navigation.cta || t.nav.cta}
        </Button>
        <LanguageToggle scrolled />
        <button
          type="button"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <span className="relative block h-0.5 w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-0.5 before:w-5 before:bg-current after:absolute after:left-0 after:top-1.5 after:h-0.5 after:w-5 after:bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[85] flex flex-col items-start gap-7 bg-green-darker/97 px-[var(--gutter)] pb-10 pt-28 lg:hidden"
          >
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
              className="absolute right-[var(--gutter)] top-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white"
            >
              <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
              <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-white"
              >
                {settings?.navigation[link.key] || t.nav[link.key as keyof typeof t.nav]}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white"
            >
              {settings?.navigation.cta || t.nav.cta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
