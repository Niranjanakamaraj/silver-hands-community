import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SectionHeading, ServiceCard } from "@/components/Cards";
import { categories, services } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buyer/services")({
  head: () => ({
    meta: [
      { title: "Explore services | SilverHands" },
      {
        name: "description",
        content:
          "Book tutoring, tailoring, home-cooked meals, gardening and more from experienced senior and homemaker sellers.",
      },
      { property: "og:title", content: "Explore services | SilverHands" },
      {
        property: "og:description",
        content: "Book trusted local services from experienced senior and homemaker sellers.",
      },
    ],
  }),
  component: ExploreServices,
});

function ExploreServices() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <div>
      <SectionHeading eyebrow="Explore" title="Services" />

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
              active === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary hover:text-primary",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      ) : (
        <p className="surface px-6 py-20 text-center text-muted-foreground">
          No sellers in {active} yet — new listings appear here every week.
        </p>
      )}
    </div>
  );
}
