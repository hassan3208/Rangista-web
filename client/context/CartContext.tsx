// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { getStock } from "@/data/stock";
// import { API_BASE_URL } from "@/lib/api-config";

// export type CartItem = {
//   id: string; // product_id from API
//   name: string;
//   price: number; // total price for the item's quantity in PKR
//   image: string;
//   size?: string;
//   collection?: string;
//   qty: number;
// };

// interface CartContextValue {
//   items: CartItem[];
//   count: number;
//   totalProducts: number;
//   subtotal: number;
//   addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
//   removeItem: (id: string, size?: string) => void;
//   updateQty: (id: string, size: string, qty: number) => void;
//   clear: () => void;
// }

// const CartContext = createContext<CartContextValue | undefined>(undefined);
// import { useAuth } from "@/context/AuthContext";

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [totalProducts, setTotalProducts] = useState<number>(0);

//   const fetchCart = async (userId: number) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
//       if (!response.ok) {
//         if (response.status === 404) {
//           setItems([]);
//           setTotalProducts(0);
//           return;
//         }
//         throw new Error(`Failed to fetch cart: ${response.statusText}`);
//       }
//       const data = await response.json();
//       const cartItems = data.items.map((item: any) => ({
//         id: String(item.product_id), // Ensure product_id is converted to string
//         name: item.product_name,
//         price: item.price,
//         image: item.image,
//         size: item.size,
//         collection: item.collection,
//         qty: item.quantity,
//       }));
//       setItems(cartItems);
//       setTotalProducts(data.total_products);
//       // Log the fetched items and calculated subtotal for debugging
//       const calculatedSubtotal = cartItems.reduce((s, i) => s + i.price, 0);
//       console.log("Fetched cart:", { userId, items: cartItems, totalProducts: data.total_products, calculatedSubtotal });
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       setItems([]);
//       setTotalProducts(0);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       const userId = parseInt(user.id, 10);
//       if (isNaN(userId)) {
//         console.error("Invalid user ID:", user.id);
//         setItems([]);
//         setTotalProducts(0);
//         return;
//       }
//       fetchCart(userId);
//     } else {
//       setItems([]);
//       setTotalProducts(0);
//     }
//   }, [user]);

//   const addItem = async (item: Omit<CartItem, "qty">, qty = 1) => {
//     if (!user) {
//       alert("Please login to add to cart.");
//       return;
//     }
//     const userId = parseInt(user.id, 10);
//     if (isNaN(userId)) {
//       console.error("Invalid user ID:", user.id);
//       alert("Invalid user ID. Please try again.");
//       return;
//     }
//     const available = getStock(item.id, item.size as any);
//     if (available <= 0) return;
//     const addQty = Math.min(qty, available);
//     if (addQty <= 0) return;

//     const payload = {
//       user_id: userId,
//       product_id: item.id,
//       size: item.size,
//       quantity: addQty,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/cart/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to add to cart: ${response.statusText}`);
//       }
//       await fetchCart(userId); // Refresh cart after adding
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add item to cart. Please try again.");
//     }
//   };

//   const removeItem = async (id: string, size?: string) => {
//     if (!user) return;
//     const userId = parseInt(user.id, 10);
//     if (isNaN(userId)) {
//       console.error("Invalid user ID:", user.id);
//       alert("Invalid user ID. Please try again.");
//       return;
//     }
//     if (!id || id === "undefined") {
//       console.error("Invalid product ID:", id, "Size:", size);
//       alert("Cannot remove item: Invalid product ID.");
//       return;
//     }
//     console.log("Attempting to remove item:", { userId, productId: id, size }); // Debug log
//     try {
//       const url = `${API_BASE_URL}/cart/${userId}/${id}${size ? `?size=${size}` : ""}`;
//       console.log("DELETE request URL:", url); // Debug log
//       const response = await fetch(url, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to remove item: ${response.statusText}`);
//       }
//       await fetchCart(userId); // Refresh cart after removal
//     } catch (error) {
//       console.error("Error removing item:", error);
//       alert("Failed to remove item from cart. Please try again.");
//     }
//   };

//   const updateQty = async (id: string, size: string, qty: number) => {
//     if (!user) return;
//     const userId = parseInt(user.id, 10);
//     if (isNaN(userId)) {
//       console.error("Invalid user ID:", user.id);
//       alert("Invalid user ID. Please try again.");
//       return;
//     }
//     if (!id || id === "undefined") {
//       console.error("Invalid product ID:", id, "Size:", size);
//       alert("Cannot update quantity: Invalid product ID.");
//       return;
//     }
//     const available = getStock(id, size as any);
//     const target = Math.max(1, Math.floor(qty));
//     const desiredQty = Math.min(target, available);

//     const payload = {
//       size,
//       quantity: desiredQty,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/cart/${userId}/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to update quantity: ${response.statusText}`);
//       }
//       await fetchCart(userId); // Refresh cart after update
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       alert("Failed to update cart quantity. Please try again.");
//     }
//   };

//   const clear = async () => {
//     if (!user) return;
//     const userId = parseInt(user.id, 10);
//     if (isNaN(userId)) {
//       console.error("Invalid user ID:", user.id);
//       alert("Invalid user ID. Please try again.");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
//         method: "DELETE",
//       });
//       // Handle 204 No Content or other success statuses
//       if (response.ok || response.status === 204) {
//         setItems([]);
//         setTotalProducts(0);
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || `Failed to clear cart 1: ${response.statusText}`);
//       }
//     } catch (error) {
//       // If the cart is already empty (e.g., cleared by /orders/from-cart/), treat it as success
//       if (error.message.includes("404") || error.message.includes("Not Found")) {
//         setItems([]);
//         setTotalProducts(0);
//         return;
//       }
//       console.error("Error clearing cart:", error);
//       // alert("Failed to clear cart 2. Please try again.");
//     }
//   };

//   const subtotal = useMemo(() => {
//     const total = items.reduce((s, i) => s + i.price, 0);
//     console.log("Calculated subtotal:", total, "Items:", items); // Debug subtotal
//     return total;
//   }, [items]);

//   const count = useMemo(() => {
//     const totalQty = items.reduce((s, i) => s + i.qty, 0);
//     console.log("Calculated count:", totalQty); // Debug count
//     return totalQty;
//   }, [items]);

//   const value = useMemo(
//     () => ({ items, count, totalProducts, subtotal, addItem, removeItem, updateQty, clear }),
//     [items, count, totalProducts, subtotal]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) {
//     if (typeof window !== "undefined") {
//       console.warn("useCart used outside CartProvider; falling back to no-op context");
//     }
//     const fallback: CartContextValue = {
//       items: [],
//       count: 0,
//       totalProducts: 0,
//       subtotal: 0,
//       addItem: () => {},
//       removeItem: () => {},
//       updateQty: () => {},
//       clear: () => {},
//     };
//     return fallback;
//   }
//   return ctx;
// }









import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getStock } from "@/data/stock";
import { API_BASE_URL } from "@/lib/api-config";
import { applyDiscount, getDiscountForCollection } from "@/data/discount";

export type CartItem = {
  id: string; // product_id from API
  name: string;
  price: number; // total price for the item's quantity in PKR
  image: string;
  size?: string;
  collection?: string;
  qty: number;
};

interface CartContextValue {
  items: CartItem[];
  count: number;
  totalProducts: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string, size?: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
import { useAuth } from "@/context/AuthContext";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchCart = async (userId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setItems([]);
          setTotalProducts(0);
          return;
        }
        throw new Error(`Failed to fetch cart: ${response.statusText}`);
      }
      const data = await response.json();
      const cartItems = data.items.map((item: any) => {
        const qty = Number(item.quantity) || 1;
        const baseTotal = Number(item.price) || 0;
        const unit = qty > 0 ? baseTotal / qty : baseTotal;
        const pct = getDiscountForCollection(item.collection);
        const discountedUnit = applyDiscount(unit, pct);
        const finalTotal = pct ? discountedUnit * qty : baseTotal;
        return {
          id: String(item.product_id),
          name: item.product_name,
          price: Math.round(finalTotal),
          image: item.image,
          size: item.size,
          collection: item.collection,
          qty,
        } as CartItem;
      });
      setItems(cartItems);
      setTotalProducts(data.total_products);
      // Log the fetched items and calculated subtotal for debugging
      const calculatedSubtotal = cartItems.reduce((s, i) => s + i.price, 0);
      console.log("Fetched cart:", { userId, items: cartItems, totalProducts: data.total_products, calculatedSubtotal });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setItems([]);
      setTotalProducts(0);
    }
  };

  useEffect(() => {
    if (user) {
      const userId = parseInt(user.id, 10);
      if (isNaN(userId)) {
        console.error("Invalid user ID:", user.id);
        setItems([]);
        setTotalProducts(0);
        return;
      }
      fetchCart(userId);
    } else {
      setItems([]);
      setTotalProducts(0);
    }
  }, [user]);

  const addItem = async (item: Omit<CartItem, "qty">, qty = 1) => {
    if (!user) {
      alert("Please login to add to cart.");
      return;
    }
    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID:", user.id);
      alert("Invalid user ID. Please try again.");
      return;
    }
    const available = getStock(item.id, item.size as any);
    if (available <= 0) return;
    const addQty = Math.min(qty, available);
    if (addQty <= 0) return;

    const payload = {
      user_id: userId,
      product_id: item.id,
      size: item.size,
      quantity: addQty,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${response.statusText}`);
      }
      await fetchCart(userId); // Refresh cart after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const removeItem = async (id: string, size?: string) => {
    if (!user) return;
    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID:", user.id);
      alert("Invalid user ID. Please try again.");
      return;
    }
    if (!id || id === "undefined") {
      console.error("Invalid product ID:", id, "Size:", size);
      alert("Cannot remove item: Invalid product ID.");
      return;
    }
    console.log("Attempting to remove item:", { userId, productId: id, size }); // Debug log
    try {
      const url = `${API_BASE_URL}/cart/${userId}/${id}${size ? `?size=${size}` : ""}`;
      console.log("DELETE request URL:", url); // Debug log
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }
      await fetchCart(userId); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const updateQty = async (id: string, size: string, qty: number) => {
    if (!user) return;
    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID:", user.id);
      alert("Invalid user ID. Please try again.");
      return;
    }
    if (!id || id === "undefined") {
      console.error("Invalid product ID:", id, "Size:", size);
      alert("Cannot update quantity: Invalid product ID.");
      return;
    }
    const available = getStock(id, size as any);
    const target = Math.max(1, Math.floor(qty));
    const desiredQty = Math.min(target, available);

    const payload = {
      size,
      quantity: desiredQty,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }
      await fetchCart(userId); // Refresh cart after update
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update cart quantity. Please try again.");
    }
  };

  const clear = async () => {
    if (!user) return;
    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID:", user.id);
      alert("Invalid user ID. Please try again.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
        method: "DELETE",
      });
      // Handle 204 No Content or other success statuses
      if (response.ok || response.status === 204) {
        setItems([]);
        setTotalProducts(0);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Failed to clear cart 1: ${response.statusText}`);
      }
    } catch (error) {
      // If the cart is already empty (e.g., cleared by /orders/from-cart/), treat it as success
      if (error.message.includes("404") || error.message.includes("Not Found")) {
        setItems([]);
        setTotalProducts(0);
        return;
      }
      console.error("Error clearing cart:", error);
      // alert("Failed to clear cart 2. Please try again.");
    }
  };

  const subtotal = useMemo(() => {
    const total = items.reduce((s, i) => s + i.price, 0);
    console.log("Calculated subtotal:", total, "Items:", items); // Debug subtotal
    return total;
  }, [items]);

  const count = useMemo(() => {
    const totalQty = items.reduce((s, i) => s + i.qty, 0);
    console.log("Calculated count:", totalQty); // Debug count
    return totalQty;
  }, [items]);

  const value = useMemo(
    () => ({ items, count, totalProducts, subtotal, addItem, removeItem, updateQty, clear }),
    [items, count, totalProducts, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    if (typeof window !== "undefined") {
      console.warn("useCart used outside CartProvider; falling back to no-op context");
    }
    const fallback: CartContextValue = {
      items: [],
      count: 0,
      totalProducts: 0,
      subtotal: 0,
      addItem: () => {},
      removeItem: () => {},
      updateQty: () => {},
      clear: () => {},
    };
    return fallback;
  }
  return ctx;
}
