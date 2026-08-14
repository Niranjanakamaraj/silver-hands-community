import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  ClipboardList,
  MessageCircle,
  BarChart3,
  User,
} from "lucide-react";

import { AppShell, type NavItem } from "@/components/AppShell";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/seller", icon: LayoutDashboard, short: "Home" },
  { label: "My Products", to: "/seller/products", icon: Package, short: "Products" },
  { label: "My Services", to: "/seller/services", icon: Briefcase, short: "Services" },
  { label: "Orders", to: "/seller/orders", icon: ClipboardList },
  { label: "Messages", to: "/seller/messages", icon: MessageCircle, short: "Chats" },
  { label: "Analytics", to: "/seller/analytics", icon: BarChart3 },
  { label: "Profile", to: "/seller/profile", icon: User },
];

export const Route = createFileRoute("/seller")({
  component: () => <AppShell nav={nav} mode="Seller" />,
});
