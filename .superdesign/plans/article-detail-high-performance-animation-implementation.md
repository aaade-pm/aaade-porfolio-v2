# Article detail — High-Performance Animation Systems: implementation plan

**Superdesign**

- **Project ID:** `67c3776a-4aef-441f-9d96-f5cce92e54bd`
- **Draft:** Article Detail | High-Performance Animation Systems (`fe440cdd-63d6-4e06-b7a2-6d6140e40a9a`)
- **Fetched HTML:** `.superdesign/plans/draft-article-animation-systems.html`
- **Fetch command:** `superdesign get-design --draft-id fe440cdd-63d6-4e06-b7a2-6d6140e40a9a --output .superdesign/plans/draft-article-animation-systems.html`

**Target route:** `app/blog/[slug]/page.tsx` (inside `app/blog/layout.tsx` → `SiteShell`).

Per [SUPERDESIGN.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md): treat this as the agreed design direction for implementation (or wait for your explicit approval if you follow strict design-gate workflow).

---

## 1. Design summary (from draft HTML)

| Region | Behavior |
|--------|----------|
| **Shell** | Draft embeds `<sd-component Navigation>` / `Footer`. App uses `SiteShell` → **do not** duplicate nav/footer in the article body. |
| **Page chrome** | Full-viewport dark background, fixed **grain** (same noise asset as journal listing), `selection:bg-primary/30`. Match **`/blog` listing**: wrap content in `relative min-h-screen bg-background …` + `<GrainOverlay />`. |
| **Reading progress** | Fixed **3px** olive bar at top of viewport; width = scroll % of document. **Client-only** (`useEffect` + scroll listener or `useScroll`); respect **`prefers-reduced-motion`** (hide bar or disable transition). |
| **Article header** | `pt-32` equivalent below nav (listing uses `pt-40`; align with journal or use `pt-32 md:pt-40`). Eyebrow row: **date** · dot · **read time** · dot · **category** in `text-primary` (draft: `text-olive`). `text-xs uppercase tracking-[0.3em] text-zinc-500`. Staggered **`animate-fade-up`** (reuse `globals.css`; delays via utility or inline style). |
| **Title** | `text-4xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter`. Draft wraps one phrase in **italic primary** (“High-Performance”). |
| **Author row** | Avatar (rounded full, border), name, role subtitle (`text-xs uppercase tracking-widest text-zinc-500`). |
| **Hero image** | Full width within `max-w-7xl`, `aspect-video md:aspect-[21/9]`, `rounded-3xl`, grayscale → color on hover, olive overlay `bg-primary/10 mix-blend-overlay`. Optional **caption** under image (`text-xs text-center text-zinc-600 uppercase tracking-widest italic`). |
| **Body** | Wrapper `max-w-3xl mx-auto` with **article prose**: lead paragraph larger/lighter; paragraphs `text-lg` (~1.125rem), relaxed line-height, muted color; **h2** large display weight; **blockquote** left border primary, italic; **code blocks** dark panel (`bg-zinc-950`, border, rounded-xl, mono); inline `code` styled. |
| **Callout grid** | Draft shows **two** side-by-side cards (constraint labels + body). Requires either portable **custom block types** or a single RichText workaround (e.g. two-column grid via custom component). |
| **Tags** | Pill row `#tag` style at end of article (`bg-zinc-900 rounded-full text-xs`). |
| **Newsletter CTA** | Large **primary** rounded container (`rounded-[3rem]`), blur orb, headline, email form, subscribe button. **Product decision:** wire to real provider, link to external form, or **omit** until marketing stack exists. |
| **Related articles** | “Keep Reading” + “View all” → `/blog`. **Grid1/2/3** cards: image, meta (category · read time), title. Hide3rd card on `lg` if only two posts. |
| **Motion** | Draft combines CSS `animate-fade-up` + **IntersectionObserver** for `.animate-on-scroll`. Prefer **CSS-only** stagger on hero + optional **one** small client hook for scroll reveal; always gate with **`prefers-reduced-motion`**. |
| **Cursor** | Draft sets `cursor: crosshair` on `body` — **omit globally**; optional scoped wrapper only if you insist. |

Use **theme tokens** (`text-primary`, `bg-primary`, `border-primary`, `text-muted`) per `.superdesign/design-system.md`.

---

## 2. Current codebase gaps

| Area | Today | Needed for draft |
|------|--------|------------------|
| **`app/blog/[slug]/page.tsx`** | Minimal: small meta, h1, cover, `RichText` in narrow `Container` | Full editorial layout: grain, progress bar, hero header, featured media, styled body, tags, optional newsletter, related posts |
| **Typography** | `RichText` `tone` only `default` \| `hero` \| `about` | Add **`tone="article"`** (or dedicated `ArticleBody` wrapper) matching draft: h2 scale, blockquote, code, lead |
| **Portable Text** | Blocks: normal, h2, h3, lead, lists | Optional: **`code` mark** (inline), **`code` block** type (or `language` field) for fenced-style examples; optional **two-column “insight”** object for constraint cards |
| **Post schema** | `title`, `slug`, `coverImage`, `category`, `excerpt`, `publishedAt`, `content` | Optional **`coverCaption`**; optional **`tags`** (`array` of `string`); optional **title accent** — e.g. `titleAccent` (substring or second line) so “High-Performance” can be italic primary without hacking the plain title |
| **Author** | Not on post | Optional **`authorName`**, **`authorRole`**, **`authorImage`**; or resolve from **`siteSettings`** if you add global byline fields (fewer per-post edits) |
| **`getPostBySlug`** | Returns single post | Add **`getRelatedPosts({ excludeId, category, limit })`** for “Keep Reading” (same category first, then recent) |
| **Newsletter** | N/A | Placeholder form (no submit) vs integration — document choice |

---

## 3. Sanity / data layer

1. **`sanity/schemas/post.ts`** (incremental)
   - `coverCaption` — optional `string`
   - `tags` — optional `array` of `string`
   - `titleAccent` — optional `string` (phrase in `title` to wrap with accent styles, or separate line — pick one rule and document in Studio description)
   - `authorName` / `authorRole` / `authorImage` — optional (or defer to site settings)

2. **Portable text schema** (in `post` `content` field)
   - Extend `of` with optional **`code`** block type (fields: `code` text, `language` string) if you want parity with the draft’s code panels
   - Optional **object** type `articleCalloutGrid` with two `{ title, body }` slots for the “Constraint 01/02” grid

3. **`lib/sanity.ts`**
   - Extend post query with new fields
   - Implement `getRelatedPosts` + use in `[slug]` page

4. **`types/sanity.ts`**
   - Extend `PostDetail` / list types as needed for related query projections

5. **`components/portable-text.tsx`**
   - `tone="article"`: paragraph/h2/blockquote/code styles per draft
   - Register `code` block component if added to schema
   - Add `marks.code` for inline `<code>` if editors use it

---

## 4. Component structure (recommended)

| Component | Responsibility |
|-----------|------------------|
| `components/blog/article-reading-progress.tsx` | `'use client'` — progress bar + reduced motion |
| `components/blog/article-detail.tsx` | Presentational shell: grain wrapper, header, media, body slot, tags, CTA slot, related |
| `components/blog/article-related-grid.tsx` | Maps `PostListItem[]` to draft card markup; links to `/blog/[slug]` |
| `app/blog/[slug]/page.tsx` | Fetch post, related posts; compose layout; pass `readingTimeMinutes` from existing `getPostBySlug` |

Keep **`SiteShell`** in layout; article page only renders **main** inner content (no second navbar).

---

## 5. Implementation checklist

1. [ ] Add `GrainOverlay` + outer wrapper classes to `[slug]` page to match `/blog` listing.
2. [ ] Implement `ArticleReadingProgress` and mount at top of article tree (`z-index` above content, below modals if any).
3. [ ] Build article header (meta, title with optional accent, author block) using **`max-w-7xl`** + responsive padding `px-6 md:px-12`.
4. [ ] Featured image section with Next/Image, hover + overlay; optional caption from `coverCaption`.
5. [ ] Extend `RichText` / portable text for **article** typography and code.
6. [ ] Tags row from `post.tags` (hide if empty).
7. [ ] Newsletter block: **placeholder** or real integration (explicit product choice).
8. [ ] `getRelatedPosts` + `ArticleRelatedGrid`; “View all” → `/blog`.
9. [ ] Optional scroll-reveal: prefer CSS; if using `IntersectionObserver`, bundle in a tiny client wrapper and respect reduced motion.
10. [ ] Update `.superdesign/init/pages.md` **/blog/[slug]** dependency tree after files exist.
11. [ ] `generateMetadata`: keep using `excerpt`; consider OG image from `coverImage`.

---

## 6. Out of scope / defer

- Exact **Superdesign preview URLs** in related links (replace with real slugs).
- **Dicebear** avatar if you prefer real **`authorImage`** from Sanity only.
- **IntersectionObserver** on every `h2`/`blockquote` like the draft script — high churn; start with hero stagger only.

---

## 7. Verification

- [ ] No invalid HTML nesting in Studio (unchanged) / article page is mostly static + portable text.
- [ ] Lighthouse: reading progress and observers don’t cause layout thrash.
- [ ] Keyboard: newsletter inputs and related cards are focusable and labeled.
