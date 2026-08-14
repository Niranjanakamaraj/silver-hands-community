import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, IndianRupee, Package, Sparkles, Star, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { inr, products, services } from "@/lib/data";

export const Route = createFileRoute("/seller/")({
  head: () => ({
    meta: [
      { title: "Seller dashboard | SilverHands" },
      {
        name: "description",
        content: "Track earnings, orders, listings and ratings for your SilverHands shop.",
      },
      { property: "og:title", content: "Seller dashboard | SilverHands" },
      { property: "og:description", content: "Track earnings, orders and ratings in one place." },
    ],
  }),
  component: SellerDashboard,
});

const widgets = [
  { icon: IndianRupee, label: "Total earnings", value: inr(184500), sub: "+12% vs last month" },
  { icon: Package, label: "Orders received", value: "126", sub: "8 awaiting dispatch" },
  { icon: TrendingUp, label: "Active listings", value: "14", sub: "3 drafts pending" },
  { icon: Eye, label: "Profile views", value: "3,482", sub: "Last 30 days" },
  { icon: Star, label: "Customer rating", value: "4.9", sub: "From 214 reviews" },
];

function SellerDashboard() {
  const hero = widgets[0]!;
  const rest = widgets.slice(1);

  return (
    <div className="space-y-16">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Good morning, Anjali
          </p>
          <h1 className="mt-2 text-4xl lg:text-5xl">Your shop today</h1>
        </div>
        <Button asChild size="lg" variant="gold" className="press shrink-0">
          <Link to="/seller/products">Add a new listing</Link>
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-raised gradient-olive flex flex-col justify-center gap-6 p-8 lg:col-span-1 lg:self-start lg:p-10">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <hero.icon className="size-7" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{hero.label}</p>
            <p className="mt-1 text-5xl font-semibold tracking-tight lg:text-6xl">{hero.value}</p>
            <p className="mt-3 inline-flex rounded-full bg-card px-3 py-1 text-sm font-semibold text-primary shadow-soft">
              {hero.sub}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {rest.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="surface hover-lift p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="mt-5 text-sm font-medium text-muted-foreground">{label}</p>
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-accent">{sub}</p>
            </div>
          ))}

          <div className="surface flex flex-col justify-between gap-4 bg-primary-soft p-7">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Sparkles className="size-6" aria-hidden />
              </span>
              <p className="mt-5 font-semibold">AI tip of the day</p>
              <p className="text-muted-foreground">
                Adding two more photos to your mango preserve listing could raise conversions by
                about 22%.
              </p>
            </div>
          </div>
        </div>
      </div>


      <section>
        <SectionHeading
          eyebrow="Recent"
          title="Latest orders"
          action={
            <Button asChild variant="outline">
              <Link to="/seller/orders">All orders</Link>
            </Button>
          }
        />
        <div className="surface divide-y divide-border overflow-hidden">
          {products.map((p, i) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 px-6 py-5">
              <img src={p.image} alt="" loading="lazy" className="size-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">Order #SH-10{i + 4} · 2 items</p>
              </div>
              <p className="font-semibold">{inr(p.price)}</p>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                {i % 2 ? "Shipped" : "To dispatch"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Live" title="Your active services" />
        <div className="grid gap-5 md:grid-cols-2">
          {services.slice(0, 2).map((s) => (
            <div key={s.id} className="surface flex gap-4 p-6">
              <img src={s.image} alt="" loading="lazy" className="size-20 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="font-semibold leading-snug">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {inr(s.price)} {s.unit} · {s.reviews} reviews
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
