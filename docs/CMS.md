# Content Management

This project uses Decap CMS. The admin application is available at `/admin` and
stores every edit as a Git commit. The website continues to render static pages
from JSON and MDX files, so there is no runtime database or CMS server.

The admin HTML declares `/admin/config.yml` explicitly with `cms-config-url`.
This is required because Next.js normalizes `/admin/` to `/admin`; without the
absolute config URL, Decap may resolve its default relative path as `/config.yml`.

## One-time GitHub and Vercel setup

1. Push the project to GitHub.
2. Replace `REPLACE_WITH_GITHUB_OWNER/REPLACE_WITH_REPOSITORY` in
   `public/admin/config.yml` with the GitHub repository.
3. Set `site_url` and `display_url` in that file to the production domain.
4. Configure a Decap-compatible GitHub OAuth provider and set its `base_url`
   under the `backend` block. Vercel does not provide Git Gateway, so the OAuth
   provider is the only small external authentication piece.
5. Add the non-technical editor as a GitHub collaborator, then visit `/admin`.

For local CMS editing, run `npx decap-server`, add `local_backend: true` to the
admin config while developing, and run the Next.js development server.

## Content layout

- `src/content/cms/site.json`: contact, social links, key images, and SEO.
- `src/content/cms/dictionaries/*.json`: all bilingual homepage text.
- `src/content/cms/data/*.json`: repeatable homepage cards and images.
- `src/content/blog/*.mdx`: statically generated blog posts.
- `public/images/*`: uploaded images, organized by content type.
