import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BlogPostingJsonLd } from "@/components/seo/JsonLd";
import { mdxComponents } from "./mdx-components";

export const dynamic = "force-dynamic";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    path: `/blog/${post.slug}`,
    image: post.cover,
    locale: post.lang,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <BlogPostingJsonLd post={post} />
      <BlogHeader />

      <article className="section-y">
        <div className="wrap max-w-[760px]">
          <Link
            href="/blog"
            className="text-[14px] font-semibold text-green hover:underline"
          >
            ← {post.lang === "tr" ? "Tüm yazılar" : "All articles"}
          </Link>

          <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-beige-deep px-3 py-1">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-[clamp(32px,5vw,52px)] leading-tight">{post.title}</h1>

          <div className="mt-4 flex items-center gap-2 text-[14px] text-muted">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date, post.lang)}</span>
            <span aria-hidden>·</span>
            <span>
              {post.readingTime} {post.lang === "tr" ? "dk okuma" : "min read"}
            </span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg shadow-md">
            <img src={post.cover} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          <div className="prose-bkb mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
