// // import { FormEvent, useMemo, useState, useEffect } from "react";
// // import { useAuth } from "@/context/AuthContext";
// // import { formatPKR } from "@/lib/currency";
// // import { Button } from "@/components/ui/button";
// // import { API_BASE_URL } from "@/lib/api-config";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Star } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // interface ReviewTarget {
// //   orderId: number;
// //   productId: string;
// //   productName: string;
// //   size?: string;
// // }

// // interface OrderItem {
// //   product_id: string;
// //   product_name: string;
// //   quantity: number;
// //   size?: string;
// //   price: number;
// // }

// // interface Order {
// //   order_id: number;
// //   user_id: number;
// //   username: string;
// //   status: string;
// //   total_products: number;
// //   total_price: number;
// //   products: OrderItem[];
// //   order_time: string;
// // }

// // export default function Orders() {
// //   const { user } = useAuth();
// //   const [dialogOpen, setDialogOpen] = useState(false);
// //   const [activeTarget, setActiveTarget] = useState<ReviewTarget | null>(null);
// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshToken, setRefreshToken] = useState(0);
// //   const [reviewStatus, setReviewStatus] = useState<{ [key: string]: boolean }>({});

// //   // Map statuses to badge and border styles
// //   const STATUS_STYLES: Record<string, { badge: string; border: string; card?: string }> = {
// //     pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", card: "bg-yellow-50" },
// //     processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300", card: "bg-blue-50" },
// //     shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300", card: "bg-indigo-50" },
// //     delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300", card: "bg-green-50" },
// //     canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300", card: "bg-red-50" },
// //   };

// //   useEffect(() => {
// //     if (!user?.id) {
// //       setLoading(false);
// //       return;
// //     }

// //     async function fetchOrders() {
// //       try {
// //         setLoading(true);
// //         const userId = parseInt(user.id, 10);
// //         if (isNaN(userId)) {
// //           console.error("Invalid user ID:", user.id);
// //           setOrders([]);
// //           return;
// //         }
// //         const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
// //         if (!response.ok) {
// //           if (response.status === 404) {
// //             setOrders([]);
// //             return;
// //           }
// //           throw new Error(`Failed to fetch orders: ${response.statusText}`);
// //         }
// //         const data: Order[] = await response.json();
// //         setOrders(data);

// //         const statusMap: { [key: string]: boolean } = {};
// //         for (const order of data) {
// //           for (const item of order.products) {
// //             const key = `${order.order_id}-${item.product_id}-${item.size ?? ""}`;
// //             const reviewed = await hasReviewForOrderItem({
// //               userId,
// //               orderId: order.order_id,
// //               productId: item.product_id,
// //               size: item.size,
// //             });
// //             statusMap[key] = reviewed;
// //           }
// //         }
// //         setReviewStatus(statusMap);
// //       } catch (error) {
// //         console.error("Failed to fetch orders:", error);
// //         setOrders([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchOrders();
// //   }, [user?.id, refreshToken]);

// //   const openReviewDialog = (target: ReviewTarget) => {
// //     setActiveTarget(target);
// //     setRating(5);
// //     setComment("");
// //     setDialogOpen(true);
// //   };

// //   const closeDialog = () => {
// //     setDialogOpen(false);
// //     setActiveTarget(null);
// //     setComment("");
// //   };

// //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     if (!activeTarget || !user) return;

// //     const userId = parseInt(user.id, 10);
// //     if (isNaN(userId)) {
// //       console.error("Invalid user ID:", user.id);
// //       alert("Invalid user ID. Please try again.");
// //       return;
// //     }

// //     const reviewData = {
// //       user_id: userId,
// //       product_id: activeTarget.productId,
// //       stars: rating,
// //       text: comment || undefined,
// //       time: new Date().toISOString().split('T')[0],
// //     };

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/reviews/`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(reviewData),
// //       });
// //       if (!response.ok) {
// //         throw new Error(`Failed to create review: ${response.statusText}`);
// //       }
// //       const key = `${activeTarget.orderId}-${activeTarget.productId}-${activeTarget.size ?? ""}`;
// //       setReviewStatus((prev) => ({ ...prev, [key]: true }));
// //       setRefreshToken((prev) => prev + 1);
// //       closeDialog();
// //     } catch (error) {
// //       console.error("Failed to create review:", error);
// //       alert("Failed to submit review. Please try again.");
// //     }
// //   };

// //   const hasReviewForOrderItem = async (params: {
// //     userId: number;
// //     orderId: number;
// //     productId: string;
// //     size?: string;
// //   }) => {
// //     try {
// //       const response = await fetch(
// //         `${API_BASE_URL}/reviews/check?user_id=${params.userId}&order_id=${params.orderId}&product_id=${params.productId}${params.size ? `&size=${params.size}` : ""}`
// //       );
// //       if (!response.ok) {
// //         return false;
// //       }
// //       const data = await response.json();
// //       return data.reviewed;
// //     } catch (error) {
// //       console.error("Error checking review:", error);
// //       return false;
// //     }
// //   };

// //   if (!user) return <div className="container py-10">Please login to view your orders.</div>;
// //   if (loading) return <div className="container py-10">Loading orders...</div>;

// //   return (
// //     <main className="container py-10">
// //       <h1 className="font-serif text-3xl">My Orders</h1>
// //       {orders.length === 0 ? (
// //         <p className="mt-4 text-muted-foreground">No orders yet.</p>
// //       ) : (
// //         <div className="mt-6 space-y-4">
// //           {orders.map((o) => (
// //             <div
// //               key={o.order_id}
// //               className={`border rounded-lg p-4 space-y-3 ${STATUS_STYLES[o.status]?.border ?? "border-gray-200"} ${STATUS_STYLES[o.status]?.card ?? ""}`}
// //             >
// //               <div className="flex items-center justify-between gap-4">
// //                 {/* Left: order info */}
// //                 <div className="flex flex-col">
// //                   <span className="text-sm font-medium">Order #{o.order_id}</span>
// //                   <span className="text-xs text-muted-foreground">{o.order_time}</span>
// //                   {o.status === "pending" ? (
// //                     <span className="text-xs text-muted-foreground">Total: {formatPKR(o.total_price)}</span>
// //                   ) : o.status === "canceled" ? (
// //                     <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>
// //                   ) : o.status === "delivered" ? (
// //                     <span className="text-xs text-muted-foreground">Paid: {formatPKR(o.total_price)}</span>
// //                   ) : (
// //                     <span className="text-xs text-muted-foreground">
// //                       Paid: {formatPKR(o.total_price * 0.5)} | Remaining: {formatPKR(o.total_price * 0.5)}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {/* Right: dominant status pill */}
// //                 <div className="flex items-center">
// //                   <span
// //                     className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
// //                   >
// //                     {o.status.replace("_", " ")}
// //                   </span>
// //                 </div>
// //               </div>
// //               <ul className="space-y-2">
// //                 {o.products.map((item) => {
// //                   const key = `${o.order_id}-${item.product_id}-${item.size ?? ""}`;
// //                   const reviewed = reviewStatus[key] ?? false;

// //                   return (
// //                     <li
// //                       key={`${item.product_id}-${item.size ?? ""}`}
// //                       className="flex flex-col gap-1 rounded-md border border-dashed p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-3"
// //                     >
// //                       <span>
// //                         {item.product_name} {item.size ? `(${item.size})` : ""} × {item.quantity} —{" "}
// //                         {formatPKR(item.price)}
// //                       </span>
// //                       {reviewed ? (
// //                         <Button variant="secondary" size="sm" disabled>
// //                           Review submitted
// //                         </Button>
// //                       ) : (
// //                         <Button
// //                           size="sm"
// //                           onClick={() =>
// //                             openReviewDialog({
// //                               orderId: o.order_id,
// //                               productId: item.product_id,
// //                               productName: item.product_name,
// //                               size: item.size,
// //                             })
// //                           }
// //                         >
// //                           Give Review
// //                         </Button>
// //                       )}
// //                     </li>
// //                   );
// //                 })}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       <Dialog
// //         open={dialogOpen}
// //         onOpenChange={(open) => {
// //           if (open) {
// //             setDialogOpen(true);
// //           } else {
// //             closeDialog();
// //           }
// //         }}
// //       >
// //         <DialogContent>
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <DialogHeader>
// //               <DialogTitle>Review {activeTarget?.productName}</DialogTitle>
// //               <DialogDescription>Share your experience to help others.</DialogDescription>
// //             </DialogHeader>

// //             <div className="space-y-2">
// //               <span className="text-sm font-medium">Rating</span>
// //               <div className="flex gap-2">
// //                 {Array.from({ length: 5 }).map((_, index) => {
// //                   const value = index + 1;
// //                   const active = value <= rating;
// //                   return (
// //                     <button
// //                       key={value}
// //                       type="button"
// //                       onClick={() => setRating(value)}
// //                       className={cn(
// //                         "rounded-full border px-3 py-2 transition",
// //                         active
// //                           ? "border-accent bg-accent text-accent-foreground"
// //                           : "border-input bg-background text-muted-foreground hover:border-accent hover:text-foreground"
// //                       )}
// //                     >
// //                       <Star className={cn("h-4 w-4", active ? "fill-current" : "")} />
// //                     </button>
// //                   );
// //                 })}
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               <label htmlFor="review-comment" className="text-sm font-medium">
// //                 Description (optional)
// //               </label>
// //               <Textarea
// //                 id="review-comment"
// //                 value={comment}
// //                 onChange={(event) => setComment(event.target.value)}
// //                 placeholder="Share any thoughts you have about this product."
// //               />
// //             </div>

// //             <DialogFooter>
// //               <Button type="button" variant="outline" onClick={closeDialog}>
// //                 Cancel
// //               </Button>
// //               <Button type="submit">Submit Review</Button>
// //             </DialogFooter>
// //           </form>
// //         </DialogContent>
// //       </Dialog>
// //     </main>
// //   );
// // }






















// import { FormEvent, useMemo, useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { formatPKR } from "@/lib/currency";
// import { getDiscountForCollection, applyDiscount } from "@/data/discount";
// import { getProduct } from "@/data/catalog";
// import { Button } from "@/components/ui/button";
// import { API_BASE_URL } from "@/lib/api-config";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Star } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ReviewTarget {
//   orderId: number;
//   productId: string;
//   productName: string;
//   size?: string;
// }

// interface OrderItem {
//   product_id: string;
//   product_name: string;
//   quantity: number;
//   size?: string;
//   price: number;
// }

// interface Order {
//   order_id: number;
//   user_id: number;
//   username: string;
//   status: string;
//   total_products: number;
//   total_price: number;
//   products: OrderItem[];
//   order_time: string;
// }

// export default function Orders() {
//   const { user } = useAuth();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [activeTarget, setActiveTarget] = useState<ReviewTarget | null>(null);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshToken, setRefreshToken] = useState(0);
//   const [reviewStatus, setReviewStatus] = useState<{ [key: string]: boolean }>({});

//   // Map statuses to badge and border styles
//   const STATUS_STYLES: Record<string, { badge: string; border: string; card?: string }> = {
//     pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", card: "bg-yellow-50" },
//     processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300", card: "bg-blue-50" },
//     shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300", card: "bg-indigo-50" },
//     delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300", card: "bg-green-50" },
//     canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300", card: "bg-red-50" },
//   };

//   useEffect(() => {
//     if (!user?.id) {
//       setLoading(false);
//       return;
//     }

//     async function fetchOrders() {
//       try {
//         setLoading(true);
//         const userId = parseInt(user.id, 10);
//         if (isNaN(userId)) {
//           console.error("Invalid user ID:", user.id);
//           setOrders([]);
//           return;
//         }
//         const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
//         if (!response.ok) {
//           if (response.status === 404) {
//             setOrders([]);
//             return;
//           }
//           throw new Error(`Failed to fetch orders: ${response.statusText}`);
//         }
//         const data: Order[] = await response.json();
//         setOrders(data);

//         const statusMap: { [key: string]: boolean } = {};
//         for (const order of data) {
//           for (const item of order.products) {
//             const key = `${order.order_id}-${item.product_id}-${item.size ?? ""}`;
//             const reviewed = await hasReviewForOrderItem({
//               userId,
//               orderId: order.order_id,
//               productId: item.product_id,
//               size: item.size,
//             });
//             statusMap[key] = reviewed;
//           }
//         }
//         setReviewStatus(statusMap);
//       } catch (error) {
//         console.error("Failed to fetch orders:", error);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrders();
//   }, [user?.id, refreshToken]);

//   const openReviewDialog = (target: ReviewTarget) => {
//     setActiveTarget(target);
//     setRating(5);
//     setComment("");
//     setDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setDialogOpen(false);
//     setActiveTarget(null);
//     setComment("");
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!activeTarget || !user) return;

//     const userId = parseInt(user.id, 10);
//     if (isNaN(userId)) {
//       console.error("Invalid user ID:", user.id);
//       alert("Invalid user ID. Please try again.");
//       return;
//     }

//     const reviewData = {
//       user_id: userId,
//       product_id: activeTarget.productId,
//       stars: rating,
//       text: comment || undefined,
//       time: new Date().toISOString().split('T')[0],
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/reviews/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(reviewData),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to create review: ${response.statusText}`);
//       }
//       const key = `${activeTarget.orderId}-${activeTarget.productId}-${activeTarget.size ?? ""}`;
//       setReviewStatus((prev) => ({ ...prev, [key]: true }));
//       setRefreshToken((prev) => prev + 1);
//       closeDialog();
//     } catch (error) {
//       console.error("Failed to create review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   const hasReviewForOrderItem = async (params: {
//     userId: number;
//     orderId: number;
//     productId: string;
//     size?: string;
//   }) => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/reviews/check?user_id=${params.userId}&order_id=${params.orderId}&product_id=${params.productId}${params.size ? `&size=${params.size}` : ""}`
//       );
//       if (!response.ok) {
//         return false;
//       }
//       const data = await response.json();
//       return data.reviewed;
//     } catch (error) {
//       console.error("Error checking review:", error);
//       return false;
//     }
//   };

//   if (!user) return <div className="container py-10">Please login to view your orders.</div>;
//   if (loading) return <div className="container py-10">Loading orders...</div>;

//   return (
//     <main className="container py-10">
//       <h1 className="font-serif text-3xl">My Orders</h1>
//       {orders.length === 0 ? (
//         <p className="mt-4 text-muted-foreground">No orders yet.</p>
//       ) : (
//         <div className="mt-6 space-y-4">
//           {orders.map((o) => (
//             <div
//               key={o.order_id}
//               className={`border rounded-lg p-4 space-y-3 ${STATUS_STYLES[o.status]?.border ?? "border-gray-200"} ${STATUS_STYLES[o.status]?.card ?? ""}`}
//             >
//               <div className="flex items-center justify-between gap-4">
//                 {/* Left: order info */}
//                 <div className="flex flex-col">
//                   <span className="text-sm font-medium">Order #{o.order_id}</span>
//                   <span className="text-xs text-muted-foreground">{o.order_time}</span>
//                   {(() => {
//                     // Recompute displayed total using discounts when possible
//                     const computedTotal = o.products.reduce((s, item) => {
//                       const qty = item.quantity || 1;
//                       const prod = getProduct(String(item.product_id));
//                       const pct = prod ? getDiscountForCollection(prod.collection) : 0;
//                       const unit = qty > 0 ? Number(item.price) / qty : Number(item.price);
//                       const discountedUnit = applyDiscount(unit, pct);
//                       const line = Math.round(discountedUnit * qty);
//                       return s + line;
//                     }, 0);

//                     if (o.status === "pending") {
//                       return <span className="text-xs text-muted-foreground">Total: {formatPKR(computedTotal)}</span>;
//                     }

//                     if (o.status === "canceled") {
//                       return <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>;
//                     }

//                     if (o.status === "delivered") {
//                       return <span className="text-xs text-muted-foreground">Paid: {formatPKR(computedTotal)}</span>;
//                     }

//                     return (
//                       <span className="text-xs text-muted-foreground">Paid: {formatPKR(Math.round(computedTotal * 0.5))} | Remaining: {formatPKR(Math.round(computedTotal * 0.5))}</span>
//                     );
//                   })()}
//                 </div>

//                 {/* Right: dominant status pill */}
//                 <div className="flex items-center">
//                   <span
//                     className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
//                   >
//                     {o.status.replace("_", " ")}
//                   </span>
//                 </div>
//               </div>
//               <ul className="space-y-2">
//                 {o.products.map((item) => {
//                   const key = `${o.order_id}-${item.product_id}-${item.size ?? ""}`;
//                   const reviewed = reviewStatus[key] ?? false;

//                   // Compute discounted line price when possible
//                   const qty = item.quantity || 1;
//                   const prod = getProduct(String(item.product_id));
//                   const pct = prod ? getDiscountForCollection(prod.collection) : 0;
//                   const unit = qty > 0 ? Number(item.price) / qty : Number(item.price);
//                   const discountedUnit = applyDiscount(unit, pct);
//                   const linePrice = Math.round(discountedUnit * qty);

//                   return (
//                     <li
//                       key={`${item.product_id}-${item.size ?? ""}`}
//                       className="flex flex-col gap-1 rounded-md border border-dashed p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-3"
//                     >
//                       <span>
//                         {item.product_name} {item.size ? `(${item.size})` : ""} × {item.quantity} — {formatPKR(linePrice)}
//                         {pct > 0 && <span className="ml-2 text-xs text-muted-foreground line-through">{formatPKR(Number(item.price))}</span>}
//                       </span>
//                       {reviewed ? (
//                         <Button variant="secondary" size="sm" disabled>
//                           Review submitted
//                         </Button>
//                       ) : (
//                         <Button
//                           size="sm"
//                           onClick={() =>
//                             openReviewDialog({
//                               orderId: o.order_id,
//                               productId: item.product_id,
//                               productName: item.product_name,
//                               size: item.size,
//                             })
//                           }
//                         >
//                           Give Review
//                         </Button>
//                       )}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}

//       <Dialog
//         open={dialogOpen}
//         onOpenChange={(open) => {
//           if (open) {
//             setDialogOpen(true);
//           } else {
//             closeDialog();
//           }
//         }}
//       >
//         <DialogContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <DialogHeader>
//               <DialogTitle>Review {activeTarget?.productName}</DialogTitle>
//               <DialogDescription>Share your experience to help others.</DialogDescription>
//             </DialogHeader>

//             <div className="space-y-2">
//               <span className="text-sm font-medium">Rating</span>
//               <div className="flex gap-2">
//                 {Array.from({ length: 5 }).map((_, index) => {
//                   const value = index + 1;
//                   const active = value <= rating;
//                   return (
//                     <button
//                       key={value}
//                       type="button"
//                       onClick={() => setRating(value)}
//                       className={cn(
//                         "rounded-full border px-3 py-2 transition",
//                         active
//                           ? "border-accent bg-accent text-accent-foreground"
//                           : "border-input bg-background text-muted-foreground hover:border-accent hover:text-foreground"
//                       )}
//                     >
//                       <Star className={cn("h-4 w-4", active ? "fill-current" : "")} />
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="review-comment" className="text-sm font-medium">
//                 Description (optional)
//               </label>
//               <Textarea
//                 id="review-comment"
//                 value={comment}
//                 onChange={(event) => setComment(event.target.value)}
//                 placeholder="Share any thoughts you have about this product."
//               />
//             </div>

//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={closeDialog}>
//                 Cancel
//               </Button>
//               <Button type="submit">Submit Review</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </main>
//   );
// }





























import { FormEvent, useMemo, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { formatPKR } from "@/lib/currency";
import { getDiscountForCollection, applyDiscount } from "@/data/discount";
import { getProduct } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewTarget {
  orderId: number;
  productId: string;
  productName: string;
  size?: string;
}

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  size?: string;
  price: number;
}

interface Order {
  order_id: number;
  user_id: number;
  username: string;
  status: string;
  total_products: number;
  total_price: number;
  products: OrderItem[];
  order_time: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<ReviewTarget | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(0);
  const [reviewStatus, setReviewStatus] = useState<{ [key: string]: boolean }>({});

  // Map statuses to badge and border styles
  const STATUS_STYLES: Record<string, { badge: string; border: string; card?: string }> = {
    pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", card: "bg-yellow-50" },
    processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300", card: "bg-blue-50" },
    shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300", card: "bg-indigo-50" },
    delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300", card: "bg-green-50" },
    canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300", card: "bg-red-50" },
  };

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        setLoading(true);
        const userId = parseInt(user.id, 10);
        if (isNaN(userId)) {
          console.error("Invalid user ID:", user.id);
          setOrders([]);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
        if (!response.ok) {
          if (response.status === 404) {
            setOrders([]);
            return;
          }
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
        const data: Order[] = await response.json();
        setOrders(data);

        const statusMap: { [key: string]: boolean } = {};
        for (const order of data) {
          for (const item of order.products) {
            const key = `${order.order_id}-${item.product_id}-${item.size ?? ""}`;
            const reviewed = await hasReviewForOrderItem({
              userId,
              orderId: order.order_id,
              productId: item.product_id,
              size: item.size,
            });
            statusMap[key] = reviewed;
          }
        }
        setReviewStatus(statusMap);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user?.id, refreshToken]);

  const openReviewDialog = (target: ReviewTarget) => {
    setActiveTarget(target);
    setRating(5);
    setComment("");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setActiveTarget(null);
    setComment("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeTarget || !user) return;

    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID:", user.id);
      alert("Invalid user ID. Please try again.");
      return;
    }

    const reviewData = {
      user_id: userId,
      product_id: activeTarget.productId,
      stars: rating,
      text: comment || undefined,
      time: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create review: ${response.statusText}`);
      }
      const key = `${activeTarget.orderId}-${activeTarget.productId}-${activeTarget.size ?? ""}`;
      setReviewStatus((prev) => ({ ...prev, [key]: true }));
      setRefreshToken((prev) => prev + 1);
      closeDialog();
    } catch (error) {
      console.error("Failed to create review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const hasReviewForOrderItem = async (params: {
    userId: number;
    orderId: number;
    productId: string;
    size?: string;
  }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/reviews/check?user_id=${params.userId}&order_id=${params.orderId}&product_id=${params.productId}${params.size ? `&size=${params.size}` : ""}`
      );
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data.reviewed;
    } catch (error) {
      console.error("Error checking review:", error);
      return false;
    }
  };

  if (!user) return <div className="container py-10">Please login to view your orders.</div>;
  if (loading) return <div className="container py-10">Loading orders...</div>;

  return (
    <main className="container py-10">
      <h1 className="font-serif text-3xl">My Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div
              key={o.order_id}
              className={`border rounded-lg p-4 space-y-3 ${STATUS_STYLES[o.status]?.border ?? "border-gray-200"} ${STATUS_STYLES[o.status]?.card ?? ""}`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left: order info */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Order #R{o.order_id}{o.order_time.slice(-2)}</span>
                  <span className="text-xs text-muted-foreground">{o.order_time}</span>
                  {(() => {
                    // Recompute displayed total using discounts when possible
                    const computedTotal = o.products.reduce((s, item) => {
                      const qty = item.quantity || 1;
                      const prod = getProduct(String(item.product_id));
                      const pct = prod ? getDiscountForCollection(prod.collection) : 0;
                      const unit = qty > 0 ? Number(item.price) / qty : Number(item.price);
                      const discountedUnit = applyDiscount(unit, pct);
                      const line = Math.round(discountedUnit * qty);
                      return s + line;
                    }, 0);

                    const totalQty = o.products.reduce((sum, item) => sum + (item.quantity || 1), 0);
                    const deliveryCharge = totalQty < 3 ? 300 : 0;
                    const totalWithDelivery = computedTotal + deliveryCharge;

                    if (o.status === "pending") {
                      return (
                        <div className="text-xs text-muted-foreground space-y-1">
                          <span className="block">Subtotal: {formatPKR(computedTotal)}</span>
                          {deliveryCharge > 0 && <span className="block text-orange-600">Delivery: {formatPKR(deliveryCharge)}</span>}
                          <span className="block font-medium">Total: {formatPKR(totalWithDelivery)}</span>
                        </div>
                      );
                    }

                    if (o.status === "canceled") {
                      return <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>;
                    }

                    if (o.status === "delivered") {
                      return (
                        <div className="text-xs text-muted-foreground space-y-1">
                          <span className="block">Paid: {formatPKR(totalWithDelivery)}</span>
                          {deliveryCharge > 0 && <span className="block text-sm text-orange-600">(includes {formatPKR(deliveryCharge)} delivery)</span>}
                        </div>
                      );
                    }

                    const advance = Math.round(totalWithDelivery * 0.25);
                    return (
                      <div className="text-xs text-muted-foreground space-y-1">
                        <span className="block">Subtotal: {formatPKR(computedTotal)}</span>
                        {deliveryCharge > 0 && <span className="block text-orange-600">Delivery: {formatPKR(deliveryCharge)}</span>}
                        <span className="block font-medium">Total: {formatPKR(totalWithDelivery)}</span>
                        <span className="block">Paid: {formatPKR(advance)} | Remaining: {formatPKR(totalWithDelivery - advance)}</span>
                      </div>
                    );
                  })()}
                </div>

                {/* Right: dominant status pill */}
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {o.status.replace("_", " ")}
                  </span>
                </div>
              </div>
              <ul className="space-y-2">
                {o.products.map((item) => {
                  const key = `${o.order_id}-${item.product_id}-${item.size ?? ""}`;
                  const reviewed = reviewStatus[key] ?? false;

                  // Compute discounted line price when possible
                  const qty = item.quantity || 1;
                  const prod = getProduct(String(item.product_id));
                  const pct = prod ? getDiscountForCollection(prod.collection) : 0;
                  const unit = qty > 0 ? Number(item.price) / qty : Number(item.price);
                  const discountedUnit = applyDiscount(unit, pct);
                  const linePrice = Math.round(discountedUnit * qty);

                  return (
                    <li
                      key={`${item.product_id}-${item.size ?? ""}`}
                      className="flex flex-col gap-1 rounded-md border border-dashed p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-3"
                    >
                      <span>
                        {item.product_name} {item.size ? `(${item.size})` : ""} × {item.quantity} — {formatPKR(linePrice)}
                        {pct > 0 && <span className="ml-2 text-xs text-muted-foreground line-through">{formatPKR(Number(item.price))}</span>}
                      </span>
                      {reviewed ? (
                        <Button variant="secondary" size="sm" disabled>
                          Review submitted
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() =>
                            openReviewDialog({
                              orderId: o.order_id,
                              productId: item.product_id,
                              productName: item.product_name,
                              size: item.size,
                            })
                          }
                        >
                          Give Review
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (open) {
            setDialogOpen(true);
          } else {
            closeDialog();
          }
        }}
      >
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Review {activeTarget?.productName}</DialogTitle>
              <DialogDescription>Share your experience to help others.</DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <span className="text-sm font-medium">Rating</span>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1;
                  const active = value <= rating;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={cn(
                        "rounded-full border px-3 py-2 transition",
                        active
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-input bg-background text-muted-foreground hover:border-accent hover:text-foreground"
                      )}
                    >
                      <Star className={cn("h-4 w-4", active ? "fill-current" : "")} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="review-comment" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Share any thoughts you have about this product."
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
