---
name: Newsletter CTA feature flag
overview: Show the article newsletter CTA everywhere except Vercel Production until you opt in via a single production-only env var in the Vercel dashboard.
todos:
  - id: env-helper
    content: Add isArticleNewsletterCtaEnabled() — one flag only when VERCEL_ENV is production (lib/feature-flags.ts)
    status: completed
  - id: gate-detail
    content: Conditionally render ArticleNewsletterCta in article-detail.tsx
    status: completed
  - id: doc-env
    content: Document the single Vercel Production env var (feature-flags.ts comment and/or README)
    status: completed
isProject: false
---

# Feature-flag: article newsletter CTA (Vercel Production only)

## Target

The green “Get the latest experiments in your inbox” block is `[ArticleNewsletterCta](components/blog/article-newsletter-cta.tsx)`, rendered from `[ArticleDetail](components/blog/article-detail.tsx)`.

## Approach: one toggle, Vercel Production only

Keep configuration **minimal**: a **single** server-only env var that is only consulted when the app runs on **Vercel Production** (`VERCEL_ENV === "production"`).


| Where                                                    | Behavior                                                                                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Local `next dev`, local `next start`, Vercel **Preview** | CTA **shown** (no env needed) — easy to iterate until the form is real.                                                             |
| **Vercel Production**                                    | CTA **shown** only when the one variable is exactly `"true"`; **unset or anything else → hidden** (safe default for the live site). |


**Variable name (suggested):** `ARTICLE_NEWSLETTER_CTA_ENABLED_IN_PRODUCTION`  
(Or shorter `ARTICLE_NEWSLETTER_CTA_ENABLED` with the doc clarifying it applies **only** on Vercel Production — pick one name in implementation and use it consistently.)

**Logic:**

```ts
// Pseudocode
if (process.env.VERCEL_ENV === "production") {
  return process.env.ARTICLE_NEWSLETTER_CTA_ENABLED_IN_PRODUCTION === "true";
}
return true;
```

No separate dev/preview flags — **cleaner**, and production is the only place you flip one switch in the Vercel UI when ready.

```mermaid
flowchart TD
  start[Request]
  vProd{VERCEL_ENV production?}
  start --> vProd
  vProd -->|yes| readFlag[Flag equals true?]
  vProd -->|no| show[Show CTA]
  readFlag -->|yes| show
  readFlag -->|no| hide[Hide CTA]
```



## Code changes

1. Add `[lib/feature-flags.ts](lib/feature-flags.ts)` with `isArticleNewsletterCtaEnabled(): boolean` as above.
2. In `[article-detail.tsx](components/blog/article-detail.tsx)`: `{isArticleNewsletterCtaEnabled() ? <ArticleNewsletterCta /> : null}`.
3. **Docs:** Comment at top of `feature-flags.ts` explaining the single var and that it applies only on Vercel Production; optional one line in `[README.md](README.md)` if the repo already lists env vars.

## Testing

- Local blog post → CTA visible without setting anything.
- Vercel Preview deployment → CTA visible.
- Vercel Production with var unset → CTA hidden; set to `true` → CTA visible.

