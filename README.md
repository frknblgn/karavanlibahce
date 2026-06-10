# Bursa Karavanlı Bahçe

Premium nature & caravan escape near Bursa — marketing site.
**Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · MDX.**
Bilingual (Turkish default, English toggle), SEO-first, Vercel-ready.

> Architecture, folder map, component breakdown and strategy decisions live in
> [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the build
npm run lint     # eslint
npm run typecheck
```

## Before you launch

1. **Business info** — edit `src/config/site.config.ts` (phone, WhatsApp, Instagram,
   address, geo coordinates, Google Maps URL, opening hours). This single file feeds
   the UI, metadata, JSON-LD and sitemap. Nothing is hard-coded elsewhere.
2. **Photography** — drop real images into `public/images/**` over the placeholders
   (see `public/images/README.md` for the exact paths and sizes).
3. **Logo** — replace `public/logo.svg`, then set `useImageLogo = true` in
   `src/components/layout/Logo.tsx` to render it (or keep the inline SVG mark).
4. **Reviews** — keep `siteConfig.reviews.show = false` until you have verified
   Google data; the aggregate rating and its JSON-LD only appear when it's `true`.
5. **Site URL** — set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) in Vercel.

## Editing content

| You want to change… | Edit… |
|---|---|
| Business facts (phone, socials, address) | `src/config/site.config.ts` |
| UI copy (TR/EN) | `src/content/dictionaries/{tr,en}.ts` |
| Section content (experiences, facilities, gallery, nearby, pricing, reviews, faq) | `src/data/*.ts` |
| Navigation links | `src/config/navigation.ts` |
| Blog posts | add an `.mdx` file to `src/content/blog/` |
| Brand colors / fonts / shadows | `tailwind.config.ts` + `src/app/globals.css` |

## Blog

File-based MDX. Add `src/content/blog/my-post.mdx` with frontmatter:

```mdx
---
title: "Başlık"
description: "Kısa açıklama"
date: "2026-06-01"
cover: "/images/blog/my-post.jpg"
tags: ["Etiket"]
author: "Bursa Karavanlı Bahçe"
lang: "tr"
---

İçerik buraya…
```

It appears automatically on `/blog`, gets its own `/blog/[slug]` page, BlogPosting
JSON-LD, OG metadata and a sitemap entry. No code changes required.

## Deploy to Vercel

Push to GitHub → **Import Project** in Vercel → set `NEXT_PUBLIC_SITE_URL` →
Deploy. No extra configuration needed. `sitemap.xml` and `robots.txt` are generated
automatically by the App Router.

## i18n note

Language is handled with a lightweight context (`LanguageProvider`) + typed
dictionaries, mirroring the original prototype's toggle. If you later need
per-language URLs for SEO, this can be upgraded to locale routing
(`/tr`, `/en`) or `next-intl` without touching the section components — only the
provider and the route segment change.
