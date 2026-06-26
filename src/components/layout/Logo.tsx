import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

export function Logo({ scrolled, footer }: { scrolled?: boolean; footer?: boolean }) {
  const src = scrolled && !footer ? "/logo.dark.svg" : siteConfig.branding.logo;

  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn(
        "group flex shrink-0 items-center transition-transform hover:scale-[1.02]",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={siteConfig.name}
        className={cn(
          "h-auto w-[145px] sm:w-[180px] lg:w-[205px]",
          footer && "w-[160px] sm:w-[185px]",
        )}
      />
    </Link>
  );
}
