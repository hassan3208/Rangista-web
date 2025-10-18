import type { CartItem } from "@/context/CartContext";

export function cartKeyForUser(userId: string) {
  return `rangista_cart_${userId}`;
}

export function readUserCart(userId: string): CartItem[] {
  try {
    // const raw = localStorage.getItem(cartKeyForUser(userId));
    const raw = sessionStorage.getItem(cartKeyForUser(userId));
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeUserCart(userId: string, items: CartItem[]) {
  // localStorage.setItem(cartKeyForUser(userId), JSON.stringify(items));
  sessionStorage.setItem(cartKeyForUser(userId), JSON.stringify(items));
  try {
    window.dispatchEvent(new CustomEvent("cart:change", { detail: { userId } }));
  } catch {}
}

import { adjustStock } from "./stock";

export function removeItemFromUserCart(userId: string, id: string, size?: string) {
  const current = readUserCart(userId);
  const willRemove = (i: CartItem) => {
    if (i.id !== id) return false;
    if (size === undefined) return true;
    return i.size === size;
  };
  const removedQty = current.reduce((sum, i) => (willRemove(i) ? sum + (i.qty ?? 0) : sum), 0);
  const items = current.filter((i) => !willRemove(i));
  if (removedQty > 0) adjustStock(id, removedQty, size as any);
  writeUserCart(userId, items);
  return items;
}
