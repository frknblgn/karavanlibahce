import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BlogIndex } from "./BlogIndex";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.blogTitle,
  description: siteConfig.seo.blogDescription,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <BlogHeader />
      <BlogIndex posts={posts} />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
