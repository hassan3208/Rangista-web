// // Configure collection-level discounts here.
// // Uncomment any collection below and set the discount percent to 20, 30, or 40.
// // Example:
// // export const DISCOUNTS: Record<string, DiscountPercent> = {
// //   "Eid Collection": 20,
// // };

// // DiscountPercent: any integer percentage between 0 and 100 (inclusive)
// export type DiscountPercent = number;

// // Normalize any input to a safe DiscountPercent (0..100)
// function normalizePercent(p: number | undefined): DiscountPercent {
//   if (p == null || Number.isNaN(p)) return 0;
//   const n = Math.round(Number(p));
//   return Math.max(0, Math.min(100, n));
// }

// // By default, no discounts are active. Uncomment lines to enable.
// export const DISCOUNTS: Record<string, DiscountPercent> = {
//   "Eid Collection": 20,
// //   "Bakra Eid Specials": 30,
// //   "14 August Independence Collection": 40,
//   // "Birthday Specials": 20,
// };

// export function getDiscountForCollection(collection?: string): DiscountPercent {
//   if (!collection) return 0;
//   return normalizePercent(DISCOUNTS[collection] ?? 0);
// }

// export function applyDiscount(price: number, percent: DiscountPercent): number {
//   const pct = normalizePercent(percent);
//   if (pct <= 0) return Math.round(price);
//   const discounted = price * (100 - pct) / 100;
//   return Math.round(discounted);
// }








// Configure collection-level discounts here.
// Uncomment any collection below and set the discount percent to 20, 30, or 40.
// Example:
// export const DISCOUNTS: Record<string, DiscountPercent> = {
//   "Eid Collection": 20,
// };

// DiscountPercent: any integer percentage between 0 and 100 (inclusive)
export type DiscountPercent = number;

// Normalize any input to a safe DiscountPercent (0..100)
function normalizePercent(p: number | undefined): DiscountPercent {
  if (p == null || Number.isNaN(p)) return 0;
  const n = Math.round(Number(p));
  return Math.max(0, Math.min(100, n));
}

// By default, no discounts are active. Uncomment lines to enable.
export const DISCOUNTS: Record<string, DiscountPercent> = {
  // "✨ Bestsellers Edit": 20,
  // "🌸 New Arrivals": 15,
  // "❄ Winter Wonders": 25,
  // "☀ Summer Bloom": 20,
  // "💍 The Wedding Season": 30,
  "🌙 Eid Collection": 20,
  // "🐐 Bakra Eid Edit": 25,
  // "Azadi Collection": 40,
  // "👩‍🍼 Mommy & Me": 10,
  // "👗 Adults Collection": 15,
  // "🎨 Handpainted Dupattas Collection": 20,
};


export function getDiscountForCollection(collection?: string): DiscountPercent {
  if (!collection) return 0;
  const target = collection.trim().toLowerCase();
  const key = Object.keys(DISCOUNTS).find((k) => k.toLowerCase() === target);
  return normalizePercent(key ? DISCOUNTS[key] : 0);
}

export function applyDiscount(price: number, percent: DiscountPercent): number {
  const pct = normalizePercent(percent);
  if (pct <= 0) return Math.round(price);
  const discounted = price * (100 - pct) / 100;
  return Math.round(discounted);
}
