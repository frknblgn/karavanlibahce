import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

/**
 * Brand lockup. The mark is a single inline SVG by default so it inherits
 * color on the dark hero; swap `public/logo.svg` and flip `useImageLogo`
 * to render an <Image> instead.
 */
const useImageLogo = false;

export function Logo({ scrolled, footer }: { scrolled?: boolean; footer?: boolean }) {
  const color = footer ? "text-white" : scrolled ? "text-ink" : "text-white";

  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn("group flex items-center gap-3 transition-colors", color)}
    >
      {useImageLogo ? (
        <Image src={siteConfig.branding.logo} alt={siteConfig.name} width={34} height={34} />
      ) : (
        <svg
          viewBox="0 0 44 44"
          className="h-[34px] w-[34px] flex-none transition-transform duration-500 ease-brand group-hover:-rotate-6"
          fill="none"
          aria-hidden
        >
          <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="22" cy="24" r="8" fill="#D98324" />
          <path d="M6 30h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      <span className="leading-none">
        <b className="block font-serif text-[18px] font-semibold tracking-[-0.01em]">
          Karavanlı Bahçe
        </b>
        <small className="mt-[3px] block font-sans text-[10px] uppercase tracking-[0.26em] opacity-80">
          Bursa
        </small>
      </span>
    </Link>
  );
}
