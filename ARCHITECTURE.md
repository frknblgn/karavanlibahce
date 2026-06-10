# Bursa Karavanlı Bahçe — Production Architecture

A premium nature-escape marketing site, rebuilt from the approved HTML prototype into a
clean, component-based **Next.js 14 (App Router) + TypeScript + Tailwind CSS** project.
Vercel-ready, SEO-first, bilingual (TR default / EN), with an MDX blog.

---

## 1. Recommended Project Architecture

| Concern | Decision | Why |
|---|---|---|
| Framework | **Next.js 14, App Router, `src/` dir** | Server components, file-based metadata/sitemap/robots, ISR for blog, first-class Vercel target. |
| Language | **TypeScript (strict)** | Typed config & content prevent launch-day mistakes. |
| Styling | **Tailwind CSS** + a small `globals.css` for tokens/base | Brand tokens live in `tailwind.config.ts`; utility-first keeps components self-documenting. |
| Animation | **Framer Motion, used sparingly** | One reusable `<Reveal>` wrapper + a few interaction variants. Everything respects `prefers-reduced-motion`. |
| i18n | **Lightweight context + dictionaries** (`LanguageProvider`) | Mirrors the prototype's TR/EN toggle without route duplication. Documented upgrade path to `next-intl`/locale routing if SEO per-language is needed later. |
| Content | **Typed data modules** for sections + **MDX** for blog | Editors touch one file per concern; blog is file-based and Git-friendly. |
| Business info | **Single `src/config/site.config.ts`** | Phone, WhatsApp, socials, address, geo, hours — one source of truth, consumed everywhere (UI, JSON-LD, sitemap, metadata). |
| Images | **`/public/images/<group>/`** + `next/image` | Organized, optimized, lazy by default. A `Photo` primitive adds the gradient fallback from the prototype. |
| SEO | Next Metadata API + `lib/seo.ts` + **LocalBusiness JSON-LD** | Per-page metadata helpers, OG/Twitter, canonical, structured data. |

**Rendering model:** the homepage is a Server Component that composes section components.
Sections that need interactivity or the language context are Client Components (`'use client'`).
The blog index and post pages are statically generated (`generateStaticParams`) and revalidated.

---

## 2. Folder Structure

```
bkb-nextjs/
├─ public/
│  ├─ images/
│  │  ├─ hero/            # hero-caravan-sunset.jpg
│  │  ├─ experience/      # 4 cards
│  │  ├─ facilities/
│  │  ├─ gallery/         # 9 masonry shots
│  │  ├─ nearby/          # 5 attractions
│  │  ├─ blog/            # post cover images
│  │  └─ og/              # og-default.jpg (1200×630)
│  ├─ logo.svg            # current logo — swap this one file to rebrand
│  ├─ favicon.ico
│  └─ site.webmanifest
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # <html>, fonts, providers, default metadata, JSON-LD
│  │  ├─ page.tsx                # homepage = composed sections
│  │  ├─ globals.css             # Tailwind layers + CSS tokens + base
│  │  ├─ sitemap.ts              # native sitemap (static + blog slugs)
│  │  ├─ robots.ts               # native robots.txt
│  │  ├─ not-found.tsx
│  │  └─ blog/
│  │     ├─ page.tsx             # /blog index
│  │     └─ [slug]/page.tsx      # /blog/:slug (MDX render + per-post metadata)
│  ├─ components/
│  │  ├─ ui/            # Button, Eyebrow, SectionHeading, Photo, Reveal, Accordion…
│  │  ├─ layout/        # Navbar, Footer, FloatingWhatsApp
│  │  ├─ sections/      # Hero, Experience, Facilities, Gallery, Nearby,
│  │  │                 #   Pricing, Reviews, Faq, Instagram, Contact
│  │  ├─ seo/           # JsonLd (LocalBusiness, BlogPosting, Breadcrumb)
│  │  ├─ i18n/          # LanguageProvider, LanguageToggle, useLanguage
│  │  └─ icons/         # tree-shakeable inline SVG icon set
│  ├─ config/
│  │  ├─ site.config.ts          # ← all business info
│  │  └─ navigation.ts           # nav + footer links
│  ├─ content/
│  │  ├─ dictionaries/ tr.ts, en.ts, index.ts   # all UI copy
│  │  └─ blog/  *.mdx                            # blog posts (frontmatter + body)
│  ├─ data/            # experiences.ts, facilities.ts, gallery.ts, nearby.ts,
│  │                   #   pricing.ts, reviews.ts, faq.ts  (typed, bilingual)
│  ├─ lib/             # seo.ts, motion.ts, blog.ts, utils.ts
│  └─ types/           # shared TS types
├─ .env.example
├─ next.config.mjs
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
├─ .eslintrc.json
├─ .gitignore
└─ README.md
```

---

## 3. Component Breakdown

**UI primitives (`components/ui`)** — dumb, reusable, prop-driven:
- `Button` — variants: `primary | ghost | dark | outline | whatsapp`; renders `<a>` or `<button>`.
- `Eyebrow` — the uppercase label with the leading rule.
- `SectionHeading` — eyebrow + title + lead, `align` prop.
- `Photo` — `next/image` wrapped with the brand gradient fallback + tone variants.
- `Reveal` — Framer Motion scroll-reveal wrapper (see §5).
- `Accordion` / `AccordionItem` — used by FAQ.

**Layout (`components/layout`)**:
- `Navbar` — sticky, shrinks on scroll, language toggle, mobile sheet.
- `Footer` — brand, link columns, legal.
- `FloatingWhatsApp` — fixed CTA, expands on hover.

**Sections (`components/sections`)** — one per page block, each pulls from `data/*` + `dictionaries`:
`Hero · Experience · Facilities · Gallery · Nearby · Pricing · Reviews · Faq · Instagram · Contact`.
`Gallery` owns a `Lightbox` subcomponent; `Pricing` renders “Bilgi Al” info cards (no prices);
`Reviews` shows testimonials (no aggregate rating until verified data exists).

**SEO (`components/seo`)**: `JsonLd` renders LocalBusiness on the homepage and BlogPosting on posts.

**i18n (`components/i18n`)**: `LanguageProvider` (context + `localStorage`), `useLanguage()`, `LanguageToggle`.

---

## 4. Data / Config Structure

- **`config/site.config.ts`** — the only place business facts live:
  `name, legalName, url, description, contact { phone, whatsapp, whatsappMessage, email },
  social { instagram, … }, address { full, locality, region, country, postalCode },
  geo { lat, lng }, openingHours, mapsUrl, branding { logo }, reviews { show, score, count }`.
  Helpers derived from it: `waLink()`, `telLink()`.
- **`content/dictionaries/{tr,en}.ts`** — every UI string, typed by a shared `Dictionary` shape so TR and EN can't drift.
- **`data/*.ts`** — section content as typed arrays; each item carries `{ tr, en }` fields and an `image` path under `/public/images`.
- **`content/blog/*.mdx`** — posts with frontmatter (`title, description, date, cover, tags, author, lang`) + MDX body.

This separation means: **devs edit components, editors edit `data`/`content`, the owner edits `site.config.ts`.**

---

## 5. Animation Strategy

- **Lightweight & reusable.** A single `<Reveal>` client component wraps any block:
  uses Framer Motion `whileInView` with `viewport={{ once: true, margin: '-10%' }}`,
  variants from `lib/motion.ts` (`fadeUp`, `stagger`).
- **Reduced motion respected globally.** `Reveal` reads `useReducedMotion()`; when true it renders
  content at rest (no transform/opacity animation). `globals.css` also short-circuits transitions under
  `@media (prefers-reduced-motion: reduce)`.
- **Framer only where it earns it:** scroll reveals, the mobile menu sheet, hover micro-interactions.
  Everything else (nav shrink, card hovers, accordion) is CSS — cheaper and SSR-safe.
- **No layout-shift / no infinite loops** on content; the hero image uses `priority`.

---

## 6. Blog Implementation Strategy

- **File-based MDX** in `content/blog/`. Each `*.mdx` has typed frontmatter parsed with `gray-matter`.
- **`lib/blog.ts`** exposes `getAllPosts()`, `getPostBySlug()`, `getAllSlugs()` (reads the filesystem at build).
- **Routes:** `/blog` lists posts (cover, title, date, tags, excerpt); `/blog/[slug]` renders the MDX with
  `next-mdx-remote/rsc`, custom components, and `generateStaticParams` + `generateMetadata` per post.
- **SEO:** each post emits BlogPosting JSON-LD and OG metadata; slugs feed `sitemap.ts`.
- **Authoring:** drop a new `.mdx` file in `content/blog/` → it appears on `/blog` and in the sitemap. No code changes.
- **Upgrade path:** swap to Contentlayer or a CMS later without touching routes — only `lib/blog.ts` changes.

---

## Setup (Vercel-ready)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

1. Fill in `src/config/site.config.ts` (phone, WhatsApp, Instagram, address, geo, maps).
2. Drop real photography into `public/images/**` (filenames already referenced in `data/*`).
3. Replace `public/logo.svg` to rebrand.
4. Set `NEXT_PUBLIC_SITE_URL` in Vercel env (see `.env.example`).
5. Push to GitHub → import in Vercel → deploy. No extra config needed.
```
