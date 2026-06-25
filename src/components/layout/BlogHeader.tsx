"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLabel = (key: string) => settings?.navigation[key] || t.nav[key as keyof typeof t.nav];
  const ctaLabel = settings?.navigation.cta || t.nav.cta;

  return (
    <>
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
              {navLabel(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button href="/contact" variant="dark" className="hidden !px-5 !py-2.5 sm:inline-flex">
            {ctaLabel}
          </Button>
          <LanguageToggle scrolled />
          <button
            type="button"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <span className="relative block h-0.5 w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-0.5 before:w-5 before:bg-current after:absolute after:left-0 after:top-1.5 after:h-0.5 after:w-5 after:bg-current" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-black/35 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto flex h-full w-[min(86vw,380px)] flex-col bg-cream px-7 py-7 shadow-[-18px_0_45px_rgba(0,0,0,.18)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-5">
                <Logo scrolled />
                <button
                  type="button"
                  aria-label="Menüyü kapat"
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink"
                >
                  <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
                  <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-6" aria-label="Mobil menü">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line pb-4 font-serif text-[28px] leading-none text-ink transition-colors hover:text-green"
                  >
                    {navLabel(link.key)}
                  </Link>
                ))}
              </nav>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-green px-6 py-4 text-[15px] font-semibold text-white"
              >
                {ctaLabel}
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
