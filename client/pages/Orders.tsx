// import { FormEvent, useMemo, useState } from "react";
// import { listOrdersByUser } from "@/data/orders";
// import { useAuth } from "@/context/AuthContext";
// import { formatPKR } from "@/lib/currency";
// import { Button } from "@/components/ui/button";
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
// import { createReview, hasReviewForOrderItem } from "@/data/reviews";

// interface ReviewTarget {
//   orderId: string;
//   productId: string;
//   productName: string;
//   size?: string;
// }

// export default function Orders() {
//   const { user } = useAuth();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [activeTarget, setActiveTarget] = useState<ReviewTarget | null>(null);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [refreshToken, setRefreshToken] = useState(0);

//   if (!user) return <div className="container py-10">Please login to view your orders.</div>;

//   const orders = useMemo(() => listOrdersByUser(user.id), [user.id, refreshToken]);

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

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!activeTarget || !user) return;

//     createReview({
//       userId: user.id,
//       orderId: activeTarget.orderId,
//       productId: activeTarget.productId,
//       productName: activeTarget.productName,
//       rating,
//       comment,
//       size: activeTarget.size,
//     });

//     setRefreshToken((prev) => prev + 1);
//     closeDialog();
//   };

//   return (
//     <main className="container py-10">
//       <h1 className="font-serif text-3xl">My Orders</h1>
//       {orders.length === 0 ? (
//         <p className="mt-4 text-muted-foreground">No orders yet.</p>
//       ) : (
//         <div className="mt-6 space-y-4">
//           {orders.map((o) => (
//             <div key={o.id} className="border rounded-lg p-4 space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span>Order #{o.id.slice(0, 8)}</span>
//                 <span className="capitalize">Status: {o.status.replace("_", " ")}</span>
//               </div>
//               <ul className="space-y-2">
//                 {o.items.map((item) => {
//                   const reviewed = hasReviewForOrderItem({
//                     userId: user.id,
//                     orderId: o.id,
//                     productId: item.id,
//                     size: item.size,
//                   });

//                   return (
//                     <li key={item.id + (item.size ?? "")} className="flex flex-col gap-1 rounded-md border border-dashed p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-3">
//                       <span>
//                         {item.name} {item.size ? `(${item.size})` : ""} × {item.qty} — {formatPKR(item.price * item.qty)}
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
//                               orderId: o.id,
//                               productId: item.id,
//                               productName: item.name,
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
//                           : "border-input bg-background text-muted-foreground hover:border-accent hover:text-foreground",
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
import { Button } from "@/components/ui/button";
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
  product_id: string; // Added product_id
  product_name: string;
  quantity: number;
  size?: string;
  price?: number;
}

interface Order {
  order_id: number;
  username: string;
  status: string;
  total_products: number;
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
        const response = await fetch(`http://127.0.0.1:8000/users/${userId}/orders`);
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
              productId: item.product_id, // Use product_id
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
      product_id: activeTarget.productId, // Use productId
      stars: rating,
      text: comment || undefined,
      time: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/reviews/", {
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
        `http://127.0.0.1:8000/reviews/check?user_id=${params.userId}&order_id=${params.orderId}&product_id=${params.productId}${params.size ? `&size=${params.size}` : ""}`
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
            <div key={o.order_id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Order #{o.order_id}</span>
                <span className="capitalize">Status: {o.status.replace("_", " ")}</span>
              </div>
              <ul className="space-y-2">
                {o.products.map((item) => {
                  const key = `${o.order_id}-${item.product_id}-${item.size ?? ""}`;
                  const reviewed = reviewStatus[key] ?? false;

                  return (
                    <li
                      key={`${item.product_id}-${item.size ?? ""}`}
                      className="flex flex-col gap-1 rounded-md border border-dashed p-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-3"
                    >
                      <span>
                        {item.product_name} {item.size ? `(${item.size})` : ""} × {item.quantity} —{" "}
                        {formatPKR(item.price ? item.price * item.quantity : 0)}
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
                              productId: item.product_id, // Use product_id
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