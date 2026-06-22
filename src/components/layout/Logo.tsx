import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

export function Logo({ scrolled, footer }: { scrolled?: boolean; footer?: boolean }) {
  const src = scrolled && !footer ? "/logo.dark.png" : siteConfig.branding.logo;

  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn(
        "group flex shrink-0 items-center transition-transform hover:scale-[1.02]",
      )}
    >
      <Image
        src={src}
        alt={siteConfig.name}
        width={350}
        height={96}
        priority
        sizes="(max-width: 640px) 145px, (max-width: 1024px) 180px, 205px"
        className={cn(
          "h-auto w-[145px] sm:w-[180px] lg:w-[205px]",
          footer && "w-[160px] sm:w-[185px]",
        )}
      />
    </Link>
  );
}
