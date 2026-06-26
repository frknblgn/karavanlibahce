import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types";
import { readingTime } from "./utils";
import { getCmsData, type CmsBlogPost, type CmsCollection } from "./cms-api";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function cmsToPost(post: CmsBlogPost): BlogPost {
  const content = post.body;

  return {
    title: post.title,
    description: post.excerpt,
    date: post.published_date,
    cover: post.cover_image ?? "/images/og/og-default.jpg",
    tags: post.category ? [post.category] : [],
    author: "Bursa Karavanlı Bahçe",
    lang: "tr",
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
    slug: post.slug,
    content,
    contentFormat: "html",
    readingTime: readingTime(content.replace(/<[^>]*>/g, " ")),
  };
}

function getLocalPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  return {
    ...fm,
    slug,
    content,
    contentFormat: "mdx",
    readingTime: readingTime(content),
  };
}

function getLocalPosts(): BlogPost[] {
  return readSlugs()
    .map((slug) => getLocalPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const [local, cms] = await Promise.all([
    Promise.resolve(getLocalPosts()),
    getCmsData<CmsCollection<CmsBlogPost>>("/blog/"),
  ]);
  const cmsPosts = cms?.items.map(cmsToPost) ?? [];
  const localSlugs = new Set(local.map((p) => p.slug));
  // CMS posts that don't already exist as local MDX files
  const cmsOnly = cmsPosts.filter((p) => !localSlugs.has(p.slug));
  return [...local, ...cmsOnly].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const local = getLocalPostBySlug(slug);
  if (local) return local;
  const cms = await getCmsData<CmsBlogPost>(`/blog/${slug}/`);
  return cms ? cmsToPost(cms) : null;
}
