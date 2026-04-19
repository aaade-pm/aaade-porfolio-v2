/**
 * Feature flags (server-only).
 *
 * Article newsletter CTA (`ArticleNewsletterCta`):
 * - Shown in local dev, `next start`, and Vercel Preview without configuration.
 * - On Vercel Production (`VERCEL_ENV === "production"`), shown only when
 *   `ARTICLE_NEWSLETTER_CTA_ENABLED_IN_PRODUCTION` is exactly `"true"`.
 *   Unset or any other value hides the block on the live site.
 */
export function isArticleNewsletterCtaEnabled(): boolean {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.ARTICLE_NEWSLETTER_CTA_ENABLED_IN_PRODUCTION === "true";
  }
  return true;
}
