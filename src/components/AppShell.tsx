import { Link, Outlet } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; to: string; icon: LucideIcon; short?: string };

export function AppShell({ nav, mode }: { nav: NavItem[]; mode: "Buyer" | "Seller" }) {
  const [open, setOpen] = useState(false);
  const primary = nav.slice(0, 5);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 lg:px-10">
          <Link to="/" className="press flex shrink-0 items-baseline gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight">SilverHands</span>
            <span className="hidden rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent sm:inline">
              {mode}
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to.split("/").length <= 2 }}
                activeProps={{ className: "bg-primary-soft text-primary" }}
                className="rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link to={mode === "Buyer" ? "/seller" : "/buyer"}>
                Switch to {mode === "Buyer" ? "selling" : "buying"}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <nav
          aria-label="Mobile"
          className={cn(
            "overflow-hidden border-t border-border transition-all duration-300 lg:hidden",
            open ? "max-h-[32rem]" : "max-h-0",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {nav.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: to.split("/").length <= 2 }}
                activeProps={{ className: "bg-primary-soft text-primary" }}
                className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-lg font-medium"
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                {label}
              </Link>
            ))}
            <Link
              to={mode === "Buyer" ? "/seller" : "/buyer"}
              onClick={() => setOpen(false)}
              className="mt-1 flex min-h-14 items-center justify-center rounded-2xl bg-primary px-4 font-semibold text-primary-foreground"
            >
              Switch to {mode === "Buyer" ? "selling" : "buying"}
            </Link>
          </div>
        </nav>
      </header>

      <main
        id="main"
        className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 pb-32 lg:px-10 lg:py-16 lg:pb-16"
      >
        <Outlet />
      </main>

      <footer className="border-t border-border py-10 pb-28 text-center text-sm text-muted-foreground lg:pb-10">
        SilverHands — turning a lifetime of skill into livelihood.
      </footer>

      {/* One-handed bottom navigation on mobile */}
      <nav
        aria-label="Quick navigation"
        className="glass fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {primary.map(({ label, short, to, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                activeOptions={{ exact: to.split("/").length <= 2 }}
                activeProps={{ className: "text-primary" }}
                className="press flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-muted-foreground"
              >
                <Icon className="size-6 shrink-0" aria-hidden />
                <span className="text-[0.7rem] font-semibold leading-tight">{short ?? label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AIAssistant />
    </div>
  );
}
