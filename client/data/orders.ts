// import type { CartItem } from "@/context/CartContext";

// export type OrderStatus = "verify" | "in_process" | "delivered";
// export type Order = {
//   id: string;
//   userId: string;
//   items: CartItem[];
//   status: OrderStatus;
//   createdAt: number;
// };

// const LS_ORDERS = "rangista_orders";

// function read(): Order[] {
//   try {
//     const raw = localStorage.getItem(LS_ORDERS);
//     return raw ? (JSON.parse(raw) as Order[]) : [];
//   } catch {
//     return [];
//   }
// }

// function write(list: Order[]) {
//   localStorage.setItem(LS_ORDERS, JSON.stringify(list));
// }

// export function listOrders(): Order[] {
//   return read();
// }

// export function listOrdersByUser(userId: string): Order[] {
//   return read().filter((o) => o.userId === userId);
// }

// export function createOrder(userId: string, items: CartItem[]): Order {
//   const order: Order = {
//     id: crypto.randomUUID(),
//     userId,
//     items: items.map((i) => ({ ...i })),
//     status: "verify",
//     createdAt: Date.now(),
//   };
//   const list = read();
//   list.push(order);
//   write(list);
//   return order;
// }

// export function updateOrderStatus(id: string, status: OrderStatus) {
//   const list = read();
//   const idx = list.findIndex((o) => o.id === id);
//   if (idx >= 0) {
//     list[idx].status = status;
//     write(list);
//   }
// }

// export function deleteOrder(id: string) {
//   write(read().filter((o) => o.id !== id));
// }







const API_BASE = "http://127.0.0.1:8000";

// Types based on your API responses
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export interface OrderProduct {
  product_name: string;
  quantity: number;
  size?: string;
}

export interface OrderResponse {
  order_id: number;
  username: string;
  status: string;
  total_products: number;
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

export { updateOrderStatusAPI }; // Export the API-based function explicitly

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