"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const { t, locale } = useLanguage();

  return (
    <main className="section-y min-h-screen">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.blog.eyebrow}
          title={t.blog.title}
          lead={t.blog.lead}
          align="center"
        />

        <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted">
                  <span>{formatDate(post.date, locale)}</span>
                  <span aria-hidden>·</span>
                  <span>
                    {post.readingTime} {t.blog.minRead}
                  </span>
                </div>
                <h3 className="mt-2 text-[24px] leading-snug transition-colors group-hover:text-green">
                  {post.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {post.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
