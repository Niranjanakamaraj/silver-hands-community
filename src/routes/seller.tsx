import { createFileRoute } from "@tanstack/react-router";

import { AppShell, type NavItem } from "@/components/AppShell";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/seller" },
  { label: "My Products", to: "/seller/products" },
  { label: "My Services", to: "/seller/services" },
  { label: "Orders", to: "/seller/orders" },
  { label: "Messages", to: "/seller/messages" },
  { label: "Analytics", to: "/seller/analytics" },
  { label: "Profile", to: "/seller/profile" },
];

export const Route = createFileRoute("/seller")({
  component: () => <AppShell nav={nav} mode="Seller" />,
});
