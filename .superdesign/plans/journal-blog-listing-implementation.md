# Journal — Blog listing: implementation plan

**Superdesign**

- **Project ID:** `67c3776a-4aef-441f-9d96-f5cce92e54bd`
- **Draft:** Journal — Blog Listing (`53843f77-c039-4398-b337-16b58a955100`)
- **Fetched with:** `superdesign get-design --draft-id 53843f77-c039-4398-b337-16b58a955100`

**Repo context:** `.superdesign/init/*`, `.superdesign/design-system.md`

Per [SUPERDESIGN.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md): implement application code **after** you approve this design direction (or you explicitly say to skip design approval).

---

## 1. Design summary (from draft HTML)

| Region | Behavior |
|--------|----------|
| **Shell** | Draft uses `<sd-component Navigation>` / `Footer`. App already has `SiteShell` → **no duplicate** nav/footer in page body. |
| **Page chrome** | Full-bleed dark background, grain overlay, `selection:bg-primary/30`. Match home (`GrainOverlay` + wrapper classes). |
| **Hero** | Eyebrow: “Journal & Archive” (`text-xs`, `tracking-[0.4em]`, **primary**). Headline: “READS &” + line break + “REFLECTIONS.” (`text-zinc-600 italic`). Right column: short intro (`text-zinc-400`, `max-w-xs`). `animate-fade-up` stagger. |
| **Category pills** | Horizontal scroll row: “All Posts” (filled **primary**), others outline `border-zinc-800` → hover **primary**. Design shows Tech / Thoughts / Experiments — **derive** from real post categories + “All”. |
| **Grid** | `grid-cols-1 md:2 lg:3`, `gap-x-8 gap-y-16`. |
| **Card** | Link wrapper; `aspect-[4/3]` image, `rounded-2xl`, grayscale → color on hover; category pill top-right; meta row (date · olive dot · read time); `font-display` title; `line-clamp-3` excerpt; “Read article” + arrow, gap animates on hover. |
| **Load more** | Centered pill button: `border-primary text-primary hover:bg-primary hover:text-white`, uppercase tracking. |
| **Motion** | Draft uses `fadeInUp` + intersection observer. Prefer **`prefers-reduced-motion`** (already in `globals.css` for `.animate-fade-up`). Optional: `framer-motion` only if you need IO parity; CSS animation is enough. |
| **Cursor** | Draft sets `cursor: crosshair` on `body` — **omit globally**; if desired, scope to this page wrapper only and test a11y. |

Use **theme tokens** (`text-primary`, `bg-primary`, …) instead of raw `#708238` in new code.

---

## 2. Current codebase gaps

| Area | Today | Needed for draft |
|------|--------|------------------|
| **`app/blog/page.tsx`** | Simple list: `Heading`, `Text`, borders, no images | Full journal layout (hero, filters, card grid, load more) |
| **Post schema** | `title`, `slug`, `coverImage`, `category`, `publishedAt`, `content` | **Excerpt** for card body (no `content` in list query today). **Reading time** optional field or **derived** in API |
| **GROQ** | `post` list projection | Add `excerpt` field **or** keep list lean and add `pt::text(content)` preview (heavy) — prefer dedicated `excerpt` string |
| **Navbar** | No active state | Highlight nav item when `usePathname()` matches `/blog` (and `/blog/*` for detail later) |
| **Container width** | `Container` default `max-w-6xl` | Pass **`className="max-w-7xl md:px-12"`** (or extend Container) to match draft |

---

## 3. Sanity / data layer

1. **`sanity/schemas/post.ts`**
   - Add optional **`excerpt`** (`text`, rows3–4) for card copy.
   - Optionally add **`readingTimeMinutes`** (`number`) for editors; if omitted, compute in `lib/sanity.ts` from portable text word count (simple heuristic) for list mapping only.

2. **`lib/sanity.ts`**
   - Extend `postsQuery` with `excerpt` and optional `readingTimeMinutes`.

3. **`types/sanity.ts`**
   - Extend `PostListItem` with `excerpt: string | null`, `readingTimeMinutes: number | null` (if used).

4. **Studio**
   - Content editors fill excerpt (and optionally read time) for each post.

---

## 4. React structure (suggested files)

Keep **`app/blog/layout.tsx`** as-is (`SiteShell`).

| File | Role |
|------|------|
| `app/blog/page.tsx` | Server: `getPosts()`, wrap with `GrainOverlay` + page shell; pass **serialized** posts into client island **or** render static hero server-side + client grid |
| `components/blog/journal-page.tsx` | Optional single client component: filters + visible slice + load more (receives `posts: PostListItem[]`) |
| `components/blog/journal-hero.tsx` | Server component: eyebrow, split headline, intro copy (strings can later move to `siteSettings` if you want CMS control) |
| `components/blog/journal-post-card.tsx` | Presentational card: `Link` + `next/image` + `urlForImage` |
| `components/blog/category-filter-bar.tsx` | Client: pill buttons, `overflow-x-auto`, `scrollbar-hide` utility if missing |

**Load more:** Pass full list from server; client state `visibleCount` (e.g. start 6, +6 per click). No extra API round-trip. Alternative: `searchParams` pagination for SEO — heavier; draft matches “Load more” UX.

**Empty state:** Keep friendly copy when `posts.length === 0` (Studio / `.env` hint).

---

## 5. Navbar active state

- In **`navbar.tsx`**: `usePathname()` from `next/navigation`.
- For each `item.href`, mark active if `pathname === item.href` or `pathname.startsWith(item.href + "/")` for nested routes (e.g. `/blog/foo`).
- Apply e.g. `text-primary` or `text-white` + `nav-underline` for active link.

---

## 6. Styling utilities

- Add **`scrollbar-hide`** (or use `overflow-x-auto` only) if pills overflow on mobile — Tailwind arbitrary or plugin.
- Reuse **`.blog-card`** pattern from draft as Tailwind classes on the card component (group / group-hover), not necessarily a global class unless reused.

---

## 7. Icons

- Use **`lucide-react`** `ArrowRight` for “Read article” CTA (draft uses Iconify `lucide:arrow-right`).

---

## 8. QA checklist

- [ ] Lighthouse / a11y: contrast on primary pills, focus rings on filters and load more.
- [ ] Images: `sizes` for grid, `alt` from Sanity.
- [ ] Reduced motion: animations disabled or minimal.
- [ ] Mobile: horizontal pill row scroll; grid stacks.
- [ ] `npm run build` + lint clean.

---

## 9. Implementation order

1. Sanity `excerpt` (+ optional `readingTimeMinutes`) + types + GROQ.
2. `JournalPostCard` + `JournalHero` (server).
3. `CategoryFilterBar` + client wrapper (filter + load more).
4. Rewrite `app/blog/page.tsx` composition + `GrainOverlay`.
5. Navbar active state.
6. Polish: motion, scrollbar, optional page-scoped cursor.

---

## 10. Reference command

Refresh design HTML anytime:

```bash
superdesign get-design --draft-id 53843f77-c039-4398-b337-16b58a955100 --json
```

Optional export:

```bash
superdesign get-design --draft-id 53843f77-c039-4398-b337-16b58a955100 --output .superdesign/plans/journal-blog-listing-draft.html
```
