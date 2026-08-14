import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ShoppingBag, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SilverHands — Turn Skills Into Opportunities" },
      {
        name: "description",
        content:
          "An AI-powered marketplace connecting senior citizens and homemakers with customers seeking trusted services, handmade products and mentorship.",
      },
      { property: "og:title", content: "SilverHands — Turn Skills Into Opportunities" },
      {
        property: "og:description",
        content:
          "Discover trusted local services and handmade goods, or offer your own skills on SilverHands.",
      },
    ],
  }),
  component: Landing,
});

const cards = [
  {
    icon: ShoppingBag,
    role: "Buyer",
    description: "Discover trusted local services, handmade products, mentors, and experts.",
    cta: "Continue as Buyer",
    to: "/buyer",
  },
  {
    icon: Briefcase,
    role: "Seller",
    description: "Offer your skills, products, knowledge, and services to customers.",
    cta: "Continue as Seller",
    to: "/seller",
  },
] as const;

function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex h-24 max-w-7xl items-center px-6 lg:px-10">
        <span className="font-display text-2xl font-semibold tracking-tight">SilverHands</span>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <section className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="rise-in">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              An AI-powered livelihood marketplace
            </p>
            <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Turn Skills Into Opportunities
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground lg:text-xl">
              Empowering senior citizens and homemakers through AI-powered livelihood
              opportunities.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={hero}
              alt="An older woman preparing dough beside handmade linen keepsakes on a sunlit table"
              width={1408}
              height={1008}
              className="size-full object-cover"
            />
          </div>
        </section>

        <section aria-label="Choose how you want to begin" className="mt-20 grid gap-7 md:grid-cols-2">
          {cards.map(({ icon: Icon, role, description, cta, to }) => (
            <div key={role} className="surface hover-lift flex flex-col gap-6 p-9 lg:p-12">
              <span className="grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-8" aria-hidden />
              </span>
              <div>
                <h2 className="text-4xl">{role}</h2>
                <p className="mt-3 text-lg text-muted-foreground">{description}</p>
              </div>
              <Button asChild size="xl" variant={role === "Seller" ? "gold" : "default"} className="mt-2 w-full">
                <Link to={to}>
                  {cta} <ArrowRight />
                </Link>
              </Button>
            </div>
          ))}
        </section>

        <p className="mt-14 text-center text-sm text-muted-foreground">
          Over 4,200 sellers across 38 cities · Average seller age 61
        </p>
      </main>
    </div>
  );
}
