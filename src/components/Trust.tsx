import { BadgeCheck, ShieldCheck, Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      <BadgeCheck className="size-4" aria-hidden />
      ID verified
    </span>
  );
}

export function TrustRow({ years, className }: { years?: string; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 text-sm", className)}>
      <li className="inline-flex items-center gap-1.5 text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" aria-hidden />
        Secure payments
      </li>
      {years && (
        <li className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Clock3 className="size-4 text-primary" aria-hidden />
          {years}
        </li>
      )}
    </ul>
  );
}

export function CardSkeleton() {
  return (
    <div className="surface overflow-hidden" aria-hidden>
      <div className="shimmer aspect-[4/3] w-full" />
      <div className="space-y-3 p-5">
        <div className="shimmer h-3 w-24 rounded-full" />
        <div className="shimmer h-5 w-4/5 rounded-full" />
        <div className="shimmer h-4 w-1/2 rounded-full" />
        <div className="shimmer h-10 w-full rounded-full" />
      </div>
    </div>
  );
}
