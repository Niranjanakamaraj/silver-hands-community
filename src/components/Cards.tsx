import { Link } from "@tanstack/react-router";
import { Heart, MapPin, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Stars } from "@/components/Stars";
import { VerifiedBadge } from "@/components/Trust";
import { inr, type Product, type Service } from "@/lib/data";
import { addToCart, toggleFavorite, useMarketState } from "@/lib/store";
import { cn } from "@/lib/utils";

function FavButton({ id, label }: { id: string; label: string }) {
  const { favorites } = useMarketState();
  const fav = favorites.includes(id);
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(id)}
      aria-pressed={fav}
      aria-label={fav ? `Remove ${label} from favorites` : `Save ${label} to favorites`}
      className="glass press absolute right-3 top-3 grid size-12 place-items-center rounded-full shadow-soft transition-colors hover:bg-card"
    >
      <Heart
        className={cn(
          "size-5 transition-transform duration-300",
          fav ? "scale-110 fill-accent text-accent" : "text-foreground",
        )}
      />
    </button>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="surface hover-lift group flex flex-col overflow-hidden">
      <div className="relative">
        <Link
          to="/buyer/service/$id"
          params={{ id: service.id }}
          className="block aspect-[4/3] overflow-hidden"
        >
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
        </Link>
        <FavButton id={service.id} label={service.title} />
        <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <Link
          to="/buyer/service/$id"
          params={{ id: service.id }}
          className="text-xl leading-snug font-semibold transition-colors hover:text-primary"
        >
          {service.title}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[0.95rem] text-muted-foreground">
            {service.seller} · {service.sellerAge}
          </p>
          <VerifiedBadge />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Stars rating={service.rating} reviews={service.reviews} />
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {service.location}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-xl font-semibold">
            {inr(service.price)}{" "}
            <span className="text-sm font-normal text-muted-foreground">{service.unit}</span>
          </p>
          <Button asChild variant="gold" className="press">
            <Link to="/buyer/service/$id" params={{ id: service.id }}>
              Book
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="surface hover-lift group flex flex-col overflow-hidden">
      <div className="relative">
        <Link
          to="/buyer/product/$id"
          params={{ id: product.id }}
          className="block aspect-square overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </Link>
        <FavButton id={product.id} label={product.name} />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <Link
          to="/buyer/product/$id"
          params={{ id: product.id }}
          className="text-lg leading-snug font-semibold transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground">by {product.seller}</p>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-xl font-semibold">{inr(product.price)}</p>
          <Button
            variant="outline"
            className="press"
            onClick={() => {
              addToCart(product.id);
              toast.success("Added to cart", { description: product.name });
            }}
          >
            <ShoppingBag /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        )}
        <h2 className="mt-2 text-3xl md:text-4xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="surface gradient-olive flex flex-col items-center gap-5 px-6 py-20 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-card text-primary shadow-soft">
        <Icon className="size-8" aria-hidden />
      </span>
      <h3 className="text-2xl md:text-3xl">{title}</h3>
      <p className="max-w-md text-lg text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
