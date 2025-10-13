// import { useCallback, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/context/AuthContext";
// import type { CartItem } from "@/context/CartContext";
// import { listAllUsers, StoredUser } from "../data/users";
// import { readUserCart } from "@/data/carts";
// import { API_BASE_URL } from "@/lib/api-config";

// const ALLOWED_ADMIN_EMAILS = new Set([
//   "l1f22bscs1019@ucp.edu.pk",
//   "itsmywork1019@gmail.com",
// ]);

// interface OrderProduct {
//   product_name: string;
//   quantity: number;
//   size: string;
// }

// interface Order {
//   order_id: number;
//   username: string;
//   status: string;
//   total_products: number;
//   products: OrderProduct[];
//   order_time: string;
// }

// export default function Admin() {
//   const { user } = useAuth();
//   const [unlocked, setUnlocked] = useState(false);
//   const [pass, setPass] = useState("");
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [users, setUsers] = useState<StoredUser[]>([]);
//   const [userCarts, setUserCarts] = useState<Record<string, CartItem[]>>({});
//   const [loadingOrders, setLoadingOrders] = useState(true);

//   const loadUserCarts = useCallback((list: StoredUser[]) => {
//     const mapped: Record<string, CartItem[]> = {};
//     for (const u of list) {
//       mapped[u.id] = readUserCart(u.id);
//     }
//     setUserCarts(mapped);
//   }, []);

//   const loadUsersAndCarts = useCallback(async () => {
//     try {
//       const list = await listAllUsers();
//       setUsers(list);
//       loadUserCarts(list);
//     } catch (error) {
//       console.error("Failed to load users:", error);
//     }
//   }, [loadUserCarts]);

//   const fetchOrders = async () => {
//     try {
//       setLoadingOrders(true);
//       const response = await fetch(`${API_BASE_URL}/orders`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch orders: ${response.statusText}`);
//       }
//       const data: Order[] = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setOrders([]);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     loadUsersAndCarts();
//   }, [loadUsersAndCarts]);

//   useEffect(() => {
//     const handleCartChange = (event: Event) => {
//       const detail = (event as CustomEvent<{ userId: string }>).detail;
//       if (detail?.userId) {
//         setUserCarts((prev) => ({ ...prev, [detail.userId]: readUserCart(detail.userId) }));
//       } else {
//         loadUsersAndCarts();
//       }
//     };
//     window.addEventListener("cart:change", handleCartChange);
//     return () => window.removeEventListener("cart:change", handleCartChange);
//   }, [loadUsersAndCarts]);

//   if (!user) return <div className="container py-10">Please login to access admin.</div>;
//   if (!ALLOWED_ADMIN_EMAILS.has(user.email)) return <div className="container py-10">You are not authorized to access admin.</div>;
//   if (!unlocked) {
//     return (
//       <main className="container py-10 space-y-4">
//         <h1 className="font-serif text-3xl">Admin Access</h1>
//         <p className="text-sm text-muted-foreground">Enter admin password to continue.</p>
//         <div className="flex items-center gap-2">
//           <Input
//             type="password"
//             placeholder="Password"
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//             className="w-48"
//           />
//           <Button
//             onClick={() => {
//               if (pass.trim() === "4321") setUnlocked(true);
//               else alert("Incorrect password");
//             }}
//           >
//             Enter
//           </Button>
//         </div>
//       </main>
//     );
//   }

//   const STATUS_STYLES: Record<string, { badge: string; border: string }> = {
//     pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300" },
//     processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300" },
//     shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300" },
//     delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300" },
//     canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300" },
//   };

//   const changeOrderStatus = async (orderId: number, status: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to update order status: ${response.statusText}`);
//       }
//       // Refetch orders after update to ensure latest server state
//       await fetchOrders();
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status.");
//     }
//   };
  
//   return (
//     <main className="container py-10 space-y-10">
//       <div className="flex items-center justify-between">
//         <h1 className="font-serif text-3xl">Admin Panel</h1>
//       </div>
//       <p className="text-sm text-muted-foreground">Logged in as: {user.email}</p>

//       {/* ---------------- ORDERS SECTION ---------------- */}
//       <section>
//         <h2 className="font-serif text-2xl">Orders</h2>
//         {loadingOrders ? (
//           <p className="mt-4 text-muted-foreground">Loading orders...</p>
//         ) : (
//           <div className="mt-4 space-y-3">
//             {orders.map((o) => (
//               <div key={o.order_id} className="border rounded-lg p-4">
//                 <div className="flex justify-between text-sm">
//                   <span>Order #{o.order_id} · User {o.username}</span>
//                   <div className="flex items-center gap-2">
//                     {/* Colored badge showing current status */}
//                     <span
//                       className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
//                     >
//                       {o.status}
//                     </span>
//                     {/* Select styled with matching border color; optimistic local update */}
//                     <select
//                       className={`rounded px-2 py-1 border ${STATUS_STYLES[o.status]?.border ?? "border-gray-300"}`}
//                       value={o.status}
//                       onChange={(e) => {
//                         const newStatus = e.target.value;
//                         // Optimistically update local orders so UI color updates immediately
//                         setOrders((prev) => prev.map((it) => (it.order_id === o.order_id ? { ...it, status: newStatus } : it)));
//                         changeOrderStatus(o.order_id, newStatus);
//                       }}
//                     >
//                       <option value="pending">pending</option>
//                       <option value="processing">processing</option>
//                       <option value="shipped">shipped</option>
//                       <option value="delivered">delivered</option>
//                       <option value="canceled">canceled</option>
//                     </select>
//                   </div>
//                 </div>
//                 <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
//                   {o.products.map((i) => (
//                     <li key={i.product_name + i.size}>
//                       {i.product_name} {i.size ? `(${i.size})` : ""} × {i.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//             {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
//           </div>
//         )}
//       </section>

//       {/* ---------------- USERS & CARTS SECTION ---------------- */}
//       <section>
//         <h2 className="font-serif text-2xl">Users & Carts</h2>
//         <div className="mt-4 space-y-3">
//           {users.map((u) => {
//             const cart = userCarts[u.id] ?? [];
//             return (
//               <div key={u.id} className="space-y-3 rounded-lg border p-4">
//                 <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
//                   <div className="font-medium">
//                     {u.name} · {u.email}
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     Cart items: {cart.length}
//                   </div>
//                 </div>
//                 <ul className="space-y-2 text-sm">
//                   {cart.map((i) => (
//                     <li
//                       key={i.id + (i.size ?? "")}
//                       className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2"
//                     >
//                       <span className="min-w-[200px] flex-1 flex">
//                         {i.name} {i.size ? `(${i.size})` : ""} × {i.qty}
//                       </span>
//                     </li>
//                   ))}
//                   {cart.length === 0 && (
//                     <li className="text-muted-foreground">Cart is empty.</li>
//                   )}
//                 </ul>
//               </div>
//             );
//           })}
//           {users.length === 0 && <p className="text-muted-foreground">No users yet.</p>}
//         </div>
//       </section>
//     </main>
//   );
// }


















import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import type { CartItem } from "@/context/CartContext";
import { listAllUsers, StoredUser } from "../data/users";
import { readUserCart } from "@/data/carts";
import { API_BASE_URL } from "@/lib/api-config";
import { formatPKR } from "@/lib/currency";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ALLOWED_ADMIN_EMAILS = new Set([
  "l1f22bscs1019@ucp.edu.pk",
  "itsmywork1019@gmail.com",
]);

interface OrderProduct {
  product_name: string;
  quantity: number;
  size: string;
  price: number;
}

interface Order {
  order_id: number;
  user_id: number;
  username: string;
  status: string;
  total_products: number;
  total_price: number;
  products: OrderProduct[];
  order_time: string;
}

export default function Admin() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [userCarts, setUserCarts] = useState<Record<string, CartItem[]>>({});
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const loadUserCarts = useCallback((list: StoredUser[]) => {
    const mapped: Record<string, CartItem[]> = {};
    for (const u of list) {
      mapped[u.id] = readUserCart(u.id);
    }
    setUserCarts(mapped);
  }, []);

  const loadUsersAndCarts = useCallback(async () => {
    try {
      const list = await listAllUsers();
      setUsers(list);
      loadUserCarts(list);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }, [loadUserCarts]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    loadUsersAndCarts();
  }, [loadUsersAndCarts]);

  useEffect(() => {
    const handleCartChange = (event: Event) => {
      const detail = (event as CustomEvent<{ userId: string }>).detail;
      if (detail?.userId) {
        setUserCarts((prev) => ({ ...prev, [detail.userId]: readUserCart(detail.userId) }));
      } else {
        loadUsersAndCarts();
      }
    };
    window.addEventListener("cart:change", handleCartChange);
    return () => window.removeEventListener("cart:change", handleCartChange);
  }, [loadUsersAndCarts]);

  if (!user) return <div className="container py-10">Please login to access admin.</div>;
  if (!ALLOWED_ADMIN_EMAILS.has(user.email)) return <div className="container py-10">You are not authorized to access admin.</div>;
  if (!unlocked) {
    return (
      <main className="container py-10 space-y-4">
        <h1 className="font-serif text-3xl">Admin Access</h1>
        <p className="text-sm text-muted-foreground">Enter admin password to continue.</p>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-48"
          />
          <Button
            onClick={() => {
              if (pass.trim() === "4321") setUnlocked(true);
              else alert("Incorrect password");
            }}
          >
            Enter
          </Button>
        </div>
      </main>
    );
  }

  const STATUS_STYLES: Record<string, { badge: string; border: string; card?: string }> = {
    pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", card: "bg-yellow-50" },
    processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300", card: "bg-blue-50" },
    shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300", card: "bg-indigo-50" },
    delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300", card: "bg-green-50" },
    canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300", card: "bg-red-50" },
  };

  const changeOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
      // Refresh orders after successful update
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Revert optimistic update on failure
      setOrders((prev) =>
        prev.map((it) => (it.order_id === orderId ? { ...it, status: orders.find((o) => o.order_id === orderId)?.status ?? "pending" } : it))
      );
    }
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    setSelectedOrder(order);
    setNewStatus(newStatus);
    setConfirmationOpen(true);
  };

  const confirmStatusChange = () => {
    if (selectedOrder && newStatus) {
      setOrders((prev) =>
        prev.map((it) => (it.order_id === selectedOrder.order_id ? { ...it, status: newStatus } : it))
      );
      changeOrderStatus(selectedOrder.order_id, newStatus);
    }
    setConfirmationOpen(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  const cancelStatusChange = () => {
    setConfirmationOpen(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  return (
    <main className="container py-10 space-y-10">
      {/* ---------------- ORDERS SECTION ---------------- */}
      <section>
        <h2 className="font-serif text-2xl">Orders</h2>
        {loadingOrders ? (
          <p className="mt-4 text-muted-foreground">Loading orders...</p>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div
                key={o.order_id}
                className={`border rounded-lg p-4 space-y-3 ${STATUS_STYLES[o.status]?.border ?? "border-gray-200"} ${STATUS_STYLES[o.status]?.card ?? ""}`}
              >
                <div className="flex justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">Order #{o.order_id} · User {o.username}</span>
                    <span className="text-xs text-muted-foreground">{o.order_time}</span>
                    {o.status === "pending" ? (
                      <span className="text-xs text-muted-foreground">Total: {formatPKR(o.total_price)}</span>
                    ) : o.status === "canceled" ? (
                      <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>
                    ) : o.status === "delivered" ? (
                      <span className="text-xs text-muted-foreground">Paid: {formatPKR(o.total_price)}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Paid: {formatPKR(o.total_price * 0.5)} | Remaining: {formatPKR(o.total_price * 0.5)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Colored badge showing current status */}
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
                    >
                      {o.status}
                    </span>
                    {/* Select styled with matching border color; trigger confirmation */}
                    <select
                      className={`rounded px-2 py-1 border ${STATUS_STYLES[o.status]?.border ?? "border-gray-300"}`}
                      value={o.status}
                      onChange={(e) => handleStatusChange(o, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="canceled">canceled</option>
                    </select>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {o.products.map((i) => (
                    <li key={i.product_name + i.size} className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2">
                      <span>
                        {i.product_name} {i.size ? `(${i.size})` : ""} × {i.quantity} — {formatPKR(i.price)}
                      </span>
                    </li>
                  ))}
                  {o.products.length === 0 && (
                    <li className="text-muted-foreground">No products in order.</li>
                  )}
                </ul>
              </div>
            ))}
            {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
          </div>
        )}
      </section>

      {/* ---------------- USERS & CARTS SECTION ---------------- */}
      <section>
        <h2 className="font-serif text-2xl">Users & Carts</h2>
        <div className="mt-4 space-y-3">
          {users.map((u) => {
            const cart = userCarts[u.id] ?? [];
            return (
              <div key={u.id} className="space-y-3 rounded-lg border p-4">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div className="font-medium">
                    {u.name} · {u.email}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cart items: {cart.length}
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {cart.map((i) => (
                    <li
                      key={i.id + (i.size ?? "")}
                      className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2"
                    >
                      <span className="min-w-[200px] flex-1 flex">
                        {i.name} {i.size ? `(${i.size})` : ""} × {i.qty}
                      </span>
                    </li>
                  ))}
                  {cart.length === 0 && (
                    <li className="text-muted-foreground">Cart is empty.</li>
                  )}
                </ul>
              </div>
            );
          })}
          {users.length === 0 && <p className="text-muted-foreground">No users yet.</p>}
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change {selectedOrder?.username}'s status from{" "}
              {selectedOrder?.status} to {newStatus}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelStatusChange}>
              Cancel
            </Button>
            <Button onClick={confirmStatusChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}