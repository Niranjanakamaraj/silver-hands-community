import { createFileRoute } from "@tanstack/react-router";

import { ProductCard, SectionHeading } from "@/components/Cards";
import { products } from "@/lib/data";

export const Route = createFileRoute("/buyer/products")({
  head: () => ({
    meta: [
      { title: "Handmade products | SilverHands" },
      {
        name: "description",
        content:
          "Shop handwoven textiles, small-batch preserves, embroidery and terracotta made by senior artisans and homemakers.",
      },
      { property: "og:title", content: "Handmade products | SilverHands" },
      {
        property: "og:description",
        content: "Shop handmade goods made slowly by senior artisans and homemakers.",
      },
    ],
  }),
  component: ExploreProducts,
});

function ExploreProducts() {
  return (
    <div>
      <SectionHeading eyebrow="Explore" title="Handmade products" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
