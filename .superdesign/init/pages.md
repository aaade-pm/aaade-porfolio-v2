# Page dependency trees

## /blog (Journal listing)

**Entry:** `app/blog/page.tsx`

**Dependencies:**

- `app/blog/layout.tsx`
  - `components/layout/site-shell.tsx`
    - `components/layout/navbar.tsx`
    - `components/layout/footer.tsx`
      - `components/layout/footer-back-to-top.tsx`
- `lib/sanity.ts` — `getPosts()`
- `components/sections/grain-overlay.tsx`
- `components/blog/journal-hero.tsx`
- `components/blog/journal-blog-listing.tsx`
- `components/ui/*` (via journal components)
- `sanity/config/client.ts` — `isSanityConfigured()`

## /blog/[slug] (Article detail)

**Entry:** `app/blog/[slug]/page.tsx`

**Dependencies:**

- `app/blog/layout.tsx` → `SiteShell` (navbar, footer)
- `lib/sanity.ts` — `getPostBySlug()`, `getRelatedPosts()`, `urlForImage()`
- `components/sections/grain-overlay.tsx`
- `components/blog/article-reading-progress.tsx` (client)
- `components/blog/article-detail.tsx`
  - `components/blog/article-title.tsx`
  - `components/blog/article-newsletter-cta.tsx` (client)
  - `components/blog/article-related-grid.tsx`
  - `components/portable-text.tsx` — `RichText` with `tone="article"`; types `articleCode`, `articleCalloutGrid`
- `sanity/schemas/post.ts` — fields: `titleAccent`, `coverCaption`, `author*`, `tags`, portable `content` (+ `articleCode`, `articleCalloutGrid`)

## /projects/[slug] (Project / case study detail)

**Entry:** `app/projects/[slug]/page.tsx`

**Dependencies:**

- `app/projects/layout.tsx` → `SiteShell`
- `lib/sanity.ts` — `getProjectBySlug()`, `getNextProjectBySlug()`, `urlForImage()`
- `components/sections/grain-overlay.tsx`
- **Structured case study path** (when any of role, context, timeline, stack summary, challenge, overview, problem, approach steps, outcomes, or lessons is set):
  - `components/projects/case-study-hero.tsx`
  - `components/projects/case-study-meta-strip.tsx`
  - `components/projects/case-study-challenge.tsx`
  - `components/projects/case-study-approach.tsx`
  - `components/projects/case-study-gallery-rail.tsx`
  - `components/projects/case-study-outcomes.tsx`
  - `components/projects/case-study-footer-cta.tsx`
  - `components/portable-text.tsx` — optional `RichText` `tone="caseStudy"` for `caseStudy` body
- **Legacy path** (no structured fields): `components/ui/container.tsx`, `heading.tsx`, `section.tsx`, `text.tsx`, `RichText`
- `sanity/schemas/project.ts` — structured case study fields + `titleAccent`, `caseStudyEyebrow`, etc.

## /projects (listing)

**Entry:** `app/projects/page.tsx`

**Dependencies:** `app/projects/layout.tsx` → `SiteShell`; `lib/sanity.ts` (`getProjects` or equivalent); listing UI components as implemented in that page.
