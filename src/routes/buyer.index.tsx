import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, MapPin, ShieldCheck, Star, Users } from "lucide-react";

import { ProductCard, SectionHeading, ServiceCard } from "@/components/Cards";
import { Stars } from "@/components/Stars";
import { VerifiedBadge } from "@/components/Trust";
import { Button } from "@/components/ui/button";
import { categories, products, services } from "@/lib/data";

export const Route = createFileRoute("/buyer/")({
  head: () => ({
    meta: [
      { title: "Discover local makers & experts | SilverHands" },
      {
        name: "description",
        content:
          "Search AI-curated services, handmade products and mentors from senior citizens and homemakers near you.",
      },
      { property: "og:title", content: "Discover local makers & experts | SilverHands" },
      {
        property: "og:description",
        content: "AI-curated services, handmade products and mentors near you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuyerHome,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const trust = [
  { icon: ShieldCheck, label: "Every seller ID-verified" },
  { icon: Star, label: "4.9 average rating" },
  { icon: Users, label: "4,200 experts across 38 cities" },
];

function BuyerHome() {
  return (
    <div className="space-y-20 lg:space-y-28">
      <section className="surface-raised gradient-olive rise-in overflow-hidden px-6 py-14 text-center lg:px-16 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {greeting()}, Meera
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
          What would you like to find today?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Decades of craft, cooking and teaching — from people in your own neighbourhood.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="q" className="sr-only">
            Search services and products
          </label>
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="q"
              placeholder="Try “home-cooked meals near me”"
              className="h-15 w-full rounded-full border border-border bg-card pl-13 pr-5 text-base shadow-soft outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" size="xl" variant="gold" className="press">
            <Sparkles /> AI Search
          </Button>
        </form>

        <ul className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {trust.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-5 text-primary" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading
          eyebrow="Trending"
          title="Browse by category"
          description="Ten crafts and services, curated weekly by what your neighbourhood is booking."
        />
        <div className="rail lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/buyer/services"
              className="surface hover-lift press group w-44 overflow-hidden sm:w-52 lg:w-auto"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold leading-snug">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Featured"
          title="Services worth booking"
          action={
            <Button asChild variant="outline">
              <Link to="/buyer/services">View all services</Link>
            </Button>
          }
        />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Handmade"
          title="Made slowly, by hand"
          action={
            <Button asChild variant="outline">
              <Link to="/buyer/products">View all products</Link>
            </Button>
          }
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Recommended for you"
          title="Experts you may love"
          description="Swipe through professionals whose work matches what you have been browsing."
        />
        <div className="rail">
          {services.map((s) => (
            <article key={s.id} className="surface hover-lift w-[19rem] p-6">
              <div className="flex items-center gap-4">
                <img
                  src={s.image}
                  alt={s.seller}
                  loading="lazy"
                  className="size-16 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold">{s.seller}</p>
                  <p className="text-sm text-muted-foreground">{s.sellerAge}</p>
                  <Stars rating={s.rating} reviews={s.reviews} className="mt-1" />
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-[0.95rem] text-muted-foreground">{s.title}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <VerifiedBadge />
                <Button asChild size="sm" variant="secondary">
                  <Link to="/buyer/service/$id" params={{ id: s.id }}>
                    View
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-raised flex flex-col items-start gap-6 bg-primary-soft p-8 lg:flex-row lg:items-center lg:p-12">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
          <MapPin className="size-7" aria-hidden />
        </span>
        <div>
          <h2 className="text-3xl">Nearby opportunities</h2>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            Eleven sellers within 3 km are open for bookings this week — including two tiffin
            kitchens and a retired chartered accountant offering tax consultations.
          </p>
        </div>
        <Button asChild size="lg" className="press lg:ml-auto">
          <Link to="/buyer/services">See what's close by</Link>
        </Button>
      </section>
    </div>
  );
}
