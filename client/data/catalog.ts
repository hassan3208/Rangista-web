// // import { PRODUCTS } from "@/data/products";

// // export type CatalogProduct = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   image: string;
// //   images?: string[];
// //   collection: string;
// //   total_reviews: number;
// //   average_rating: number;
// //   XS_price: number;
// //   S_price: number;
// //   M_price: number;
// //   L_price: number;
// //   XL_price: number;
// //   XXL_price: number;
// //   XS_stock: number;
// //   S_stock: number;
// //   M_stock: number;
// //   L_stock: number;
// //   XL_stock: number;
// //   XXL_stock: number;
// //   kids: boolean;
// // };

// // export function getMinimumPrice(product: CatalogProduct): number {
// //   const values = [product.XS_price, product.S_price, product.M_price, product.L_price, product.XL_price, product.XXL_price].filter(
// //     (value): value is number => typeof value === "number" && Number.isFinite(value)
// //   );
// //   return values.length > 0 ? Math.min(...values) : product.S_price;
// // }

// // const LS_CATALOG = "rangista_catalog";
// // const LS_COLLECTIONS = "rangista_collections";
// // const BASE_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p] as const));

// // function readJSON<T>(key: string, fallback: T): T {
// //   try {
// //     // const raw = localStorage.getItem(key);
// //     const raw = sessionStorage.getItem(key);
// //     return raw ? (JSON.parse(raw) as T) : fallback;
// //   } catch {
// //     return fallback;
// //   }
// // }

// // function writeJSON<T>(key: string, value: T) {
// //   // localStorage.setItem(key, JSON.stringify(value));
// //   sessionStorage.setItem(key, JSON.stringify(value));
// // }

// // function ensureCatalogInitialized() {
// //   const existing = readJSON<CatalogProduct[]>(LS_CATALOG, []);
// //   if (existing.length > 0) return;
// //   const seeded: CatalogProduct[] = PRODUCTS.map((p) => ({
// //     id: p.id,
// //     name: p.name,
// //     description: "Hand-painted artistry with durable fabric.",
// //     image: p.image,
// //     images: p.images ?? [p.image],
// //     collection: p.collection,
// //     total_reviews: p.total_reviews,
// //     average_rating: p.average_rating,
// //     XS_price: p.XS_price,
// //     S_price: p.S_price,
// //     M_price: p.M_price,
// //     L_price: p.L_price,
// //     XL_price: p.XL_price,
// //     XXL_price: p.XXL_price,
// //     XS_stock: p.XS_stock,
// //     S_stock: p.S_stock,
// //     M_stock: p.M_stock,
// //     L_stock: p.L_stock,
// //     XL_stock: p.XL_stock,
// //     XXL_stock: p.XXL_stock,
// //     kids: p.kids,
// //   }));
// //   writeJSON(LS_CATALOG, seeded);
// //   const collections = Array.from(
// //     new Set(seeded.map((p) => p.collection))
// //   );
// //   writeJSON(LS_COLLECTIONS, collections);
// // }

// // function migrateCatalog() {
// //   const current = readJSON<CatalogProduct[]>(LS_CATALOG, []);
// //   const byId = BASE_BY_ID;
// //   let changed = false;
// //   const next = current.map((item) => {
// //     const base = byId.get(item.id);
// //     if (!base) return item;

// //     const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
// //     const image = item.image || images[0];
// //     const nameChanged = item.name !== base.name;
// //     const collectionChanged = item.collection !== base.collection;
// //     const description = item.description || "Hand-painted artistry with durable fabric.";
// //     const pricesChanged =
// //       item.XS_price !== base.XS_price ||
// //       item.S_price !== base.S_price ||
// //       item.M_price !== base.M_price ||
// //       item.L_price !== base.L_price ||
// //       item.XL_price !== base.XL_price ||
// //       item.XXL_price !== base.XXL_price;
// //     const stocksChanged =
// //       item.XS_stock !== base.XS_stock ||
// //       item.S_stock !== base.S_stock ||
// //       item.M_stock !== base.M_stock ||
// //       item.L_stock !== base.L_stock ||
// //       item.XL_stock !== base.XL_stock ||
// //       item.XXL_stock !== base.XXL_stock;
// //     const kidsChanged = item.kids !== base.kids;
// //     const reviewsChanged = item.total_reviews !== base.total_reviews || item.average_rating !== base.average_rating;

// //     if (
// //       images !== item.images ||
// //       image !== item.image ||
// //       nameChanged ||
// //       collectionChanged ||
// //       description !== item.description ||
// //       pricesChanged ||
// //       stocksChanged ||
// //       kidsChanged ||
// //       reviewsChanged
// //     ) {
// //       changed = true;
// //       return {
// //         ...item,
// //         images,
// //         image,
// //         name: base.name,
// //         collection: base.collection,
// //         description,
// //         XS_price: base.XS_price,
// //         S_price: base.S_price,
// //         M_price: base.M_price,
// //         L_price: base.L_price,
// //         XL_price: base.XL_price,
// //         XXL_price: base.XXL_price,
// //         XS_stock: base.XS_stock,
// //         S_stock: base.S_stock,
// //         M_stock: base.M_stock,
// //         L_stock: base.L_stock,
// //         XL_stock: base.XL_stock,
// //         XXL_stock: base.XXL_stock,
// //         kids: base.kids,
// //         total_reviews: base.total_reviews,
// //         average_rating: base.average_rating,
// //       };
// //     }

// //     return item;
// //   });
// //   if (changed) writeJSON(LS_CATALOG, next);
// // }

// // function mergeWithBase(item: CatalogProduct): CatalogProduct {
// //   const base = BASE_BY_ID.get(item.id);
// //   if (!base) return item;

// //   const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
// //   const image = item.image || images[0];
// //   const name = item.name === base.name ? item.name : base.name;
// //   const collection = item.collection === base.collection ? item.collection : base.collection;
// //   const description = item.description || "Hand-painted artistry with durable fabric.";
// //   const XS_price = item.XS_price === base.XS_price ? item.XS_price : base.XS_price;
// //   const S_price = item.S_price === base.S_price ? item.S_price : base.S_price;
// //   const M_price = item.M_price === base.M_price ? item.M_price : base.M_price;
// //   const L_price = item.L_price === base.L_price ? item.L_price : base.L_price;
// //   const XL_price = item.XL_price === base.XL_price ? item.XL_price : base.XL_price;
// //   const XXL_price = item.XXL_price === base.XXL_price ? item.XXL_price : base.XXL_price;
// //   const XS_stock = item.XS_stock === base.XS_stock ? item.XS_stock : base.XS_stock;
// //   const S_stock = item.S_stock === base.S_stock ? item.S_stock : base.S_stock;
// //   const M_stock = item.M_stock === base.M_stock ? item.M_stock : base.M_stock;
// //   const L_stock = item.L_stock === base.L_stock ? item.L_stock : base.L_stock;
// //   const XL_stock = item.XL_stock === base.XL_stock ? item.XL_stock : base.XL_stock;
// //   const XXL_stock = item.XXL_stock === base.XXL_stock ? item.XXL_stock : base.XXL_stock;
// //   const kids = item.kids === base.kids ? item.kids : base.kids;
// //   const total_reviews = item.total_reviews === base.total_reviews ? item.total_reviews : base.total_reviews;
// //   const average_rating = item.average_rating === base.average_rating ? item.average_rating : base.average_rating;

// //   return {
// //     ...item,
// //     images,
// //     image,
// //     name,
// //     collection,
// //     description,
// //     XS_price,
// //     S_price,
// //     M_price,
// //     L_price,
// //     XL_price,
// //     XXL_price,
// //     XS_stock,
// //     S_stock,
// //     M_stock,
// //     L_stock,
// //     XL_stock,
// //     XXL_stock,
// //     kids,
// //     total_reviews,
// //     average_rating,
// //   };
// // }

// // export function getProducts(): CatalogProduct[] {
// //   ensureCatalogInitialized();
// //   migrateCatalog();
// //   const stored = readJSON<CatalogProduct[]>(LS_CATALOG, []);
// //   return stored.map(mergeWithBase);
// // }

// // export function getProduct(id: string): CatalogProduct | undefined {
// //   return getProducts().find((p) => p.id === id);
// // }

// // export function upsertProduct(prod: CatalogProduct) {
// //   const list = getProducts();
// //   const idx = list.findIndex((p) => p.id === prod.id);
// //   if (idx >= 0) list[idx] = prod; else list.push(prod);
// //   writeJSON(LS_CATALOG, list);
// // }

// // export function deleteProduct(id: string) {
// //   const list = getProducts().filter((p) => p.id !== id);
// //   writeJSON(LS_CATALOG, list);
// // }

// // export function getCollections(): string[] {
// //   ensureCatalogInitialized();
// //   return readJSON<string[]>(LS_COLLECTIONS, []);
// // }

// // export function addCollection(name: string) {
// //   const cols = Array.from(new Set([...getCollections(), name].filter(Boolean)));
// //   writeJSON(LS_COLLECTIONS, cols);
// // }


































// import { PRODUCTS } from "@/data/products";

// export type CatalogProduct = {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   images?: string[];
//   collection: string;
//   total_reviews: number;
//   average_rating: number;
//   XS_price: number;
//   S_price: number;
//   M_price: number;
//   L_price: number;
//   XL_price: number;
//   XXL_price: number;
//   XS_stock: number;
//   S_stock: number;
//   M_stock: number;
//   L_stock: number;
//   XL_stock: number;
//   XXL_stock: number;
//   kids: boolean;
// };

// export function getMinimumPrice(product: CatalogProduct): number {
//   const values = [product.XS_price, product.S_price, product.M_price, product.L_price, product.XL_price, product.XXL_price].filter(
//     (value): value is number => typeof value === "number" && Number.isFinite(value)
//   );
//   return values.length > 0 ? Math.min(...values) : product.S_price;
// }

// const LS_CATALOG = "rangista_catalog";
// const LS_COLLECTIONS = "rangista_collections";
// const BASE_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p] as const));

// function readJSON<T>(key: string, fallback: T): T {
//   try {
//     // const raw = localStorage.getItem(key);
//     const raw = sessionStorage.getItem(key);
//     return raw ? (JSON.parse(raw) as T) : fallback;
//   } catch {
//     return fallback;
//   }
// }

// function writeJSON<T>(key: string, value: T) {
//   // localStorage.setItem(key, JSON.stringify(value));
//   sessionStorage.setItem(key, JSON.stringify(value));
// }

// function ensureCatalogInitialized() {
//   const existing = readJSON<CatalogProduct[]>(LS_CATALOG, []);
//   if (existing.length > 0) return;
//   const seeded: CatalogProduct[] = PRODUCTS.map((p) => ({
//     id: p.id,
//     name: p.name,
//     description: p.description || "Hand-painted artistry with durable fabric.",
//     image: p.image,
//     images: p.images ?? [p.image],
//     collection: p.collection,
//     total_reviews: p.total_reviews,
//     average_rating: p.average_rating,
//     XS_price: p.XS_price,
//     S_price: p.S_price,
//     M_price: p.M_price,
//     L_price: p.L_price,
//     XL_price: p.XL_price,
//     XXL_price: p.XXL_price,
//     XS_stock: p.XS_stock,
//     S_stock: p.S_stock,
//     M_stock: p.M_stock,
//     L_stock: p.L_stock,
//     XL_stock: p.XL_stock,
//     XXL_stock: p.XXL_stock,
//     kids: p.kids,
//   }));
//   writeJSON(LS_CATALOG, seeded);
//   const collections = Array.from(
//     new Set(seeded.map((p) => p.collection))
//   );
//   writeJSON(LS_COLLECTIONS, collections);
// }

// function migrateCatalog() {
//   const current = readJSON<CatalogProduct[]>(LS_CATALOG, []);
//   const byId = BASE_BY_ID;
//   let changed = false;
//   const next = current.map((item) => {
//     const base = byId.get(item.id);
//     if (!base) return item;

//     const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
//     const image = item.image || images[0];
//     const nameChanged = item.name !== base.name;
//     const collectionChanged = item.collection !== base.collection;
//     const description = base.description || item.description || "Hand-painted artistry with durable fabric.";
//     const pricesChanged =
//       item.XS_price !== base.XS_price ||
//       item.S_price !== base.S_price ||
//       item.M_price !== base.M_price ||
//       item.L_price !== base.L_price ||
//       item.XL_price !== base.XL_price ||
//       item.XXL_price !== base.XXL_price;
//     const stocksChanged =
//       item.XS_stock !== base.XS_stock ||
//       item.S_stock !== base.S_stock ||
//       item.M_stock !== base.M_stock ||
//       item.L_stock !== base.L_stock ||
//       item.XL_stock !== base.XL_stock ||
//       item.XXL_stock !== base.XXL_stock;
//     const kidsChanged = item.kids !== base.kids;
//     const reviewsChanged = item.total_reviews !== base.total_reviews || item.average_rating !== base.average_rating;

//     if (
//       images !== item.images ||
//       image !== item.image ||
//       nameChanged ||
//       collectionChanged ||
//       description !== item.description ||
//       pricesChanged ||
//       stocksChanged ||
//       kidsChanged ||
//       reviewsChanged
//     ) {
//       changed = true;
//       return {
//         ...item,
//         images,
//         image,
//         name: base.name,
//         collection: base.collection,
//         description,
//         XS_price: base.XS_price,
//         S_price: base.S_price,
//         M_price: base.M_price,
//         L_price: base.L_price,
//         XL_price: base.XL_price,
//         XXL_price: base.XXL_price,
//         XS_stock: base.XS_stock,
//         S_stock: base.S_stock,
//         M_stock: base.M_stock,
//         L_stock: base.L_stock,
//         XL_stock: base.XL_stock,
//         XXL_stock: base.XXL_stock,
//         kids: base.kids,
//         total_reviews: base.total_reviews,
//         average_rating: base.average_rating,
//       };
//     }

//     return item;
//   });
//   if (changed) writeJSON(LS_CATALOG, next);
// }

// function mergeWithBase(item: CatalogProduct): CatalogProduct {
//   const base = BASE_BY_ID.get(item.id);
//   if (!base) return item;

//   const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
//   const image = item.image || images[0];
//   const name = item.name === base.name ? item.name : base.name;
//   const collection = item.collection === base.collection ? item.collection : base.collection;
//   const description = base.description || item.description || "Hand-painted artistry with durable fabric.";
//   const XS_price = item.XS_price === base.XS_price ? item.XS_price : base.XS_price;
//   const S_price = item.S_price === base.S_price ? item.S_price : base.S_price;
//   const M_price = item.M_price === base.M_price ? item.M_price : base.M_price;
//   const L_price = item.L_price === base.L_price ? item.L_price : base.L_price;
//   const XL_price = item.XL_price === base.XL_price ? item.XL_price : base.XL_price;
//   const XXL_price = item.XXL_price === base.XXL_price ? item.XXL_price : base.XXL_price;
//   const XS_stock = item.XS_stock === base.XS_stock ? item.XS_stock : base.XS_stock;
//   const S_stock = item.S_stock === base.S_stock ? item.S_stock : base.S_stock;
//   const M_stock = item.M_stock === base.M_stock ? item.M_stock : base.M_stock;
//   const L_stock = item.L_stock === base.L_stock ? item.L_stock : base.L_stock;
//   const XL_stock = item.XL_stock === base.XL_stock ? item.XL_stock : base.XL_stock;
//   const XXL_stock = item.XXL_stock === base.XXL_stock ? item.XXL_stock : base.XXL_stock;
//   const kids = item.kids === base.kids ? item.kids : base.kids;
//   const total_reviews = item.total_reviews === base.total_reviews ? item.total_reviews : base.total_reviews;
//   const average_rating = item.average_rating === base.average_rating ? item.average_rating : base.average_rating;

//   return {
//     ...item,
//     images,
//     image,
//     name,
//     collection,
//     description,
//     XS_price,
//     S_price,
//     M_price,
//     L_price,
//     XL_price,
//     XXL_price,
//     XS_stock,
//     S_stock,
//     M_stock,
//     L_stock,
//     XL_stock,
//     XXL_stock,
//     kids,
//     total_reviews,
//     average_rating,
//   };
// }

// export function getProducts(): CatalogProduct[] {
//   ensureCatalogInitialized();
//   migrateCatalog();
//   const stored = readJSON<CatalogProduct[]>(LS_CATALOG, []);
//   return stored.map(mergeWithBase);
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
//   const cols = Array.from(new Set([...getCollections(), name].filter(Boolean)));
//   writeJSON(LS_COLLECTIONS, cols);
// }




















import { PRODUCTS } from "@/data/products";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  collection: string;
  total_reviews: number;
  average_rating: number;
  XS_price: number;
  S_price: number;
  M_price: number;
  L_price: number;
  XL_price: number;
  XXL_price: number;
  XS_stock: number;
  S_stock: number;
  M_stock: number;
  L_stock: number;
  XL_stock: number;
  XXL_stock: number;
  kids: boolean;
};

export function getMinimumPrice(product: CatalogProduct): number {
  const values = [product.XS_price, product.S_price, product.M_price, product.L_price, product.XL_price, product.XXL_price].filter(
    (value): value is number => typeof value === "number" && Number.isFinite(value)
  );
  return values.length > 0 ? Math.min(...values) : product.S_price;
}

const LS_CATALOG = "rangista_catalog";
const LS_COLLECTIONS = "rangista_collections";
const BASE_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p] as const));

function readJSON<T>(key: string, fallback: T): T {
  try {
    // const raw = localStorage.getItem(key);
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  // localStorage.setItem(key, JSON.stringify(value));
  sessionStorage.setItem(key, JSON.stringify(value));
}

function ensureCatalogInitialized() {
  const existing = readJSON<CatalogProduct[]>(LS_CATALOG, []);
  // Always reinitialize to ensure fresh data from API
  if (existing.length > 0 && PRODUCTS.length > 0) return;
  const seeded: CatalogProduct[] = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description || "Hand-painted artistry with durable fabric.",
    image: p.image,
    images: p.images ?? [p.image],
    collection: p.collection,
    total_reviews: p.total_reviews,
    average_rating: p.average_rating,
    XS_price: p.XS_price,
    S_price: p.S_price,
    M_price: p.M_price,
    L_price: p.L_price,
    XL_price: p.XL_price,
    XXL_price: p.XXL_price,
    XS_stock: p.XS_stock,
    S_stock: p.S_stock,
    M_stock: p.M_stock,
    L_stock: p.L_stock,
    XL_stock: p.XL_stock,
    XXL_stock: p.XXL_stock,
    kids: p.kids,
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
    const nameChanged = item.name !== base.name;
    const collectionChanged = item.collection !== base.collection;
    const description = base.description || item.description || "Hand-painted artistry with durable fabric.";
    const pricesChanged =
      item.XS_price !== base.XS_price ||
      item.S_price !== base.S_price ||
      item.M_price !== base.M_price ||
      item.L_price !== base.L_price ||
      item.XL_price !== base.XL_price ||
      item.XXL_price !== base.XXL_price;
    const stocksChanged =
      item.XS_stock !== base.XS_stock ||
      item.S_stock !== base.S_stock ||
      item.M_stock !== base.M_stock ||
      item.L_stock !== base.L_stock ||
      item.XL_stock !== base.XL_stock ||
      item.XXL_stock !== base.XXL_stock;
    const kidsChanged = item.kids !== base.kids;
    const reviewsChanged = item.total_reviews !== base.total_reviews || item.average_rating !== base.average_rating;

    if (
      images !== item.images ||
      image !== item.image ||
      nameChanged ||
      collectionChanged ||
      description !== item.description ||
      pricesChanged ||
      stocksChanged ||
      kidsChanged ||
      reviewsChanged
    ) {
      changed = true;
      return {
        ...item,
        images,
        image,
        name: base.name,
        collection: base.collection,
        description,
        XS_price: base.XS_price,
        S_price: base.S_price,
        M_price: base.M_price,
        L_price: base.L_price,
        XL_price: base.XL_price,
        XXL_price: base.XXL_price,
        XS_stock: base.XS_stock,
        S_stock: base.S_stock,
        M_stock: base.M_stock,
        L_stock: base.L_stock,
        XL_stock: base.XL_stock,
        XXL_stock: base.XXL_stock,
        kids: base.kids,
        total_reviews: base.total_reviews,
        average_rating: base.average_rating,
      };
    }

    return item;
  });
  if (changed) writeJSON(LS_CATALOG, next);
}

function mergeWithBase(item: CatalogProduct): CatalogProduct {
  const base = BASE_BY_ID.get(item.id);
  if (!base) return item;

  const images = item.images && item.images.length > 0 ? item.images : base.images ?? [base.image];
  const image = item.image || images[0];
  const name = item.name === base.name ? item.name : base.name;
  const collection = item.collection === base.collection ? item.collection : base.collection;
  const description = base.description || item.description || "Hand-painted artistry with durable fabric.";
  const XS_price = item.XS_price === base.XS_price ? item.XS_price : base.XS_price;
  const S_price = item.S_price === base.S_price ? item.S_price : base.S_price;
  const M_price = item.M_price === base.M_price ? item.M_price : base.M_price;
  const L_price = item.L_price === base.L_price ? item.L_price : base.L_price;
  const XL_price = item.XL_price === base.XL_price ? item.XL_price : base.XL_price;
  const XXL_price = item.XXL_price === base.XXL_price ? item.XXL_price : base.XXL_price;
  const XS_stock = item.XS_stock === base.XS_stock ? item.XS_stock : base.XS_stock;
  const S_stock = item.S_stock === base.S_stock ? item.S_stock : base.S_stock;
  const M_stock = item.M_stock === base.M_stock ? item.M_stock : base.M_stock;
  const L_stock = item.L_stock === base.L_stock ? item.L_stock : base.L_stock;
  const XL_stock = item.XL_stock === base.XL_stock ? item.XL_stock : base.XL_stock;
  const XXL_stock = item.XXL_stock === base.XXL_stock ? item.XXL_stock : base.XXL_stock;
  const kids = item.kids === base.kids ? item.kids : base.kids;
  const total_reviews = item.total_reviews === base.total_reviews ? item.total_reviews : base.total_reviews;
  const average_rating = item.average_rating === base.average_rating ? item.average_rating : base.average_rating;

  return {
    ...item,
    images,
    image,
    name,
    collection,
    description,
    XS_price,
    S_price,
    M_price,
    L_price,
    XL_price,
    XXL_price,
    XS_stock,
    S_stock,
    M_stock,
    L_stock,
    XL_stock,
    XXL_stock,
    kids,
    total_reviews,
    average_rating,
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
  const cols = Array.from(new Set([...getCollections(), name].filter(Boolean)));
  writeJSON(LS_COLLECTIONS, cols);
}
