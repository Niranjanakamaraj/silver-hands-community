import { useSyncExternalStore } from "react";

type State = { favorites: string[]; cart: string[] };

let state: State = { favorites: [], cart: [] };
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function toggleFavorite(id: string) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((f) => f !== id)
    : [...state.favorites, id];
  emit();
}

export function addToCart(id: string) {
  state.cart = [...state.cart, id];
  emit();
}

export function useMarketState(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}
