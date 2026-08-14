import { createFileRoute } from "@tanstack/react-router";

import { AppShell, type NavItem } from "@/components/AppShell";

const nav: NavItem[] = [
  { label: "Home", to: "/buyer" },
  { label: "Explore Services", to: "/buyer/services" },
  { label: "Explore Products", to: "/buyer/products" },
  { label: "Favorites", to: "/buyer/favorites" },
  { label: "Messages", to: "/buyer/messages" },
  { label: "Profile", to: "/buyer/profile" },
];

export const Route = createFileRoute("/buyer")({
  component: () => <AppShell nav={nav} mode="Buyer" />,
});
