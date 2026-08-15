import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  ShoppingBag,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Users,
  MapPin,
  HeartHandshake,
  Search,
  MessageSquare,
  Wallet,
  Star,
  Sparkles,
  Scale,
  Lock,
  Clock,
  Landmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";
import hero from "@/assets/hero.jpg";
import food from "@/assets/cat-food.jpg";
import tutoring from "@/assets/cat-tutoring.jpg";
import craft from "@/assets/cat-craft.jpg";

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

const trust = [
  { icon: Users, stat: "4,200+", label: "Active Sellers" },
  { icon: HeartHandshake, stat: "12,500+", label: "Customers Served" },
  { icon: MapPin, stat: "38", label: "Cities Covered" },
  { icon: BadgeCheck, stat: "100%", label: "Verified Profiles" },
  { icon: ShieldCheck, stat: "Secure", label: "Transactions" },
];

const steps = [
  { icon: Search, title: "Discover Skills", text: "Browse AI-curated services, products and mentors from people near you." },
  { icon: MessageSquare, title: "Connect with Customers", text: "Message directly, agree on timings and confirm the details together." },
  { icon: Wallet, title: "Earn Income", text: "Get paid securely after every completed order or session." },
  { icon: Star, title: "Build Reputation", text: "Collect reviews that turn a lifetime of practice into steady demand." },
];

const stories = [
  {
    name: "Lakshmi Devi",
    role: "Former Homemaker",
    text: "Now earns ₹12,000/month selling homemade snacks.",
    image: food,
  },
  {
    name: "Raman Sir",
    role: "Retired Teacher",
    text: "Conducts online mathematics tutoring for Class 8–12 students.",
    image: tutoring,
  },
  {
    name: "Kamala Devi",
    role: "Traditional Artisan",
    text: "Sells handmade embroidery products across 12 cities.",
    image: craft,
  },
];

const benefits = [
  { icon: Sparkles, title: "AI-powered recommendations", text: "Hansa AI matches every listing with the buyers most likely to need it." },
  { icon: Scale, title: "Fair opportunity distribution", text: "New sellers get visibility too — reach is never bought, only earned." },
  { icon: HeartHandshake, title: "Trusted community", text: "Every profile is verified, with reviews from real completed orders." },
  { icon: Lock, title: "Secure messaging", text: "Talk to buyers and sellers without ever sharing a personal number." },
  { icon: Clock, title: "Flexible work opportunities", text: "Choose your own hours, batch sizes and delivery days." },
  { icon: Landmark, title: "Support for traditional skills", text: "Handloom, embroidery, classical music and regional cooking find buyers here." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex h-24 max-w-7xl items-center px-6 lg:px-10">
        <span className="font-display text-2xl font-semibold tracking-tight">SilverHands</span>
        <Button asChild variant="outline" size="sm" className="ml-auto">
          <Link to="/login">Sign in</Link>
        </Button>
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

          <div className="overflow-hidden rounded-xl shadow-lift">
            <img
              src={hero}
              alt="An older woman preparing dough beside handmade linen keepsakes on a sunlit table"
              width={1408}
              height={1008}
              className="size-full object-cover"
            />
          </div>
        </section>

        <section aria-label="Why people trust SilverHands" className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {trust.map(({ icon: Icon, stat, label }) => (
            <div key={label} className="surface flex flex-col gap-2 p-6">
              <Icon className="size-6 text-accent" aria-hidden />
              <p className="font-display text-3xl leading-none">{stat}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>

        <section aria-label="Choose how you want to begin" className="mt-20 grid gap-7 md:grid-cols-2">
          {cards.map(({ icon: Icon, role, description, cta, to }) => (
            <div key={role} className="surface hover-lift flex flex-col gap-6 p-9 lg:p-12">
              <span className="grid size-16 place-items-center rounded-xl bg-primary-soft text-primary">
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

        <section className="mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Simple by design</p>
          <h2 className="mt-2 text-4xl">How SilverHands Works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="surface hover-lift flex flex-col gap-4 p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="font-display text-3xl text-border">0{i + 1}</span>
                </div>
                <h3 className="text-2xl">{title}</h3>
                <p className="text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Real earnings</p>
          <h2 className="mt-2 text-4xl">Featured Success Stories</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {stories.map((s) => (
              <article key={s.name} className="surface hover-lift overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.name}, ${s.role}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-7">
                  <h3 className="text-2xl">{s.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                    {s.role}
                  </p>
                  <p className="text-muted-foreground">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The difference</p>
          <h2 className="mt-2 text-4xl">Why Choose SilverHands</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="surface flex gap-4 p-7">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-20 text-center text-sm text-muted-foreground">
          Over 4,200 sellers across 38 cities · Average seller age 61
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
