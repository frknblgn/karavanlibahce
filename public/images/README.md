# /public/images

All site imagery lives here, grouped by section. **Placeholder JPEGs are already
in place** (tone-matched gradients) so the project runs and looks intentional out
of the box. Replace each file with real photography at the same path — no code
changes needed.

| Folder | Files | Suggested size | Notes |
|---|---|---|---|
| `hero/` | `hero-caravan-sunset.jpg` | 2000×1200 | Warm golden-hour caravan scene: caravan, seating, campfire, people. |
| `experience/` | `caravan-stays`, `rest-in-nature`, `family-friendly`, `quiet-peaceful` | 900×1200 (portrait) | One per Experience card. |
| `facilities/` | `facilities.jpg` | 1100×900 | Single feature image beside the facilities list. |
| `gallery/` | 9 files (see `src/data/gallery.ts`) | ~800px wide, mixed heights | `tall: true` items look best portrait. |
| `nearby/` | `dagyenice`, `golyazi`, `cumalikizik`, `misi`, `uludag` | 800×1000 | One per attraction card. |
| `blog/` | `weekend-escape.jpg`, `caravan-guide.jpg` | 1200×675 | Post covers; add one per new post. |
| `og/` | `og-default.jpg` | 1200×630 | Social share / Open Graph image. |

**Filenames are referenced from `src/data/*` and `src/config/site.config.ts`.**
Keep the names (or update the data file) and `next/image` handles optimization.

The `Photo` component renders a brand gradient underneath every image, so a
missing or slow image degrades gracefully instead of showing a broken frame.
