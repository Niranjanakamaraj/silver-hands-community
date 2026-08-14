import { Link, Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; to: string };

export function AppShell({ nav, mode }: { nav: NavItem[]; mode: "Buyer" | "Seller" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 lg:px-10">
          <Link to="/" className="flex shrink-0 items-baseline gap-2">
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
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        <nav
          aria-label="Mobile"
          className={cn(
            "overflow-hidden border-t border-border transition-all duration-300 lg:hidden",
            open ? "max-h-96" : "max-h-0",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to.split("/").length <= 2 }}
                activeProps={{ className: "bg-primary-soft text-primary" }}
                className="rounded-xl px-4 py-3.5 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-14">
        <Outlet />
      </main>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        SilverHands — turning a lifetime of skill into livelihood.
      </footer>

      <AIAssistant />
    </div>
  );
}
