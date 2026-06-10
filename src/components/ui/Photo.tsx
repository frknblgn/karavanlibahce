import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types";

/**
 * Photo — next/image wrapped with the brand gradient fallback.
 * The gradient (tone) shows underneath while the image loads, so the layout
 * never flashes empty. Pass `fill` (default) for absolutely-positioned covers
 * or set `fill={false}` with width/height for intrinsic sizing.
 */
export function Photo({
  src,
  alt,
  tone = "forest",
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  fill = true,
  width,
  height,
}: {
  src: string;
  alt: string;
  tone?: Tone;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={cn(
        "ph-fallback relative isolate overflow-hidden bg-beige-deep",
        `tone-${tone}`,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width: width ?? 1200, height: height ?? 800 })}
        sizes={sizes}
        priority={priority}
        className={cn("relative z-[2] h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
