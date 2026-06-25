"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks } from "@/config/navigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import type { CmsSiteSettings } from "@/lib/cms-api";

interface NavbarProps {
  settings?: CmsSiteSettings | null;
}

export function Navbar({ settings = null }: NavbarProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={cn(
          "fixed inset-x-0 top-0 z-[80] flex items-center justify-between gap-6 transition-[padding,background,box-shadow] duration-500 ease-brand",
          scrolled
            ? "bg-beige/85 py-3 shadow-[0_1px_0_theme(colors.line)] backdrop-blur-md"
            : "py-[22px]",
        )}
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Logo scrolled={scrolled} />

        <nav className="hidden items-center gap-[30px] lg:flex" aria-label="Ana menü">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={cn(
                "group relative text-[14.5px] font-medium opacity-90 transition-colors hover:opacity-100",
                scrolled ? "text-ink-soft" : "text-white",
              )}
            >
              {navLabel(link.key)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-orange transition-all duration-300 ease-brand group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle scrolled={scrolled} />
          <a
            href="/contact"
            className={cn(
              "hidden rounded-full border px-5 py-[11px] text-[14px] font-semibold transition-colors sm:inline-flex",
              scrolled
                ? "border-green bg-green text-white"
                : "border-white/55 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
            )}
          >
            {ctaLabel}
          </a>

          <button
            type="button"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              scrolled ? "text-ink" : "text-white",
            )}
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
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line pb-4 font-serif text-[28px] leading-none text-ink transition-colors hover:text-green"
                  >
                    {navLabel(link.key)}
                  </a>
                ))}
              </nav>

              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-green px-6 py-4 text-[15px] font-semibold text-white"
              >
                {ctaLabel}
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
