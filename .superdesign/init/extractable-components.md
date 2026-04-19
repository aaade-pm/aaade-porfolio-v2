# Extractable DraftComponents (Superdesign)

## NavBar

- **Source:** `components/layout/navbar.tsx`
- **Category:** layout
- **Description:** Sticky top nav; logo + CMS `navItems`.
- **Extractable props:** `activeItem` or `activeHref` (string) for Journal / Work highlighting.
- **Hardcoded:** structure, tracking classes, breakpoint layout.

## Footer

- **Source:** `components/layout/footer.tsx`
- **Category:** layout
- **Description:** CTA headline, email pill, social row, copyright, back-to-top.
- **Extractable props:** driven by `SiteSettingsResolved` in app; in drafts use static placeholder.
- **Hardcoded:** icon SVGs, grid structure.

## Blog post card (after implementation)

- **Source (planned):** `components/blog/journal-post-card.tsx`
- **Category:** basic
- **Extractable props:** `title`, `href`, `excerpt`, `category`, `publishedAt`, `readingTimeMinutes`, `coverImageUrl`, `coverAlt`.
