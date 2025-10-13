// import { useState } from "react";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useCart } from "@/context/CartContext";
// import { formatPKR } from "@/lib/currency";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/context/AuthContext";

// export function CartSheet() {
//   const { items, subtotal, updateQty, removeItem, clear } = useCart();
//   const { user } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [payment, setPayment] = useState<"jazzcash" | "bank">("jazzcash");

//   const advance = Math.round(subtotal * 0.5);

//   const onConfirm = async () => {
//     if (!user || items.length === 0) return;
//     const userId = parseInt(user.id, 10);
//     if (isNaN(userId)) {
//       console.error("Invalid user ID:", user.id);
//       alert("Invalid user ID. Please try again.");
//       return;
//     }

//     const orderData = {
//       user_id: userId,
//       order_time: new Date().toISOString().split("T")[0],
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:8000/orders/from-cart/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.detail || `Failed to create order: ${response.statusText}`);
//       }
//       // Backend clears cart via /orders/from-cart/, so call clear to sync frontend
//       await clear();
//       setOpen(false);
//       alert("Order placed! We will verify your advance and update status.");
//       // Refresh the page to ensure frontend reflects cleared cart
//       window.location.reload();
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert(error.message || "Failed to place order. Please check stock or try again.");
//     }
//   };

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button className="relative">
//           Cart
//           <span className="ml-2 rounded-full bg-accent text-accent-foreground px-2 text-xs">
//             {items.reduce((s, i) => s + i.qty, 0)}
//           </span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-lg">
//         <SheetHeader>
//           <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
//         </SheetHeader>
//         <div className="mt-6 space-y-4">
//           {items.length === 0 ? (
//             <p className="text-muted-foreground">Your cart is empty.</p>
//           ) : (
//             items.map((item) => (
//               <div key={`${item.id}-${item.size}`} className="flex gap-3 border rounded-lg p-3">
//                 <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between gap-2">
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-xs text-muted-foreground">{item.size ?? ""} {item.collection ? `· ${item.collection}` : ""}</p>
//                     </div>
//                     <button
//                       className="text-sm text-destructive"
//                       onClick={() => {
//                         console.log("Removing item:", { id: item.id, size: item.size });
//                         removeItem(item.id, item.size);
//                       }}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <div className="mt-2 flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Button
//                         className="bg-secondary text-secondary-foreground"
//                         onClick={() => updateQty(item.id, item.size!, Math.max(1, item.qty - 1))}
//                       >
//                         -
//                       </Button>
//                       <Input
//                         value={item.qty}
//                         onChange={(e) => updateQty(item.id, item.size!, Number(e.target.value) || 1)}
//                         className="w-16 text-center"
//                       />
//                       <Button
//                         className="bg-secondary text-secondary-foreground"
//                         onClick={() => updateQty(item.id, item.size!, item.qty + 1)}
//                       >
//                         +
//                       </Button>
//                     </div>
//                     <p className="font-medium">{formatPKR(item.price)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="mt-6 border-t pt-4 space-y-2">
//           <div className="flex justify-between text-sm">
//             <span>Subtotal</span>
//             <span className="font-medium">{formatPKR(subtotal)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Advance (50%)</span>
//             <span className="font-medium">{formatPKR(advance)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Remaining on Delivery</span>
//             <span className="font-medium">{formatPKR(Math.max(0, subtotal - advance))}</span>
//           </div>
//         </div>
//         <div className="mt-4 flex gap-2">
//           <Button
//             className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
//             onClick={clear}
//             disabled={items.length === 0}
//           >
//             Clear
//           </Button>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="flex-1" disabled={!user || items.length === 0}>
//                 {user ? "Proceed to Checkout" : "Login to Checkout"}
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle className="font-serif">Confirm Advance Payment</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <p className="text-sm text-muted-foreground">Pay 50% advance to confirm your order. Select a method:</p>
//                 <RadioGroup value={payment} onValueChange={(v) => setPayment(v as any)} className="grid grid-cols-2 gap-3">
//                   <div className="flex items-center gap-2 border rounded-lg p-3">
//                     <RadioGroupItem value="jazzcash" id="jazz" />
//                     <Label htmlFor="jazz">JazzCash</Label>
//                   </div>
//                   <div className="flex items-center gap-2 border rounded-lg p-3">
//                     <RadioGroupItem value="bank" id="bank" />
//                     <Label htmlFor="bank">Bank Transfer</Label>
//                   </div>
//                 </RadioGroup>
//                 <div className="rounded-lg bg-secondary p-3 text-sm">
//                   <p className="font-medium">Amount to pay now: {formatPKR(advance)}</p>
//                   {payment === "jazzcash" ? (
//                     <p className="mt-2">Send to JazzCash number 03328425042 and share screenshot on WhatsApp. We will verify and update your order status.</p>
//                   ) : (
//                     <p className="mt-2">Transfer to Bank Account (shared after order confirmation). Email proof to itsmywork1019@gmail.com.</p>
//                   )}
//                 </div>
//                 <Button onClick={onConfirm} disabled={!user}>I have paid the advance</Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }







import { useState } from "react";
import { API_BASE_URL } from "@/lib/api-config";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/lib/currency";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog";

export function CartSheet() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState<"jazzcash" | "bank">("jazzcash");
  const [showSuccess, setShowSuccess] = useState(false);

  const advance = Math.round(subtotal * 0.5);

  const onConfirm = async () => {
    if (!user || items.length === 0) return;
    const userId = parseInt(user.id, 10);
    if (isNaN(userId)) {
      console.error("Invalid user ID:", user.id);
      alert("Invalid user ID. Please try again.");
      return;
    }

    const orderData = {
      user_id: userId,
      order_time: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders/from-cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to create order: ${response.statusText}`);
      }
      await clear();
      setOpen(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert(error.message || "Failed to place order. Please check stock or try again.");
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="relative">
            Cart
            <span className="ml-2 rounded-full bg-accent text-accent-foreground px-2 text-xs">
              {items.reduce((s, i) => s + i.qty, 0)}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 border rounded-lg p-3">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size ?? ""} {item.collection ? `· ${item.collection}` : ""}</p>
                      </div>
                      <button
                        className="text-sm text-destructive"
                        onClick={() => {
                          console.log("Removing item:", { id: item.id, size: item.size });
                          removeItem(item.id, item.size);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          className="bg-secondary text-secondary-foreground"
                          onClick={() => updateQty(item.id, item.size!, Math.max(1, item.qty - 1))}
                        >
                          -
                        </Button>
                        <Input
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, item.size!, Number(e.target.value) || 1)}
                          className="w-16 text-center"
                        />
                        <Button
                          className="bg-secondary text-secondary-foreground"
                          onClick={() => updateQty(item.id, item.size!, item.qty + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <p className="font-medium">{formatPKR(item.price)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Advance (50%)</span>
              <span className="font-medium">{formatPKR(advance)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining on Delivery</span>
              <span className="font-medium">{formatPKR(Math.max(0, subtotal - advance))}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              onClick={clear}
              disabled={items.length === 0}
            >
              Clear
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1" disabled={!user || items.length === 0}>
                  {user ? "Proceed to Checkout" : "Login to Checkout"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-serif">Confirm Advance Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Pay 50% advance to confirm your order. Select a method:</p>
                  <RadioGroup value={payment} onValueChange={(v) => setPayment(v as any)} className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 border rounded-lg p-3">
                      <RadioGroupItem value="jazzcash" id="jazz" />
                      <Label htmlFor="jazz">JazzCash</Label>
                    </div>
                    <div className="flex items-center gap-2 border rounded-lg p-3">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank">Bank Transfer</Label>
                    </div>
                  </RadioGroup>
                  <div className="rounded-lg bg-secondary p-3 text-sm">
                    <p className="font-medium">Amount to pay now: {formatPKR(advance)}</p>
                    {payment === "jazzcash" ? (
                      <p className="mt-2">Send to JazzCash number 03328425042 and share screenshot on WhatsApp. We will verify and update your order status.</p>
                    ) : (
                      <p className="mt-2">Transfer to Bank Account (shared after order confirmation). Email proof to itsmywork1019@gmail.com.</p>
                    )}
                  </div>
                  <Button onClick={onConfirm} disabled={!user}>I have paid the advance</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </SheetContent>
      </Sheet>
      <AlertDialog open={showSuccess} onOpenChange={(open) => {
        setShowSuccess(open);
        if (!open) window.location.reload();
      }}>
        <AlertDialogContent className="max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-center">Congratulations!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your order has been successfully placed! We will verify your advance and update the status soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction className="mx-auto w-1/2">OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}































