import { PRODUCTS } from "./products";

const LS_STOCK = "rangista_stock";

export type SizeKey = "S" | "M" | "L" | "Kids";
export type SizeStock = { S: number; M: number; L: number };

type StockMap = Record<string, SizeStock>;

function readStock(): StockMap {
  try {
    const raw = localStorage.getItem(LS_STOCK);
    if (!raw) return {};
    return JSON.parse(raw) as StockMap;
  } catch {
    return {};
  }
}

function writeStock(map: StockMap) {
  localStorage.setItem(LS_STOCK, JSON.stringify(map));
  try {
    window.dispatchEvent(new CustomEvent("stock:change"));
  } catch {}
}

function ensureInitialized(): StockMap {
  const map = readStock();
  let changed = false;
  for (const p of PRODUCTS) {
    const cur: SizeStock | undefined = map[p.id];
    if (cur == null || cur.S !== p.S_stock || cur.M !== p.M_stock || cur.L !== p.L_stock) {
      map[p.id] = {
        S: p.S_stock,
        M: p.M_stock,
        L: p.L_stock,
      };
      changed = true;
    }
  }
  if (changed) writeStock(map);
  return map;
}

export function getAllStocks(): StockMap {
  return ensureInitialized();
}

export function getStock(id: string, size?: SizeKey): number {
  const map = ensureInitialized();
  const entry = map[id];
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return 0;
  if (!entry) {
    if (size === "S") return product.S_stock;
    if (size === "M") return product.M_stock;
    if (size === "L") return product.L_stock;
    if (size === "Kids") return product.kids ? 9999 : 0;
    return product.S_stock + product.M_stock + product.L_stock;
  }
  if (size === "S") return entry.S;
  if (size === "M") return entry.M;
  if (size === "L") return entry.L;
  if (size === "Kids") return product.kids ? 9999 : 0;
  return entry.S + entry.M + entry.L;
}

export function setStock(id: string, size: Exclude<SizeKey, "Kids">, qty: number) {
  const map = ensureInitialized();
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  if ((size === "S" && product.S_stock === 0) || (size === "M" && product.M_stock === 0) || (size === "L" && product.L_stock === 0)) {
    return;
  }
  const entry = map[id] ?? { S: product.S_stock, M: product.M_stock, L: product.L_stock };
  entry[size] = Math.max(0, Math.floor(qty));
  map[id] = entry;
  writeStock(map);
}

export function setKidsAvailable(id: string, available: boolean) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (product) {
    product.kids = available;
    try {
      window.dispatchEvent(new CustomEvent("products:change"));
    } catch {}
  }
}

export function adjustStock(id: string, delta: number, size?: SizeKey) {
  const map = ensureInitialized();
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const entry = map[id] ?? { S: product.S_stock, M: product.M_stock, L: product.L_stock };
  if (size === "Kids") {
    setKidsAvailable(id, delta > 0);
    return;
  }
  if (size === "S" || size === "M" || size === "L") {
    if ((size === "S" && product.S_stock === 0) || (size === "M" && product.M_stock === 0) || (size === "L" && product.L_stock === 0)) {
      return;
    }
    entry[size] = Math.max(0, (entry[size] ?? 0) + delta);
    map[id] = entry;
    writeStock(map);
    return;
  }
  if (delta >= 0) {
    if (product.S_stock > 0) {
      entry.S = Math.max(0, (entry.S ?? 0) + delta);
    } else if (product.M_stock > 0) {
      entry.M = Math.max(0, (entry.M ?? 0) + delta);
    } else if (product.L_stock > 0) {
      entry.L = Math.max(0, (entry.L ?? 0) + delta);
    }
  } else {
    let remaining = -delta;
    const consume = (k: Exclude<SizeKey, "Kids">) => {
      if ((k === "S" && product.S_stock === 0) || (k === "M" && product.M_stock === 0) || (k === "L" && product.L_stock === 0)) return;
      const take = Math.min(remaining, entry[k] ?? 0);
      entry[k] = Math.max(0, (entry[k] ?? 0) - take);
      remaining -= take;
    };
    consume("S");
    if (remaining > 0) consume("M");
    if (remaining > 0) consume("L");
  }
  map[id] = entry;
  writeStock(map);
}

export function resetStocksRandom() {
  const map: StockMap = {};
  for (const p of PRODUCTS) {
    map[p.id] = {
      S: p.S_stock,
      M: p.M_stock,
      L: p.L_stock,
    };
  }
  writeStock(map);
}