---
name: superdesign
description: Runs the Superdesign CLI for frontend UI/UX design drafts, iterations, multi-page flows, and reusable components on an infinite canvas. Use before implementing UI that needs design thinking, when the user asks to design or improve a page/feature/flow, or when setting a design system. Triggers include superdesign commands, faithful UI reproduction, design variations, and component extraction.
metadata:
  author: superdesign
  version: "0.0.2"
---

# Superdesign

Superdesign is a design agent for frontend UI/UX. It helps (1) find design inspirations/styles and (2) generate and iterate design drafts on an infinite canvas.

## Core scenarios

1. **superdesign init** — Analyze the repo and build UI context under `.superdesign/init/`.
2. **Help me design X** (feature, page, or flow).
3. **Set design system**.
4. **Help me improve design of X**.

## Common CLI commands

- `superdesign create-project --title "X"` — setup project
- `superdesign create-design-draft --project-id <id> --title "Current UI" -p "Faithfully reproduce..." --context-file src/Component.tsx` — faithful reproduction
- `superdesign iterate-design-draft --draft-id <id> -p "dark theme" -p "minimal" --mode branch --context-file src/Component.tsx` — design variations
- `superdesign execute-flow-pages --draft-id <id> --pages '[...]' --context-file src/Component.tsx` — extend to more pages
- `superdesign create-component --project-id <id> --name "NavBar" --html-file /tmp/navbar.html --props '[...]'` — extract reusable component
- `superdesign update-component --component-id <id> --html-file /tmp/navbar.html` — update existing component
- `superdesign list-components --project-id <id>` — list components

**Line ranges:** `--context-file path:startLine:endLine` (use per upstream guidelines: mainly to skip pure logic blocks or to slice very large files).

## Init: repo analysis

When `.superdesign/init/` does not exist or is empty, automatically:

1. Create `.superdesign/init/`.
2. Fetch and follow: [INIT.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/INIT.md)
3. Analyze the repo and write the context files described there.

Do not ask the user to do this manually.

## Mandatory init files (read before design work)

If `.superdesign/init/` exists, read **all** files in that directory **first** before any design task:

| File | Purpose |
|------|---------|
| `components.md` | Shared UI primitives (with source as produced by init) |
| `layouts.md` | Layout components (nav, sidebar, header, footer) |
| `routes.md` | Page/route mapping |
| `theme.md` | Tokens, CSS variables, Tailwind config |
| `pages.md` | Page dependency trees |
| `extractable-components.md` | Candidates for reusable DraftComponents |

**Designing for an existing page:** Use `pages.md` for the full dependency tree. Pass **every file in that tree** as `--context-file`. Also include `globals.css`, Tailwind config, and `design-system.md` when they exist.

## Superdesign CLI: install and login (before any command)

Before running **any** `superdesign` command:

1. **Install check:** `superdesign --version`
   - If it succeeds, skip install.
   - If not found: `npm install -g @superdesign/cli@latest`
2. **Login check:** Run e.g. `superdesign --help`. If auth/login fails, run `superdesign login` and wait until it succeeds.
3. Only then run the intended Superdesign commands.

Never assume the user is already logged in; verify each session.

## Fresh upstream guidelines

Before substantive Superdesign work, fetch and follow:

[SUPERDESIGN.md](https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md)

That document is authoritative for workflow details (e.g. parallel context gathering, when to implement code vs. wait for approval, line-range rules, brand/icon rules).

## Design vs. implementation

Per `SUPERDESIGN.md`: produce designs in Superdesign first; implement application code **after** the user approves or explicitly says to skip design and implement.
