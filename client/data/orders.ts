// import { API_BASE_URL } from "@/lib/api-config";
// const API_BASE = API_BASE_URL;

// // Types based on your API responses
// export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

// export interface OrderProduct {
//   product_name: string;
//   quantity: number;
//   size?: string;
// }

// export interface OrderResponse {
//   order_id: number;
//   username: string;
//   status: string;
//   total_products: number;
//   products: OrderProduct[];
//   order_time: string;
// }

// export interface OrderUpdate {
//   status: string;
// }

// export interface ReviewCreate {
//   user_id: number;
//   product_id: string;
//   stars: number;
//   text?: string;
//   time: string;
// }

// export interface ReviewDetail {
//   username: string;
//   stars: number;
//   text?: string;
//   time: string;
// }

// // API Functions
// async function fetchUserOrders(userId: number): Promise<OrderResponse[]> {
//   try {
//     const response = await fetch(`${API_BASE}/users/${userId}/orders`);
//     if (!response.ok) {
//       if (response.status === 404) {
//         return [];
//       }
//       throw new Error(`Failed to fetch orders: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return [];
//   }
// }

// async function updateOrderStatusAPI(orderId: number, status: string): Promise<OrderResponse | null> {
//   try {
//     const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to update order status: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     return null;
//   }
// }

// async function createReview(reviewData: ReviewCreate): Promise<ReviewDetail | null> {
//   try {
//     const response = await fetch(`${API_BASE}/reviews/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(reviewData),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to create review: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating review:", error);
//     return null;
//   }
// }

// async function hasReviewForOrderItem(userId: number, orderId: number, productId: string, size?: string): Promise<boolean> {
//   try {
//     const query = new URLSearchParams({
//       user_id: userId.toString(),
//       order_id: orderId.toString(),
//       product_id: productId,
//       ...(size && { size }),
//     });
//     const response = await fetch(`${API_BASE}/reviews/check?${query}`);
//     if (!response.ok) {
//       return false;
//     }
//     const data = await response.json();
//     return data.reviewed;
//   } catch (error) {
//     console.error("Error checking review:", error);
//     return false;
//   }
// }

// // Exported functions
// export function listOrdersByUser(userId: number): Promise<OrderResponse[]> {
//   return fetchUserOrders(userId);
// }

// export { updateOrderStatusAPI }; // Export the API-based function explicitly

// export async function createReviewAPI(reviewData: ReviewCreate): Promise<ReviewDetail | null> {
//   return createReview(reviewData);
// }

// export async function hasReviewForOrderItemAPI(userId: number, orderId: number, productId: string, size?: string): Promise<boolean> {
//   return hasReviewForOrderItem(userId, orderId, productId, size);
// }

// export function createOrder(userId: number, items: any[]): null {
//   console.warn("Order creation should be handled via backend checkout flow");
//   return null;
// }

// // Legacy functions - deprecated
// /** @deprecated Use updateOrderStatusAPI instead */
// export function updateOrderStatus(id: string, status: string): never {
//   throw new Error("updateOrderStatus is deprecated. Use updateOrderStatusAPI with numeric order ID.");
// }

// /** @deprecated Use listOrdersByUser instead */
// export function listOrders(): never {
//   throw new Error("listOrders is deprecated. Use listOrdersByUser with authenticated user ID.");
// }

// /** @deprecated Order deletion should be handled by backend admin */
// export function deleteOrder(id: string): never {
//   throw new Error("deleteOrder is deprecated. Order deletion should be handled by backend admin.");
// }



















import { API_BASE_URL } from "@/lib/api-config";
const API_BASE = API_BASE_URL;

// Types based on your API responses
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export interface OrderProduct {
  product_name: string;
  quantity: number;
  size?: string;
  product_id: string;
  price: number; // Added price
}

export interface OrderResponse {
  order_id: number;
  user_id: number; // Added user_id
  username: string;
  status: string;
  total_products: number;
  total_price: number; // Added total_price
  products: OrderProduct[];
  order_time: string;
}

export interface OrderUpdate {
  status: string;
}

export interface ReviewCreate {
  user_id: number;
  product_id: string;
  stars: number;
  text?: string;
  time: string;
}

export interface ReviewDetail {
  username: string;
  stars: number;
  text?: string;
  time: string;
}

// API Functions
async function fetchUserOrders(userId: number): Promise<OrderResponse[]> {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}/orders`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function updateOrderStatusAPI(orderId: number, status: string): Promise<OrderResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating order status:", error);
    return null;
  }
}

async function createReview(reviewData: ReviewCreate): Promise<ReviewDetail | null> {
  try {
    const response = await fetch(`${API_BASE}/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create review: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    return null;
  }
}

async function hasReviewForOrderItem(userId: number, orderId: number, productId: string, size?: string): Promise<boolean> {
  try {
    const query = new URLSearchParams({
      user_id: userId.toString(),
      order_id: orderId.toString(),
      product_id: productId,
      ...(size && { size }),
    });
    const response = await fetch(`${API_BASE}/reviews/check?${query}`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.reviewed;
  } catch (error) {
    console.error("Error checking review:", error);
    return false;
  }
}

// Exported functions
export function listOrdersByUser(userId: number): Promise<OrderResponse[]> {
  return fetchUserOrders(userId);
}

export { updateOrderStatusAPI };

export async function createReviewAPI(reviewData: ReviewCreate): Promise<ReviewDetail | null> {
  return createReview(reviewData);
}

export async function hasReviewForOrderItemAPI(userId: number, orderId: number, productId: string, size?: string): Promise<boolean> {
  return hasReviewForOrderItem(userId, orderId, productId, size);
}

export function createOrder(userId: number, items: any[]): null {
  console.warn("Order creation should be handled via backend checkout flow");
  return null;
}

// Legacy functions - deprecated
/** @deprecated Use updateOrderStatusAPI instead */
export function updateOrderStatus(id: string, status: string): never {
  throw new Error("updateOrderStatus is deprecated. Use updateOrderStatusAPI with numeric order ID.");
}

/** @deprecated Use listOrdersByUser instead */
export function listOrders(): never {
  throw new Error("listOrders is deprecated. Use listOrdersByUser with authenticated user ID.");
}

/** @deprecated Order deletion should be handled by backend admin */
export function deleteOrder(id: string): never {
  throw new Error("deleteOrder is deprecated. Order deletion should be handled by backend admin.");
}