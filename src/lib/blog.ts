import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/types";
import { readingTime } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  return {
    ...fm,
    slug,
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts(): BlogPost[] {
  return readSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
