# Routes (Next.js App Router)

| Path | File | Layout |
|------|------|--------|
| `/` | `app/(main)/page.tsx` | `app/(main)/layout.tsx` → `SiteShell` |
| `/work`, `/life`, `/about`, `/contact`, `/reach-me` | `app/(main)/*/page.tsx` | `SiteShell` |
| `/blog` | `app/blog/page.tsx` | `app/blog/layout.tsx` → `SiteShell` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | `SiteShell` |
| `/projects`, `/projects/[slug]` | `app/projects/...` | `SiteShell` |
| `/gallery` | `app/gallery/page.tsx` | `SiteShell` |
| `/studio/[[...tool]]` | `app/studio/[[...tool]]/page.tsx` | root `app/layout.tsx` only |

Studio: `sanity.config.ts` `basePath: '/studio'`.
