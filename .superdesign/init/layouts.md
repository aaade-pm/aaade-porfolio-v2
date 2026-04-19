# Layout components (full source)

## `components/layout/site-shell.tsx`

```tsx
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { SiteSettingsResolved } from "@/types/site-settings";

type Props = {
  settings: SiteSettingsResolved;
  children: React.ReactNode;
};

export function SiteShell({ settings, children }: Props) {
  return (
    <>
      <Navbar settings={settings} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
```

## `components/layout/navbar.tsx`

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { SiteSettingsResolved } from "@/types/site-settings";

type Props = {
  settings: SiteSettingsResolved;
};

export function Navbar({ settings }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-16 md:px-12">
        <Link
          href="/"
          className="nav-underline font-display flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt={settings.logo?.alt ?? settings.brandMark}
              width={36}
              height={36}
              className="size-9 rounded-sm object-contain"
            />
          ) : null}
          <span>{settings.brandMark}</span>
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 md:gap-x-8">
          {settings.navItems.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link
                href={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                className={cn(
                  "nav-underline text-[11px] font-medium tracking-widest text-zinc-500 uppercase md:text-xs",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

> **Design gap:** Draft `Navigation` highlights `activeItem`. Navbar currently does not style the active route. Plan: `usePathname()` + match `item.href` for `text-primary` / `text-white`.

## Footer

Full source: `components/layout/footer.tsx` (footer CTA, socials, copyright). Listing page uses shell; no duplicate footer in page body.
