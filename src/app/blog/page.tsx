import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { BlogHeader } from "@/components/layout/BlogHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BlogIndex } from "./BlogIndex";
import { BlogListJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site.config";
import { getCmsData, type CmsSiteSettings } from "@/lib/cms-api";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.blogTitle,
  description: siteConfig.seo.blogDescription,
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    getAllPosts(),
    getCmsData<CmsSiteSettings>("/site-settings/"),
  ]);
  return (
    <>
      <BlogListJsonLd />
      <BlogHeader settings={settings} />
      <BlogIndex posts={posts} />
      <Footer settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </>
  );
}

