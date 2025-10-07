// import { PRODUCTS } from "@/data/products";

// export type PriceBySize = Record<string, number>;
// export type CatalogProduct = {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   sizes: string[];
//   collection: string;
//   priceBySize: PriceBySize; // S/M/L/Kids
//   rating: number;
//   reviews: number;
// };

// const LS_CATALOG = "rangista_catalog";
// const LS_COLLECTIONS = "rangista_collections";

// function readJSON<T>(key: string, fallback: T): T {
//   try {
//     const raw = localStorage.getItem(key);
//     return raw ? (JSON.parse(raw) as T) : fallback;
//   } catch {
//     return fallback;
//   }
// }

// function writeJSON<T>(key: string, value: T) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// function seedPriceBySize(base: number, sizes: string[]): PriceBySize {
//   const map: PriceBySize = {};
//   for (const s of sizes) {
//     if (s.toLowerCase() === "kids") map[s] = Math.max(0, base - 500);
//     else if (s === "M") map[s] = base + 300;
//     else if (s === "L") map[s] = base + 600;
//     else map[s] = base;
//   }
//   return map;
// }

// function ensureCatalogInitialized() {
//   const existing = readJSON<CatalogProduct[]>(LS_CATALOG, []);
//   if (existing.length > 0) return;
//   const seeded: CatalogProduct[] = PRODUCTS.map((p) => ({
//     id: p.id,
//     name: p.name,
//     description: "Hand-painted artistry with durable fabric.",
//     image: p.image,
//     sizes: p.sizes,
//     collection: p.collection,
//     priceBySize: seedPriceBySize(p.price, p.sizes),
//     rating: p.rating,
//     reviews: p.reviews,
//   }));
//   writeJSON(LS_CATALOG, seeded);
//   const collections = Array.from(
//     new Set(seeded.map((p) => p.collection))
//   );
//   writeJSON(LS_COLLECTIONS, collections);
// }

// export function getProducts(): CatalogProduct[] {
//   ensureCatalogInitialized();
//   return readJSON<CatalogProduct[]>(LS_CATALOG, []);
// }

// export function getProduct(id: string): CatalogProduct | undefined {
//   return getProducts().find((p) => p.id === id);
// }

// export function upsertProduct(prod: CatalogProduct) {
//   const list = getProducts();
//   const idx = list.findIndex((p) => p.id === prod.id);
//   if (idx >= 0) list[idx] = prod; else list.push(prod);
//   writeJSON(LS_CATALOG, list);
// }

// export function deleteProduct(id: string) {
//   const list = getProducts().filter((p) => p.id !== id);
//   writeJSON(LS_CATALOG, list);
// }

// export function getCollections(): string[] {
//   ensureCatalogInitialized();
//   return readJSON<string[]>(LS_COLLECTIONS, []);
// }

// export function addCollection(name: string) {
//   const cols = Array.from(new Set([...
//     getCollections(), name
//   ].filter(Boolean)));
//   writeJSON(LS_COLLECTIONS, cols);
// }



import { PRODUCTS } from "@/data/products";

export type PriceBySize = Record<string, number>;
export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[]; // Optional gallery
  sizes: string[];
  collection: string;
  priceBySize: PriceBySize; // S/M/L/Kids
  rating: number;
  reviews: number;
};

export function getMinimumPrice(product: CatalogProduct): number {
  const values = Object.values(product.priceBySize ?? {}).filter(
    (value): value is number => typeof value === "number" && Number.isFinite(value)
  );
  return values.length > 0 ? Math.min(...values) : product.priceBySize?.[product.sizes[0]] ?? 0;
}

const LS_CATALOG = "rangista_catalog";
const LS_COLLECTIONS = "rangista_collections";
const BASE_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p] as const));

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function seedPriceBySize(base: number, sizes: string[]): PriceBySize {
  const map: PriceBySize = {};
  for (const s of sizes) {
    if (s.toLowerCase() === "kids") map[s] = Math.max(0, base - 500);
    else if (s === "M") map[s] = base + 300;
    else if (s === "L") map[s] = base + 600;
    else map[s] = base;
  }
  return map;
}

function normalizePriceBySize(base: { price: number; sizes: string[] }, existing?: PriceBySize): PriceBySize {
  const seeded = seedPriceBySize(base.price, base.sizes);
  if (!existing) {
    return seeded;
  }
  const normalized: PriceBySize = {};
  for (const size of base.sizes) {
    const value = existing[size];
    normalized[size] = typeof value === "number" && Number.isFinite(value) && value > 0 ? value : seeded[size];
  }
  return normalized;
}

function ensureCatalogInitialized() {
  const existing = readJSON<CatalogProduct[]>(LS_CATALOG, []);
  if (existing.length > 0) return;
  const seeded: CatalogProduct[] = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    description: "Hand-painted artistry with durable fabric.",
    image: p.image,
    images: p.images ?? [p.image],
    sizes: p.sizes,
    collection: p.collection,
    priceBySize: seedPriceBySize(p.price, p.sizes),
    rating: p.rating,
    reviews: p.reviews,
  }));
  writeJSON(LS_CATALOG, seeded);
  const collections = Array.from(
    new Set(seeded.map((p) => p.collection))
  );
  writeJSON(LS_COLLECTIONS, collections);
}

function migrateCatalog() {
  const current = readJSON<CatalogProduct[]>(LS_CATALOG, []);
  const byId = BASE_BY_ID;
  let changed = false;
  const next = current.map((item) => {
    const base = byId.get(item.id);
    if (!base) return item;

    const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
    const image = item.image || images[0];
    const normalizedPrice = normalizePriceBySize({ price: base.price, sizes: base.sizes }, item.priceBySize);
    const priceBySizeChanged =
      !item.priceBySize ||
      base.sizes.some((size) => normalizedPrice[size] !== item.priceBySize?.[size]);
    const priceBySize = priceBySizeChanged ? normalizedPrice : item.priceBySize;
    const sizesChanged = JSON.stringify(item.sizes) !== JSON.stringify(base.sizes);
    const sizes = sizesChanged ? base.sizes : item.sizes;
    const nameChanged = item.name !== base.name;
    const collectionChanged = item.collection !== base.collection;
    const description = item.description || "Hand-painted artistry with durable fabric.";

    if (
      images !== item.images ||
      image !== item.image ||
      priceBySizeChanged ||
      sizesChanged ||
      nameChanged ||
      collectionChanged ||
      description !== item.description
    ) {
      changed = true;
      return {
        ...item,
        images,
        image,
        priceBySize,
        sizes,
        name: base.name,
        collection: base.collection,
        description,
      };
    }

    return item;
  });
  if (changed) writeJSON(LS_CATALOG, next);
}

function mergeWithBase(item: CatalogProduct): CatalogProduct {
  const base = BASE_BY_ID.get(item.id);
  if (!base) return item;

  const priceBySize = normalizePriceBySize({ price: base.price, sizes: base.sizes }, item.priceBySize);
  const sizes = JSON.stringify(item.sizes) === JSON.stringify(base.sizes) ? item.sizes : base.sizes;
  const name = item.name === base.name ? item.name : base.name;
  const collection = item.collection === base.collection ? item.collection : base.collection;
  const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
  const image = item.image || images[0];

  return {
    ...item,
    priceBySize,
    sizes,
    name,
    collection,
    images,
    image,
  };
}

export function getProducts(): CatalogProduct[] {
  ensureCatalogInitialized();
  migrateCatalog();
  const stored = readJSON<CatalogProduct[]>(LS_CATALOG, []);
  return stored.map(mergeWithBase);
}

export function getProduct(id: string): CatalogProduct | undefined {
  return getProducts().find((p) => p.id === id);
}

export function upsertProduct(prod: CatalogProduct) {
  const list = getProducts();
  const idx = list.findIndex((p) => p.id === prod.id);
  if (idx >= 0) list[idx] = prod; else list.push(prod);
  writeJSON(LS_CATALOG, list);
}

export function deleteProduct(id: string) {
  const list = getProducts().filter((p) => p.id !== id);
  writeJSON(LS_CATALOG, list);
}

export function getCollections(): string[] {
  ensureCatalogInitialized();
  return readJSON<string[]>(LS_COLLECTIONS, []);
}

export function addCollection(name: string) {
  const cols = Array.from(new Set([...
    getCollections(), name
  ].filter(Boolean)));
  writeJSON(LS_COLLECTIONS, cols);
}
