import { useSyncExternalStore } from "react";

import {
  products as seedProducts,
  services as seedServices,
  seedCart,
  seedConversations,
  seedFavorites,
  seedOrders,
  seedReviews,
  type Conversation,
  type Order,
  type Product,
  type Review,
  type Service,
} from "@/lib/data";

export type CartLine = { id: string; qty: number };
export type Session = { email: string; name: string; role: "buyer" | "seller" } | null;

export type State = {
  favorites: string[];
  cart: CartLine[];
  session: Session;
  reviews: Review[];
  conversations: Conversation[];
  products: Product[];
  services: Service[];
  orders: Order[];
  hydrated: boolean;
};

const initial: State = {
  favorites: seedFavorites,
  cart: seedCart,
  session: null,
  reviews: seedReviews,
  conversations: seedConversations,
  products: seedProducts,
  services: seedServices,
  orders: seedOrders,
  hydrated: false,
};

let state: State = initial;
const listeners = new Set<() => void>();

const KEY = "silverhands-state-v1";

function persist() {
  if (typeof window === "undefined") return;
  try {
    const { hydrated: _h, ...rest } = state;
    window.localStorage.setItem(KEY, JSON.stringify(rest));
  } catch {
    /* storage unavailable — demo continues in memory */
  }
}

function set(patch: Partial<State>, save = true) {
  state = { ...state, ...patch };
  if (save) persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => void listeners.delete(l);
}

/** Called once on the client after mount so SSR and first render match. */
export function hydrateStore() {
  if (state.hydrated || typeof window === "undefined") return;
  let stored: Partial<State> = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Partial<State>;
  } catch {
    stored = {};
  }
  set({ ...stored, hydrated: true }, false);
}

/* ------------------------------ Favorites ------------------------- */

export function toggleFavorite(id: string) {
  set({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((f) => f !== id)
      : [...state.favorites, id],
  });
}

/* -------------------------------- Cart ---------------------------- */

export function addToCart(id: string, qty = 1) {
  const existing = state.cart.find((l) => l.id === id);
  set({
    cart: existing
      ? state.cart.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
      : [...state.cart, { id, qty }],
  });
}

export function setCartQty(id: string, qty: number) {
  set({
    cart:
      qty <= 0
        ? state.cart.filter((l) => l.id !== id)
        : state.cart.map((l) => (l.id === id ? { ...l, qty } : l)),
  });
}

export function removeFromCart(id: string) {
  set({ cart: state.cart.filter((l) => l.id !== id) });
}

export function clearCart() {
  set({ cart: [] });
}

export function checkout() {
  const lines = state.cart
    .map((l) => ({ line: l, product: state.products.find((p) => p.id === l.id) }))
    .filter((x) => x.product);
  const total = lines.reduce((sum, x) => sum + (x.product?.price ?? 0) * x.line.qty, 0);
  const order: Order = {
    id: `SH-${1100 + state.orders.length}`,
    buyer: state.session?.name ?? "Guest buyer",
    item:
      lines.length > 1
        ? `${lines[0]?.product?.name} + ${lines.length - 1} more`
        : (lines[0]?.product?.name ?? "Order"),
    amount: total,
    status: "Placed",
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
  };
  set({ orders: [order, ...state.orders], cart: [] });
  return order;
}

/* ------------------------------- Auth ----------------------------- */

const DEMO_USERS = [
  { email: "buyer@silverhands.com", password: "password123", name: "Priya Menon", role: "buyer" as const },
  { email: "seller@silverhands.com", password: "password123", name: "Anjali Sen", role: "seller" as const },
];

export function signIn(email: string, password: string) {
  const user = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );
  if (!user) return null;
  const session: Session = { email: user.email, name: user.name, role: user.role };
  set({ session });
  return session;
}

export function signOut() {
  set({ session: null });
}

/* ------------------------------ Reviews --------------------------- */

export function addReview(targetId: string, rating: number, text: string, author: string) {
  const review: Review = {
    id: `r-${Date.now()}`,
    targetId,
    author,
    rating,
    text,
    date: "Just now",
  };
  set({ reviews: [review, ...state.reviews] });
}

export function updateReview(id: string, rating: number, text: string) {
  set({ reviews: state.reviews.map((r) => (r.id === id ? { ...r, rating, text } : r)) });
}

export function deleteReview(id: string) {
  set({ reviews: state.reviews.filter((r) => r.id !== id) });
}

export function reviewsFor(reviews: Review[], targetId: string) {
  return reviews.filter((r) => r.targetId === targetId);
}

export function ratingFor(reviews: Review[], targetId: string, fallback: number) {
  const list = reviewsFor(reviews, targetId);
  if (!list.length) return fallback;
  return Number((list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1));
}

/* --------------------------- Seller listings ---------------------- */

export function saveProduct(product: Product) {
  const exists = state.products.some((p) => p.id === product.id);
  set({
    products: exists
      ? state.products.map((p) => (p.id === product.id ? product : p))
      : [product, ...state.products],
  });
}

export function deleteProduct(id: string) {
  set({ products: state.products.filter((p) => p.id !== id) });
}

export function saveService(service: Service) {
  const exists = state.services.some((s) => s.id === service.id);
  set({
    services: exists
      ? state.services.map((s) => (s.id === service.id ? service : s))
      : [service, ...state.services],
  });
}

export function deleteService(id: string) {
  set({ services: state.services.filter((s) => s.id !== id) });
}

/* ---------------------------- Conversations ----------------------- */

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function sendMessage(conversationId: string, from: "buyer" | "seller", text: string) {
  set({
    conversations: state.conversations.map((c) =>
      c.id === conversationId
        ? { ...c, messages: [...c.messages, { id: `${c.id}m${c.messages.length + 1}`, from, text, time: now() }] }
        : c,
    ),
  });
}

/** Opens (or reuses) a conversation with a seller and returns its id. */
export function startConversation(sellerId: string, buyerName: string, text?: string) {
  const existing = state.conversations.find((c) => c.sellerId === sellerId);
  if (existing) {
    if (text) sendMessage(existing.id, "buyer", text);
    return existing.id;
  }
  const id = `c-${Date.now()}`;
  const convo: Conversation = {
    id,
    sellerId,
    buyerName,
    messages: text ? [{ id: `${id}m1`, from: "buyer", text, time: now() }] : [],
  };
  set({ conversations: [convo, ...state.conversations] });
  return id;
}

export function useMarketState(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
}
