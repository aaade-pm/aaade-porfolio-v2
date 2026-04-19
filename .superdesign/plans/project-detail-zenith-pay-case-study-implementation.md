# Project detail — Zenith Pay case study: implementation plan

**Superdesign**

- **Project ID:** `67c3776a-4aef-441f-9d96-f5cce92e54bd`
- **Draft:** Zenith Pay Case Study (`53aaa183-f12a-4d4d-94ef-44868f6ca7ae`)
- **Fetched HTML:** `.superdesign/plans/draft-zenith-pay-case-study.html`
- **Fetch command:** `superdesign get-design --draft-id 53aaa183-f12a-4d4d-94ef-44868f6ca7ae --output .superdesign/plans/draft-zenith-pay-case-study.html`

**Target route:** `app/projects/[slug]/page.tsx` (typically `app/(main)/...` or existing projects layout with `SiteShell`).

Per [SUPERDESIGN.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md): treat this as the agreed design direction for implementation (or wait for explicit approval if you use a strict design gate).

---

## 1. Design summary (from draft HTML)

| Region | Behavior |
|--------|----------|
| **Shell** | Draft uses `<sd-component Navigation activeItem="work">` + `Footer`. App: **`SiteShell`** only — no duplicate nav/footer in page body. Ensure **Work / Projects** nav item uses `usePathname()` so `/projects` and **`/projects/*`** read as active (same pattern as `/blog`). |
| **Page chrome** | Dark background, fixed **grain** overlay (match blog listing / article detail). `selection:bg-primary/30`. |
| **Hero** | `pt-40` region, `max-w-7xl`. Eyebrow: `Case Study / {year}` — draft uses “2024”; map from **`project.year`** + label “Case Study”. Title: huge display, **uppercase**, tight leading; **split emphasis**: first word(s) white, remainder **`text-zinc-600 italic`** (draft: “Zenith” + “Pay”). **Primary CTA** pill upper-right: “Live Website” + external-link icon → `project.liveUrl` (hide if missing; secondary GitHub optional). |
| **Hero media** | `aspect-[16/7]`, `rounded-3xl`, shadow; gradient overlay bottom. Use **first gallery image** or dedicated hero field. |
| **Meta strip** | Full-width within `max-w-7xl`, **4 columns** on desktop: **Role**, **Context**, **Timeline**, **Stack**. Thin borders top/bottom `border-zinc-800`. Draft copy is bespoke; needs **structured fields** or editorial compromise. |
| **Challenge section** | **12-column grid**: **sticky** left column (`sticky top-24` / `top-32` accounting for nav) with big heading + olive rule; right column **two blocks** (“Overview”, “The Problem”) with small uppercase labels + body. |
| **Approach** | Section on **`bg-zinc-900/30`**, centered eyebrow “The Approach”, **3 cards** numbered01–03, large gray numbers, title, muted body, border hover **`border-primary/30`**. |
| **Visual narrative** | Heading + short description row; **horizontal scroll** strip of large `aspect-video` images (draft:3). Use **`project.images`** (skip hero image if same as first to avoid duplicate, or show all). `overflow-x-auto` + **`scrollbar-hide`** (already in globals). |
| **Outcome + lessons** | Two columns on `md+`: left **stats** (big number + title + description) ×3; right **“Lessons learned”** quotes + attribution. Draft uses olive-tinted section background `bg-primary/5 border-y border-primary/10`. |
| **Closing CTA** | Centered: “Loved this? Explore more work.” + two pills: **Next project** (dynamic: next slug or curated) + **Back to portfolio** → `/work` or `/projects`. |
| **Motion** | `animate-fade-up` on hero; **IntersectionObserver** adds `animate-fade-up` to `.animate-on-scroll`. Respect **`prefers-reduced-motion`**. |

Token rule: **`text-primary`**, **`bg-primary`**, `font-display`, Tailwind spacing — align with `.superdesign/design-system.md`.

---

## 2. Current codebase gaps

| Area | Today | Needed for draft |
|------|--------|------------------|
| **`app/projects/[slug]/page.tsx`** | Title, description, links, tech pills, one hero image, single “Case study” **`RichText`** column | Multi-section **case study layout**: hero split, meta grid, sticky + two-column narrative, 3-card approach, image rail, outcomes, lessons, CTA |
| **`project` schema** | `title`, `slug`, `category`, `year`, `description`, `techStack`, `images`, URLs, `caseStudy` (portable text only) | Structured fields for **meta strip**, **overview/problem** (or keep in PT), **approach steps**, **outcome stats**, **lessons**; optional **hero** image distinct from gallery |
| **Title treatment** | Single `Heading` | Split styling requires **`displayTitle`** / **`titleEmphasis`** fields or a documented convention (e.g. last word = accent — fragile for i18n) |
| **Portable Text** | One block for whole narrative | Either **migrate** long-form copy into structured sections + shorter PT for extras, or **keep PT** and implement only hero + rail + CTA (partial visual match) |

---

## 3. Sanity / data — recommended approach

### Option A — Structured case study (best match to Zenith draft)

Extend **`sanity/schemas/project.ts`** with optional groups (all optional so existing projects keep working):

| Field | Type | Maps to draft |
|-------|------|----------------|
| `caseStudyEyebrow` | `string` | Override “Case Study /” line (default from `year`) |
| `role` | `string` | Meta column1 |
| `context` | `string` | Meta column 2 |
| `timeline` | `string` | Meta column 3 (e.g. “4 Months (Q1 2024)”) |
| `stackSummary` | `string` | Meta column 4; fallback: `techStack.join(', ')` |
| `challengeTitle` | `string` | Sticky left headline |
| `overview` | `text` | Overview body |
| `problem` | `text` | Problem body |
| `approachSteps` | `array` of `{ title, body }` (max 3) | The Approach cards |
| `outcomes` | `array` of `{ value, label, description }` | Outcome stats |
| `lessons` | `array` of `text` or single `portableText` | Lessons column |
| `lessonsAttribution` | `string` + optional `role` | Name + “Lead Engineer” line |
| `titleAccent` | `string` | Part of title to style as muted italic (e.g. “Pay”) |

Keep **`caseStudy`** portable text for **remaining long-form** content *below* the structured sections, or deprecate in favor of structure.

### Option B — Minimal schema (faster ship)

- No new fields: implement **hero**, **meta** (derive stack from `techStack`, put `description` in overview only), **image rail**, **CTA**.
- Single **`RichText`** with new **`tone="caseStudy"`** for typography only — **does not** reproduce sticky layout, stats, or 3-card grid without awkward PT hacks.

**Recommendation:** Plan for **Option A** on flagship projects; gate sections with `if (project.role)` etc. so sparse documents still render a simple layout.

---

## 4. Component structure (recommended)

| Component | Responsibility |
|-----------|------------------|
| `components/projects/case-study-hero.tsx` | Eyebrow, split title, CTA, hero image |
| `components/projects/case-study-meta-strip.tsx` | Four columns |
| `components/projects/case-study-challenge.tsx` | Sticky heading + overview/problem |
| `components/projects/case-study-approach.tsx` | Three cards |
| `components/projects/case-study-gallery-rail.tsx` | Horizontal scroll images |
| `components/projects/case-study-outcomes.tsx` | Stats + lessons column |
| `components/projects/case-study-footer-cta.tsx` | Next project + back links |
| `app/projects/[slug]/page.tsx` | Fetch project; compose; `getAdjacentProjects` or `getNextProjectSlug` for “Next” |

Add **`GrainOverlay`** at page root like blog.

---

## 5. Data fetching

1. Extend **`projectBySlugQuery`** in `lib/sanity.ts` with new fields.
2. **`getProjectBySlug`** returns extended **`ProjectDetail`** type in `types/sanity.ts`.
3. **`getNextProjectBySlug(slug)`** (optional): order by `year desc` or `title`, return next item for CTA; or manual **`relatedProject`** reference in schema for curated “Next: Luxe Noir”.

---

## 6. Implementation checklist

1. [ ] Confirm projects layout uses `SiteShell` and add **grain** + selection wrapper to `[slug]` page.
2. [ ] Navbar: ensure **`/projects/*`** highlights the Work/Projects link (if not already).
3. [ ] Schema migration (Option A fields) + regenerate types.
4. [ ] Build presentational components; **feature-detect** sections (hide meta row if all empty).
5. [ ] Map **`images`**: hero = `[0]`, rail = `[0..]` or `[1..]` to skip duplicate.
6. [ ] RichText: add **`tone="caseStudy"`** for any remaining portable body (blockquote, lists) consistent with Zenith body copy scale.
7. [ ] Scroll reveal: optional client hook; reduced motion = show immediately.
8. [ ] Footer CTA: implement **next** link logic + fallback “All work” if single project.
9. [ ] Update `.superdesign/init/pages.md` for `/projects/[slug]` dependency tree.
10. [ ] `generateMetadata`: use `description` + hero image when present.

---

## 7. Out of scope / defer

- **iconify-icon** in React: use **`lucide-react`** `ExternalLink` (already common in Next apps) or project icon set.
- Replacing Unsplash URLs — all imagery from **Sanity** `images[]`.
- Exact draft metrics (98%, 45%,1.2s) — editors own **`outcomes`** content.

---

## 8. Verification

- [ ] Layout works when **only** legacy fields exist (graceful degradation).
- [ ] Sticky column does not overlap nav (`top` offset matches sticky header height).
- [ ] Horizontal rail: keyboard scroll / visible focus where possible.
- [ ] External links: `rel`, `target`, accessible labels.
