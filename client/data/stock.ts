import { PRODUCTS } from "./products";

const LS_STOCK = "rangista_stock";

export type SizeKey = "S" | "M" | "L" | "Kids";
export type SizeStock = { S: number; M: number; L: number; kids: boolean };

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

function seedFromString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

function seededRand(min: number, max: number, seed: number): number {
  let x = seed || 123456789;
  x = (1664525 * x + 1013904223) % 0xffffffff;
  const r = x / 0xffffffff;
  return Math.floor(min + r * (max - min + 1));
}

function ensureInitialized(): StockMap {
  const map = readStock();
  let changed = false;
  for (const p of PRODUCTS) {
    const cur: any = (map as any)[p.id];
    if (cur == null) {
      const seed = seedFromString(p.id);
      const hasKids = p.sizes.includes("Kids");
      (map as any)[p.id] = {
        S: p.sizes.includes("S") ? Math.max(0, seededRand(3, 20, seed + 1)) : 0,
        M: p.sizes.includes("M") ? Math.max(0, seededRand(3, 20, seed + 2)) : 0,
        L: p.sizes.includes("L") ? Math.max(0, seededRand(3, 20, seed + 3)) : 0,
        kids: hasKids,
      } as SizeStock;
      changed = true;
    } else if (typeof cur === "number") {
      const hasKids = p.sizes.includes("Kids");
      (map as any)[p.id] = {
        S: p.sizes.includes("S") ? Math.max(0, Math.floor(cur)) : 0,
        M: 0,
        L: 0,
        kids: hasKids,
      } as SizeStock;
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
  if (!entry) return 0;
  if (size === "S") return entry.S ?? 0;
  if (size === "M") return entry.M ?? 0;
  if (size === "L") return entry.L ?? 0;
  if (size === "Kids") return entry.kids ? 9999 : 0; // treat kids as boolean availability
  // aggregated stock (exclude kids boolean)
  return (entry.S ?? 0) + (entry.M ?? 0) + (entry.L ?? 0);
}

export function setStock(id: string, size: Exclude<SizeKey, "Kids">, qty: number) {
  const map = ensureInitialized();
  const entry = map[id] ?? { S: 0, M: 0, L: 0, kids: false };
  entry[size] = Math.max(0, Math.floor(qty));
  map[id] = entry;
  writeStock(map);
}

export function setKidsAvailable(id: string, available: boolean) {
  const map = ensureInitialized();
  const entry = map[id] ?? { S: 0, M: 0, L: 0, kids: false };
  entry.kids = !!available;
  map[id] = entry;
  writeStock(map);
}

export function adjustStock(id: string, delta: number, size?: SizeKey) {
  const map = ensureInitialized();
  const entry = map[id] ?? { S: 0, M: 0, L: 0, kids: false };
  if (size === "Kids") {
    // kids availability doesn't change with qty
    writeStock(map);
    return;
  }
  if (size === "S" || size === "M" || size === "L") {
    entry[size] = Math.max(0, (entry[size] ?? 0) + delta);
    map[id] = entry;
    writeStock(map);
    return;
  }
  // size not specified: distribute across S->M->L for negative; add to S for positive
  if (delta >= 0) {
    entry.S = Math.max(0, (entry.S ?? 0) + delta);
  } else {
    let remaining = -delta;
    const consume = (k: Exclude<SizeKey, "Kids">) => {
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
    const seed = seedFromString(p.id + Date.now().toString());
    const hasKids = p.sizes.includes("Kids");
    map[p.id] = {
      S: p.sizes.includes("S") ? Math.max(0, seededRand(3, 20, seed + 1)) : 0,
      M: p.sizes.includes("M") ? Math.max(0, seededRand(3, 20, seed + 2)) : 0,
      L: p.sizes.includes("L") ? Math.max(0, seededRand(3, 20, seed + 3)) : 0,
      kids: hasKids,
    };
  }
  writeStock(map);
}
