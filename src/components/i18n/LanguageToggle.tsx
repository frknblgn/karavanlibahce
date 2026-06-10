"use client";

import { useLanguage } from "./LanguageProvider";
import type { Locale } from "@/types";

const OPTIONS: Locale[] = ["tr", "en"];

export function LanguageToggle({ scrolled }: { scrolled?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Dil / Language"
      className={`inline-flex items-center overflow-hidden rounded-full border ${
        scrolled ? "border-line" : "border-white/45"
      }`}
    >
      {OPTIONS.map((opt) => {
        const active = opt === locale;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setLocale(opt)}
            aria-pressed={active}
            className={`px-[11px] py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active
                ? "bg-orange text-white"
                : scrolled
                  ? "text-muted"
                  : "text-white/80"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
