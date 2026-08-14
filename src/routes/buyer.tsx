import { createFileRoute } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Heart, MessageCircle, User } from "lucide-react";

import { AppShell, type NavItem } from "@/components/AppShell";

const nav: NavItem[] = [
  { label: "Home", to: "/buyer", icon: Home },
  { label: "Explore Services", to: "/buyer/services", icon: Search, short: "Services" },
  { label: "Explore Products", to: "/buyer/products", icon: ShoppingBag, short: "Products" },
  { label: "Favorites", to: "/buyer/favorites", icon: Heart, short: "Saved" },
  { label: "Messages", to: "/buyer/messages", icon: MessageCircle, short: "Chats" },
  { label: "Profile", to: "/buyer/profile", icon: User },
];

export const Route = createFileRoute("/buyer")({
  component: () => <AppShell nav={nav} mode="Buyer" />,
});
