"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useArchiveModal } from "@/components/layout/archive-modal-provider";
import { cn } from "@/lib/utils";
import type { SiteSettingsResolved } from "@/types/site-settings";

type Props = {
  settings: SiteSettingsResolved;
};

function navLinkActive(pathname: string, href: string) {
  if (href === "/" || href === "#") return pathname === href;
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(`${href}/`)) return true;
  return false;
}

/** Default CMS “Work” points at `/work`; treat that as the Selected Works / archive entry. */
function isWorkNavHref(href: string) {
  const path = href.split("#")[0].split("?")[0];
  return path === "/work";
}

export function Navbar({ settings }: Props) {
  const pathname = usePathname();
  const { openArchive } = useArchiveModal();
  const isHome = pathname === "/";

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
          {settings.navItems.map((item) => {
            const active = navLinkActive(pathname, item.href);
            const isWork = isWorkNavHref(item.href) && !item.openInNewTab;
            const linkClass = cn(
              "nav-underline text-[11px] font-medium tracking-widest uppercase md:text-xs",
              active ? "text-primary" : "text-zinc-500",
            );

            if (isWork && isHome) {
              return (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href="/#work"
                    className={linkClass}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            if (isWork && !isHome) {
              return (
                <li key={`${item.href}-${item.label}`}>
                  <button
                    type="button"
                    onClick={openArchive}
                    className={cn(linkClass, "cursor-pointer bg-transparent")}
                    aria-label={`${item.label} — open project archive`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className={linkClass}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
