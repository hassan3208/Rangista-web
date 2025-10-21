// // // export type Product = {
// // //   id: string;
// // //   name: string;
// // //   image: string;
// // //   images?: string[];
// // //   collection: "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials";
// // //   total_reviews: number;
// // //   average_rating: number;
// // //   S_price: number;
// // //   M_price: number;
// // //   L_price: number;
// // //   S_stock: number;
// // //   M_stock: number;
// // //   L_stock: number;
// // //   kids: boolean;
// // // };

// // // export let PRODUCTS: Product[] = [];

// // // async function fetchProducts() {
// // //   try {
// // //     const response = await fetch('http://127.0.0.1:8000/products');
// // //     if (!response.ok) {
// // //       throw new Error('Failed to fetch products');
// // //     }
// // //     const data: Product[] = await response.json();
// // //     PRODUCTS = data;
// // //   } catch (error) {
// // //     console.error('Error fetching products:', error);
// // //     PRODUCTS = [];
// // //   }
// // // }

// // // fetchProducts();

// // // export const COLLECTIONS = [
// // //   "Eid Collection",
// // //   "Bakra Eid Specials",
// // //   "14 August Independence Collection",
// // //   "Birthday Specials",
// // // ] as const;

// // // export const SIZES = ["S", "M", "L"] as const;











































// // import { API_BASE_URL } from "@/lib/api-config";



// // export type Product = {
// //   id: string;
// //   name: string;
// //   image: string;
// //   images?: string[];
// //   collection: "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials";
// //   total_reviews: number;
// //   average_rating: number;
// //   S_price: number;
// //   M_price: number;
// //   L_price: number;
// //   S_stock: number;
// //   M_stock: number;
// //   L_stock: number;
// //   kids: boolean;
// // };

// // export let PRODUCTS: Product[] = [];

// // async function fetchProducts() {
// //   try {
// //     const response = await fetch(`${API_BASE_URL}/products`);
// //     if (!response.ok) {
// //       throw new Error('Failed to fetch products');
// //     }
// //     const data: Product[] = await response.json();
// //     PRODUCTS = data;
// //     try {
// //       window.dispatchEvent(new CustomEvent("products:change"));
// //     } catch (error) {
// //       console.error("Error dispatching products:change event:", error);
// //     }
// //   } catch (error) {
// //     console.error('Error fetching products:', error);
// //     PRODUCTS = [];
// //   }
// // }

// // fetchProducts();

// // export const COLLECTIONS = [
// //   "Eid Collection",
// //   "Bakra Eid Specials",
// //   "14 August Independence Collection",
// //   "Birthday Specials",
// // ] as const;

// // export const SIZES = ["S", "M", "L"] as const;







// import { API_BASE_URL } from "@/lib/api-config";

// export type Product = {
//   id: string;
//   name: string;
//   image: string;
//   images?: string[];
//   collection: "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials";
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

// export let PRODUCTS: Product[] = [];

// async function fetchProducts() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }
//     const data: Product[] = await response.json();
//     PRODUCTS = data;
//     try {
//       window.dispatchEvent(new CustomEvent("products:change"));
//     } catch (error) {
//       console.error("Error dispatching products:change event:", error);
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     PRODUCTS = [];
//   }
// }

// fetchProducts();

// export const COLLECTIONS = [
//   "Eid Collection",
//   "Bakra Eid Specials",
//   "14 August Independence Collection",
//   "Birthday Specials",
// ] as const;

// export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;







import { API_BASE_URL } from "@/lib/api-config";

export type Product = {
  id: string;
  name: string;
  image: string;
  images?: string[];
  collection: "✨ Bestsellers Edit" | "🌸 New Arrivals" | "❄ Winter Wonders" | "☀ Summer Bloom" | "💍 The Wedding Season" | "🌙 Eid Collection" | "🐐 Bakra Eid Edit" | "Azadi Collection" | "👩‍🍼 Mommy & Me" | "👗 Adults Collection" | "🎨 Handpainted Dupattas Collection";
  description?: string;
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

export let PRODUCTS: Product[] = [];

async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data: Product[] = await response.json();
    PRODUCTS = data;
    try {
      window.dispatchEvent(new CustomEvent("products:change"));
    } catch (error) {
      console.error("Error dispatching products:change event:", error);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    PRODUCTS = [];
  }
}

fetchProducts();

export const COLLECTIONS = [
  "✨ Bestsellers Edit",
  "🌸 New Arrivals",
  "❄ Winter Wonders",
  "☀ Summer Bloom",
  "💍 The Wedding Season",
  "🌙 Eid Collection",
  "🐐 Bakra Eid Edit",
  "Azadi Collection",
  "👩‍🍼 Mommy & Me",
  "👗 Adults Collection",
  "🎨 Handpainted Dupattas Collection",
] as const;


export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
