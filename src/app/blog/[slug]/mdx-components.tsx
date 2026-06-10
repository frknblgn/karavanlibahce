import Link from "next/link";
import type { ComponentProps, FC } from "react";

/**
 * Styled MDX elements. Kept here so blog content stays plain Markdown/MDX
 * while inheriting the brand type scale.
 */
export const mdxComponents: Record<string, FC<any>> = {
  h2: (p: ComponentProps<"h2">) => (
    <h2 className="mt-12 font-serif text-[28px] leading-tight" {...p} />
  ),
  h3: (p: ComponentProps<"h3">) => (
    <h3 className="mt-8 font-serif text-[22px] leading-snug" {...p} />
  ),
  p: (p: ComponentProps<"p">) => (
    <p className="mt-5 text-[17px] leading-[1.75] text-ink-soft" {...p} />
  ),
  ul: (p: ComponentProps<"ul">) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-ink-soft" {...p} />
  ),
  ol: (p: ComponentProps<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-ink-soft" {...p} />
  ),
  li: (p: ComponentProps<"li">) => <li className="pl-1" {...p} />,
  blockquote: (p: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-orange pl-5 font-serif text-[20px] italic leading-relaxed text-ink"
      {...p}
    />
  ),
  a: ({ href = "#", ...p }: ComponentProps<"a">) => (
    <Link href={href} className="text-green underline underline-offset-2 hover:text-green-deep" {...p} />
  ),
  strong: (p: ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...p} />,
  hr: () => <hr className="my-10 border-line" />,
};
