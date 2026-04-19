# Design system (repo)

Source of truth: `styles/globals.css` (Tailwind v4 `@theme inline`).

## Colors

- Background: `bg-background` (`#080808`)
- Foreground: `text-foreground` (`#f5f5f5`)
- Primary / olive accent: `text-primary`, `bg-primary`, `border-primary` (`#708238`); hover `primary-hover` (`#8ea64b`)
- Muted text: `text-zinc-400`, `text-zinc-500`, `text-zinc-600`
- Borders: `border-zinc-800`, `border-zinc-900`

## Typography

- Body: Satoshi (`font-sans`)
- Display: Cabinet Grotesk (`font-display`) — matches Superdesign drafts
- Geist loaded in root layout as fallback stack

## Patterns (globals)

- `.grain-overlay` — noise texture (same URL as Superdesign draft)
- `.nav-underline` — nav link hover rule
- `.animate-fade-up` — entrance animation; respect `prefers-reduced-motion` in utilities layer
- `.scrollbar-ademola` — custom scrollbar

## Implementation rule

Prefer **theme tokens** (`primary`, `background`, `foreground`) over raw hex in new blog UI.
