"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks } from "@/config/navigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
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

  return (
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
        {navLinks.map((l) => (
          <a
            key={l.key}
            href={l.href}
            className={cn(
              "group relative text-[14.5px] font-medium opacity-90 transition-colors hover:opacity-100",
              scrolled ? "text-ink-soft" : "text-white",
            )}
          >
            {t.nav[l.key as keyof typeof t.nav]}
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
          {t.nav.cta}
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            scrolled ? "text-ink" : "text-white",
          )}
        >
          <span className="relative block h-0.5 w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-0.5 before:w-5 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-0.5 after:w-5 after:bg-current" />
        </button>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[85] flex flex-col items-center justify-center gap-7 bg-green-darker/97 lg:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-white"
              >
                {t.nav[l.key as keyof typeof t.nav]}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
