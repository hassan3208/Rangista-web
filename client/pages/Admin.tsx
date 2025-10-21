// // import { useCallback, useEffect, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { useAuth } from "@/context/AuthContext";
// // import type { CartItem } from "@/context/CartContext";
// // import { listAllUsers, StoredUser } from "../data/users";
// // import { readUserCart } from "@/data/carts";
// // import { API_BASE_URL } from "@/lib/api-config";
// // import { formatPKR } from "@/lib/currency";
// // import { X, Plus } from "lucide-react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Label } from "@/components/ui/label";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";

// // const COLLECTIONS = [
// //   "Eid Collection",
// //   "Bakra Eid Specials",
// //   "14 August Independence Collection",
// //   "Birthday Specials",
// // ] as const;

// // const ALLOWED_ADMIN_EMAILS = new Set([
// //   "l1f22bscs1019@ucp.edu.pk",
// //   "itsmywork1019@gmail.com",
// //   "rangistaarttowear@gmail.com",
// // ]);

// // interface ProductFormData {
// //   id: string;
// //   name: string;
// //   image: string;
// //   images: string[];
// //   collection: string;
// //   XS_price: string;
// //   S_price: string;
// //   M_price: string;
// //   L_price: string;
// //   XL_price: string;
// //   XXL_price: string;
// //   XS_stock: string;
// //   S_stock: string;
// //   M_stock: string;
// //   L_stock: string;
// //   XL_stock: string;
// //   XXL_stock: string;
// //   kids: boolean;
// // }

// // interface OrderProduct {
// //   product_name: string;
// //   quantity: number;
// //   size: string;
// //   price: number;
// // }

// // interface Order {
// //   order_id: number;
// //   user_id: number;
// //   username: string;
// //   status: string;
// //   total_products: number;
// //   total_price: number;
// //   products: OrderProduct[];
// //   order_time: string;
// // }

// // export default function Admin() {
// //   const { user } = useAuth();
// //   const [unlocked, setUnlocked] = useState(false);
// //   const [pass, setPass] = useState("");
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [users, setUsers] = useState<StoredUser[]>([]);
// //   const [userCarts, setUserCarts] = useState<Record<string, CartItem[]>>({});
// //   const [loadingOrders, setLoadingOrders] = useState(true);
// //   const [confirmationOpen, setConfirmationOpen] = useState(false);
// //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// //   const [newStatus, setNewStatus] = useState<string>("");
// //   const [addProductOpen, setAddProductOpen] = useState(false);
// //   const [loadingProduct, setLoadingProduct] = useState(false);
// //   const [productForm, setProductForm] = useState<ProductFormData>({
// //     id: "",
// //     name: "",
// //     image: "",
// //     images: [],
// //     collection: "",
// //     XS_price: "",
// //     S_price: "",
// //     M_price: "",
// //     L_price: "",
// //     XL_price: "",
// //     XXL_price: "",
// //     XS_stock: "",
// //     S_stock: "",
// //     M_stock: "",
// //     L_stock: "",
// //     XL_stock: "",
// //     XXL_stock: "",
// //     kids: false,
// //   });

// //   const loadUserCarts = useCallback((list: StoredUser[]) => {
// //     const mapped: Record<string, CartItem[]> = {};
// //     for (const u of list) {
// //       mapped[u.id] = readUserCart(u.id);
// //     }
// //     setUserCarts(mapped);
// //   }, []);

// //   const loadUsersAndCarts = useCallback(async () => {
// //     try {
// //       const list = await listAllUsers();
// //       setUsers(list);
// //       loadUserCarts(list);
// //     } catch (error) {
// //       console.error("Failed to load users:", error);
// //     }
// //   }, [loadUserCarts]);

// //   const fetchOrders = async () => {
// //     try {
// //       setLoadingOrders(true);
// //       const response = await fetch(`${API_BASE_URL}/orders`);
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch orders: ${response.statusText}`);
// //       }
// //       const data: Order[] = await response.json();
// //       setOrders(data);
// //     } catch (error) {
// //       console.error("Error fetching orders:", error);
// //       setOrders([]);
// //     } finally {
// //       setLoadingOrders(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //     loadUsersAndCarts();
// //   }, [loadUsersAndCarts]);

// //   useEffect(() => {
// //     const handleCartChange = (event: Event) => {
// //       const detail = (event as CustomEvent<{ userId: string }>).detail;
// //       if (detail?.userId) {
// //         setUserCarts((prev) => ({ ...prev, [detail.userId]: readUserCart(detail.userId) }));
// //       } else {
// //         loadUsersAndCarts();
// //       }
// //     };
// //     window.addEventListener("cart:change", handleCartChange);
// //     return () => window.removeEventListener("cart:change", handleCartChange);
// //   }, [loadUsersAndCarts]);

// //   if (!user) return <div className="container py-10">Please login to access admin.</div>;
// //   if (!ALLOWED_ADMIN_EMAILS.has(user.email)) return <div className="container py-10">You are not authorized to access admin.</div>;
// //   if (!unlocked) {
// //     return (
// //       <main className="container py-10 space-y-4">
// //         <h1 className="font-serif text-3xl">Admin Access</h1>
// //         <p className="text-sm text-muted-foreground">Enter admin password to continue.</p>
// //         <div className="flex items-center gap-2">
// //           <Input
// //             type="password"
// //             placeholder="Password"
// //             value={pass}
// //             onChange={(e) => setPass(e.target.value)}
// //             className="w-48"
// //           />
// //           <Button
// //             onClick={() => {
// //               if (pass.trim() === "4321") setUnlocked(true);
// //               else alert("Incorrect password");
// //             }}
// //           >
// //             Enter
// //           </Button>
// //         </div>
// //       </main>
// //     );
// //   }

// //   const STATUS_STYLES: Record<string, { badge: string; border: string; card?: string }> = {
// //     pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", card: "bg-yellow-50" },
// //     processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300", card: "bg-blue-50" },
// //     shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300", card: "bg-indigo-50" },
// //     delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300", card: "bg-green-50" },
// //     canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300", card: "bg-red-50" },
// //   };

// //   const changeOrderStatus = async (orderId: number, newStatus: string) => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ status: newStatus }),
// //       });
// //       if (!response.ok) {
// //         throw new Error(`Failed to update status: ${response.statusText}`);
// //       }
// //       // Refresh orders after successful update
// //       fetchOrders();
// //     } catch (error) {
// //       console.error("Failed to update order status:", error);
// //       // Revert optimistic update on failure
// //       setOrders((prev) =>
// //         prev.map((it) => (it.order_id === orderId ? { ...it, status: orders.find((o) => o.order_id === orderId)?.status ?? "pending" } : it))
// //       );
// //     }
// //   };

// //   const handleStatusChange = (order: Order, newStatus: string) => {
// //     setSelectedOrder(order);
// //     setNewStatus(newStatus);
// //     setConfirmationOpen(true);
// //   };

// //   const confirmStatusChange = () => {
// //     if (selectedOrder && newStatus) {
// //       setOrders((prev) =>
// //         prev.map((it) => (it.order_id === selectedOrder.order_id ? { ...it, status: newStatus } : it))
// //       );
// //       changeOrderStatus(selectedOrder.order_id, newStatus);
// //     }
// //     setConfirmationOpen(false);
// //     setSelectedOrder(null);
// //     setNewStatus("");
// //   };

// //   const cancelStatusChange = () => {
// //     setConfirmationOpen(false);
// //     setSelectedOrder(null);
// //     setNewStatus("");
// //   };

// //   const handleProductFormChange = (field: keyof ProductFormData, value: string | boolean): void => {
// //     if (field === 'kids' && typeof value === 'boolean') {
// //       setProductForm((prev) => ({ ...prev, kids: value }));
// //     } else if (field !== 'kids' && typeof value === 'string') {
// //       setProductForm((prev) => ({ ...prev, [field]: value }));
// //     }
// //   };

// //   const handleAddImageLink = () => {
// //     setProductForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
// //   };

// //   const handleRemoveImageLink = (index: number) => {
// //     setProductForm((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const handleImageLinkChange = (index: number, value: string) => {
// //     setProductForm((prev) => ({
// //       ...prev,
// //       images: prev.images.map((img, i) => (i === index ? value : img)),
// //     }));
// //   };

// //   const handleAddProduct = async () => {
// //     try {
// //       setLoadingProduct(true);

// //       // Validate required fields
// //       if (
// //         !productForm.id.trim() ||
// //         !productForm.name.trim() ||
// //         !productForm.image.trim() ||
// //         !productForm.collection.trim() ||
// //         !productForm.XS_price ||
// //         !productForm.S_price ||
// //         !productForm.M_price ||
// //         !productForm.L_price ||
// //         !productForm.XL_price ||
// //         !productForm.XXL_price ||
// //         !productForm.XS_stock ||
// //         !productForm.S_stock ||
// //         !productForm.M_stock ||
// //         !productForm.L_stock ||
// //         !productForm.XL_stock ||
// //         !productForm.XXL_stock
// //       ) {
// //         alert("Please fill in all required fields");
// //         setLoadingProduct(false);
// //         return;
// //       }

// //       // Filter out empty image links
// //       const filteredImages = productForm.images.filter((img) => img.trim());

// //       const payload = {
// //         id: productForm.id.trim(),
// //         name: productForm.name.trim(),
// //         image: productForm.image.trim(),
// //         images: filteredImages.length > 0 ? filteredImages : undefined,
// //         collection: productForm.collection.trim(),
// //         XS_price: parseInt(productForm.XS_price),
// //         S_price: parseInt(productForm.S_price),
// //         M_price: parseInt(productForm.M_price),
// //         L_price: parseInt(productForm.L_price),
// //         XL_price: parseInt(productForm.XL_price),
// //         XXL_price: parseInt(productForm.XXL_price),
// //         XS_stock: parseInt(productForm.XS_stock),
// //         S_stock: parseInt(productForm.S_stock),
// //         M_stock: parseInt(productForm.M_stock),
// //         L_stock: parseInt(productForm.L_stock),
// //         XL_stock: parseInt(productForm.XL_stock),
// //         XXL_stock: parseInt(productForm.XXL_stock),
// //         kids: productForm.kids || undefined,
// //       };

// //       const response = await fetch(`${API_BASE_URL}/products`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!response.ok) {
// //         let errorMessage = `Failed to add product: ${response.statusText}`;
// //         try {
// //           const error = await response.json();
// //           errorMessage = error.detail || errorMessage;
// //         } catch {
// //           // Response is not JSON, use statusText
// //         }
// //         throw new Error(errorMessage);
// //       }

// //       alert("Product added successfully!");
// //       setProductForm({
// //         id: "",
// //         name: "",
// //         image: "",
// //         images: [],
// //         collection: "",
// //         XS_price: "",
// //         S_price: "",
// //         M_price: "",
// //         L_price: "",
// //         XL_price: "",
// //         XXL_price: "",
// //         XS_stock: "",
// //         S_stock: "",
// //         M_stock: "",
// //         L_stock: "",
// //         XL_stock: "",
// //         XXL_stock: "",
// //         kids: false,
// //       });
// //       setAddProductOpen(false);
// //     } catch (error) {
// //       console.error("Error adding product:", error);
// //       alert(`Error: ${error instanceof Error ? error.message : "Failed to add product"}`);
// //     } finally {
// //       setLoadingProduct(false);
// //     }
// //   };

// //   return (
// //     <main className="container py-10 space-y-10">
// //       {/* Product Management Button */}
// //       <div className="flex items-center justify-between">
// //         <h1 className="font-serif text-3xl">Admin Panel</h1>
// //         <Button onClick={() => setAddProductOpen(true)} className="gap-2">
// //           <Plus className="w-4 h-4" />
// //           Add Product
// //         </Button>
// //       </div>

// //       {/* Add Product Dialog */}
// //       <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
// //         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
// //           <DialogHeader>
// //             <DialogTitle>Add New Product</DialogTitle>
// //             <DialogDescription>Fill in all product details to add a new item to the catalog</DialogDescription>
// //           </DialogHeader>

// //           <div className="space-y-4 py-4">
// //             {/* Basic Info */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="product-id">Product ID *</Label>
// //                 <Input
// //                   id="product-id"
// //                   placeholder="e.g., ind-2"
// //                   value={productForm.id}
// //                   onChange={(e) => handleProductFormChange("id", e.target.value)}
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="product-name">Product Name *</Label>
// //                 <Input
// //                   id="product-name"
// //                   placeholder="e.g., meri gul pari"
// //                   value={productForm.name}
// //                   onChange={(e) => handleProductFormChange("name", e.target.value)}
// //                 />
// //               </div>
// //             </div>

// //             {/* Main Image */}
// //             <div className="space-y-2">
// //               <Label htmlFor="product-image">Primary Image URL *</Label>
// //               <Input
// //                 id="product-image"
// //                 placeholder="https://..."
// //                 value={productForm.image}
// //                 onChange={(e) => handleProductFormChange("image", e.target.value)}
// //               />
// //             </div>

// //             {/* Additional Images */}
// //             <div className="space-y-2">
// //               <Label>Additional Images</Label>
// //               <div className="space-y-2">
// //                 {productForm.images.map((img, index) => (
// //                   <div key={index} className="flex gap-2">
// //                     <Input
// //                       placeholder="https://..."
// //                       value={img}
// //                       onChange={(e) => handleImageLinkChange(index, e.target.value)}
// //                     />
// //                     <Button
// //                       type="button"
// //                       variant="outline"
// //                       size="sm"
// //                       onClick={() => handleRemoveImageLink(index)}
// //                       className="w-10 p-0"
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 ))}
// //               </div>
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={handleAddImageLink}
// //                 className="gap-2"
// //               >
// //                 <Plus className="w-3 h-3" />
// //                 Add Image Link
// //               </Button>
// //             </div>

// //             {/* Collection */}
// //             <div className="space-y-2">
// //               <Label htmlFor="product-collection">Collection *</Label>
// //               <Select value={productForm.collection} onValueChange={(value) => handleProductFormChange("collection", value)}>
// //                 <SelectTrigger id="product-collection">
// //                   <SelectValue placeholder="Select a collection" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {COLLECTIONS.map((collection) => (
// //                     <SelectItem key={collection} value={collection}>
// //                       {collection}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             {/* Sizes & Prices */}
// //             <div>
// //               <h3 className="font-medium mb-3">Prices (PKR) *</h3>
// //               <div className="grid grid-cols-3 gap-2">
// //                 {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
// //                   <div key={`price-${size}`} className="space-y-1">
// //                     <Label htmlFor={`price-${size}`} className="text-xs">
// //                       {size}
// //                     </Label>
// //                     <Input
// //                       id={`price-${size}`}
// //                       type="number"
// //                       placeholder="0"
// //                       value={productForm[`${size}_price` as keyof ProductFormData] as string}
// //                       onChange={(e) =>
// //                         handleProductFormChange(`${size}_price` as keyof ProductFormData, e.target.value)
// //                       }
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Stock */}
// //             <div>
// //               <h3 className="font-medium mb-3">Stock (Quantity) *</h3>
// //               <div className="grid grid-cols-3 gap-2">
// //                 {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
// //                   <div key={`stock-${size}`} className="space-y-1">
// //                     <Label htmlFor={`stock-${size}`} className="text-xs">
// //                       {size}
// //                     </Label>
// //                     <Input
// //                       id={`stock-${size}`}
// //                       type="number"
// //                       placeholder="0"
// //                       value={productForm[`${size}_stock` as keyof ProductFormData] as string}
// //                       onChange={(e) =>
// //                         handleProductFormChange(`${size}_stock` as keyof ProductFormData, e.target.value)
// //                       }
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Kids Checkbox */}
// //             <div className="flex items-center gap-2">
// //               <Checkbox
// //                 id="product-kids"
// //                 checked={productForm.kids}
// //                 onCheckedChange={(checked) => handleProductFormChange("kids", checked)}
// //               />
// //               <Label htmlFor="product-kids" className="cursor-pointer">
// //                 Kids Product
// //               </Label>
// //             </div>
// //           </div>

// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setAddProductOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button onClick={handleAddProduct} disabled={loadingProduct}>
// //               {loadingProduct ? "Adding..." : "Add Product"}
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       {/* ---------------- ORDERS SECTION ---------------- */}
// //       <section>
// //         <h2 className="font-serif text-2xl">Orders</h2>
// //         {loadingOrders ? (
// //           <p className="mt-4 text-muted-foreground">Loading orders...</p>
// //         ) : (
// //           <div className="mt-4 space-y-3">
// //             {orders.map((o) => (
// //               <div
// //                 key={o.order_id}
// //                 className={`border rounded-lg p-4 space-y-3 ${STATUS_STYLES[o.status]?.border ?? "border-gray-200"} ${STATUS_STYLES[o.status]?.card ?? ""}`}
// //               >
// //                 <div className="flex justify-between text-sm">
// //                   <div className="flex flex-col">
// //                     <span className="font-medium">Order #{o.order_id} · User {o.username}</span>
// //                     <span className="text-xs text-muted-foreground">{o.order_time}</span>
// //                     {o.status === "pending" ? (
// //                       <span className="text-xs text-muted-foreground">Total: {formatPKR(o.total_price)}</span>
// //                     ) : o.status === "canceled" ? (
// //                       <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>
// //                     ) : o.status === "delivered" ? (
// //                       <span className="text-xs text-muted-foreground">Paid: {formatPKR(o.total_price)}</span>
// //                     ) : (
// //                       <span className="text-xs text-muted-foreground">
// //                         Paid: {formatPKR(o.total_price * 0.5)} | Remaining: {formatPKR(o.total_price * 0.5)}
// //                       </span>
// //                     )}
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     {/* Colored badge showing current status */}
// //                     <span
// //                       className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
// //                     >
// //                       {o.status}
// //                     </span>
// //                     {/* Select styled with matching border color; trigger confirmation */}
// //                     <select
// //                       className={`rounded px-2 py-1 border ${STATUS_STYLES[o.status]?.border ?? "border-gray-300"}`}
// //                       value={o.status}
// //                       onChange={(e) => handleStatusChange(o, e.target.value)}
// //                     >
// //                       <option value="pending">pending</option>
// //                       <option value="processing">processing</option>
// //                       <option value="shipped">shipped</option>
// //                       <option value="delivered">delivered</option>
// //                       <option value="canceled">canceled</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <ul className="space-y-2 text-sm text-muted-foreground">
// //                   {o.products.map((i) => (
// //                     <li key={i.product_name + i.size} className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2">
// //                       <span>
// //                         {i.product_name} {i.size ? `(${i.size})` : ""} × {i.quantity} — {formatPKR(i.price)}
// //                       </span>
// //                     </li>
// //                   ))}
// //                   {o.products.length === 0 && (
// //                     <li className="text-muted-foreground">No products in order.</li>
// //                   )}
// //                 </ul>
// //               </div>
// //             ))}
// //             {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
// //           </div>
// //         )}
// //       </section>

// //       {/* ---------------- USERS & CARTS SECTION ---------------- */}
// //       <section>
// //         <h2 className="font-serif text-2xl">Users & Carts</h2>
// //         <div className="mt-4 space-y-3">
// //           {users.map((u) => {
// //             const cart = userCarts[u.id] ?? [];
// //             return (
// //               <div key={u.id} className="space-y-3 rounded-lg border p-4">
// //                 <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
// //                   <div className="font-medium">
// //                     {u.name} · {u.email}
// //                   </div>
// //                   <div className="text-sm text-muted-foreground">
// //                     Cart items: {cart.length}
// //                   </div>
// //                 </div>
// //                 <ul className="space-y-2 text-sm">
// //                   {cart.map((i) => (
// //                     <li
// //                       key={i.id + (i.size ?? "")}
// //                       className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2"
// //                     >
// //                       <span className="min-w-[200px] flex-1 flex">
// //                         {i.name} {i.size ? `(${i.size})` : ""} × {i.qty}
// //                       </span>
// //                     </li>
// //                   ))}
// //                   {cart.length === 0 && (
// //                     <li className="text-muted-foreground">Cart is empty.</li>
// //                   )}
// //                 </ul>
// //               </div>
// //             );
// //           })}
// //           {users.length === 0 && <p className="text-muted-foreground">No users yet.</p>}
// //         </div>
// //       </section>

// //       {/* Confirmation Dialog */}
// //       <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Confirm Status Change</DialogTitle>
// //             <DialogDescription>
// //               Are you sure you want to change {selectedOrder?.username}'s status from{" "}
// //               {selectedOrder?.status} to {newStatus}?
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={cancelStatusChange}>
// //               Cancel
// //             </Button>
// //             <Button onClick={confirmStatusChange}>Confirm</Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </main>
// //   );
// // }

























// import { useCallback, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/context/AuthContext";
// import type { CartItem } from "@/context/CartContext";
// import { listAllUsers, StoredUser } from "../data/users";
// import { readUserCart } from "@/data/carts";
// import { API_BASE_URL } from "@/lib/api-config";
// import { formatPKR } from "@/lib/currency";
// import { getDiscountForCollection, applyDiscount } from "@/data/discount";
// import { getProducts } from "@/data/catalog";
// import { X, Plus } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const COLLECTIONS = [
//   "Eid Collection",
//   "Bakra Eid Specials",
//   "14 August Independence Collection",
//   "Birthday Specials",
// ] as const;

// // const ALLOWED_ADMIN_EMAILS = new Set([
// //   "l1f22bscs1019@ucp.edu.pk",
// //   "itsmywork1019@gmail.com",
// //   "rangistaarttowear@gmail.com",
// // ]);



// const ALLOWED_ADMIN_EMAILS = new Set(
//   (import.meta.env.VITE_ALLOWED_ADMIN_EMAILS || "")
//     .split(",")
//     .map((email: string) => email.trim())
//     .filter((email: string) => email)
// );




// interface ProductFormData {
//   id: string;
//   name: string;
//   image: string;
//   images: string[];
//   collection: string;
//   XS_price: string;
//   S_price: string;
//   M_price: string;
//   L_price: string;
//   XL_price: string;
//   XXL_price: string;
//   XS_stock: string;
//   S_stock: string;
//   M_stock: string;
//   L_stock: string;
//   XL_stock: string;
//   XXL_stock: string;
//   kids: boolean;
// }

// interface OrderProduct {
//   product_name: string;
//   quantity: number;
//   size: string;
//   price: number;
// }

// interface Order {
//   order_id: number;
//   user_id: number;
//   username: string;
//   status: string;
//   total_products: number;
//   total_price: number;
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
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [newStatus, setNewStatus] = useState<string>("");
//   const [addProductOpen, setAddProductOpen] = useState(false);
//   const [loadingProduct, setLoadingProduct] = useState(false);
//   const [productForm, setProductForm] = useState<ProductFormData>({
//     id: "",
//     name: "",
//     image: "",
//     images: [],
//     collection: "",
//     XS_price: "",
//     S_price: "",
//     M_price: "",
//     L_price: "",
//     XL_price: "",
//     XXL_price: "",
//     XS_stock: "",
//     S_stock: "",
//     M_stock: "",
//     L_stock: "",
//     XL_stock: "",
//     XXL_stock: "",
//     kids: false,
//   });

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
//               if (pass.trim() === import.meta.env.VITE_ADMIN_PASSWORD) setUnlocked(true);
//               else alert("Incorrect password");
//             }}
//           >
//             Enter
//           </Button>
//         </div>
//       </main>
//     );
//   }

//   const STATUS_STYLES: Record<string, { badge: string; border: string; card?: string }> = {
//     pending: { badge: "bg-yellow-100 text-yellow-800", border: "border-yellow-300", card: "bg-yellow-50" },
//     processing: { badge: "bg-blue-100 text-blue-800", border: "border-blue-300", card: "bg-blue-50" },
//     shipped: { badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-300", card: "bg-indigo-50" },
//     delivered: { badge: "bg-green-100 text-green-800", border: "border-green-300", card: "bg-green-50" },
//     canceled: { badge: "bg-red-100 text-red-800", border: "border-red-300", card: "bg-red-50" },
//   };

//   const changeOrderStatus = async (orderId: number, newStatus: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to update status: ${response.statusText}`);
//       }
//       // Refresh orders after successful update
//       fetchOrders();
//     } catch (error) {
//       console.error("Failed to update order status:", error);
//       // Revert optimistic update on failure
//       setOrders((prev) =>
//         prev.map((it) => (it.order_id === orderId ? { ...it, status: orders.find((o) => o.order_id === orderId)?.status ?? "pending" } : it))
//       );
//     }
//   };

//   const handleStatusChange = (order: Order, newStatus: string) => {
//     setSelectedOrder(order);
//     setNewStatus(newStatus);
//     setConfirmationOpen(true);
//   };

//   const confirmStatusChange = () => {
//     if (selectedOrder && newStatus) {
//       setOrders((prev) =>
//         prev.map((it) => (it.order_id === selectedOrder.order_id ? { ...it, status: newStatus } : it))
//       );
//       changeOrderStatus(selectedOrder.order_id, newStatus);
//     }
//     setConfirmationOpen(false);
//     setSelectedOrder(null);
//     setNewStatus("");
//   };

//   const cancelStatusChange = () => {
//     setConfirmationOpen(false);
//     setSelectedOrder(null);
//     setNewStatus("");
//   };

//   const handleProductFormChange = (field: keyof ProductFormData, value: string | boolean): void => {
//     if (field === 'kids' && typeof value === 'boolean') {
//       setProductForm((prev) => ({ ...prev, kids: value }));
//     } else if (field !== 'kids' && typeof value === 'string') {
//       setProductForm((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleAddImageLink = () => {
//     setProductForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
//   };

//   const handleRemoveImageLink = (index: number) => {
//     setProductForm((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleImageLinkChange = (index: number, value: string) => {
//     setProductForm((prev) => ({
//       ...prev,
//       images: prev.images.map((img, i) => (i === index ? value : img)),
//     }));
//   };

//   const handleAddProduct = async () => {
//     try {
//       setLoadingProduct(true);

//       // Validate required fields
//       if (
//         !productForm.id.trim() ||
//         !productForm.name.trim() ||
//         !productForm.image.trim() ||
//         !productForm.collection.trim() ||
//         !productForm.XS_price ||
//         !productForm.S_price ||
//         !productForm.M_price ||
//         !productForm.L_price ||
//         !productForm.XL_price ||
//         !productForm.XXL_price ||
//         !productForm.XS_stock ||
//         !productForm.S_stock ||
//         !productForm.M_stock ||
//         !productForm.L_stock ||
//         !productForm.XL_stock ||
//         !productForm.XXL_stock
//       ) {
//         alert("Please fill in all required fields");
//         setLoadingProduct(false);
//         return;
//       }

//       // Filter out empty image links
//       const filteredImages = productForm.images.filter((img) => img.trim());

//       const payload = {
//         id: productForm.id.trim(),
//         name: productForm.name.trim(),
//         image: productForm.image.trim(),
//         images: filteredImages.length > 0 ? filteredImages : undefined,
//         collection: productForm.collection.trim(),
//         XS_price: parseInt(productForm.XS_price),
//         S_price: parseInt(productForm.S_price),
//         M_price: parseInt(productForm.M_price),
//         L_price: parseInt(productForm.L_price),
//         XL_price: parseInt(productForm.XL_price),
//         XXL_price: parseInt(productForm.XXL_price),
//         XS_stock: parseInt(productForm.XS_stock),
//         S_stock: parseInt(productForm.S_stock),
//         M_stock: parseInt(productForm.M_stock),
//         L_stock: parseInt(productForm.L_stock),
//         XL_stock: parseInt(productForm.XL_stock),
//         XXL_stock: parseInt(productForm.XXL_stock),
//         kids: productForm.kids || undefined,
//       };

//       const response = await fetch(`${API_BASE_URL}/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         let errorMessage = `Failed to add product: ${response.statusText}`;
//         try {
//           const error = await response.json();
//           errorMessage = error.detail || errorMessage;
//         } catch {
//           // Response is not JSON, use statusText
//         }
//         throw new Error(errorMessage);
//       }

//       alert("Product added successfully!");
//       setProductForm({
//         id: "",
//         name: "",
//         image: "",
//         images: [],
//         collection: "",
//         XS_price: "",
//         S_price: "",
//         M_price: "",
//         L_price: "",
//         XL_price: "",
//         XXL_price: "",
//         XS_stock: "",
//         S_stock: "",
//         M_stock: "",
//         L_stock: "",
//         XL_stock: "",
//         XXL_stock: "",
//         kids: false,
//       });
//       setAddProductOpen(false);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert(`Error: ${error instanceof Error ? error.message : "Failed to add product"}`);
//     } finally {
//       setLoadingProduct(false);
//     }
//   };

//   return (
//     <main className="container py-10 space-y-10">
//       {/* Product Management Button */}
//       <div className="flex items-center justify-between">
//         <h1 className="font-serif text-3xl">Admin Panel</h1>
//         <Button onClick={() => setAddProductOpen(true)} className="gap-2">
//           <Plus className="w-4 h-4" />
//           Add Product
//         </Button>
//       </div>

//       {/* Add Product Dialog */}
//       <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Add New Product</DialogTitle>
//             <DialogDescription>Fill in all product details to add a new item to the catalog</DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             {/* Basic Info */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="product-id">Product ID *</Label>
//                 <Input
//                   id="product-id"
//                   placeholder="e.g., ind-2"
//                   value={productForm.id}
//                   onChange={(e) => handleProductFormChange("id", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="product-name">Product Name *</Label>
//                 <Input
//                   id="product-name"
//                   placeholder="e.g., meri gul pari"
//                   value={productForm.name}
//                   onChange={(e) => handleProductFormChange("name", e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Main Image */}
//             <div className="space-y-2">
//               <Label htmlFor="product-image">Primary Image URL *</Label>
//               <Input
//                 id="product-image"
//                 placeholder="https://..."
//                 value={productForm.image}
//                 onChange={(e) => handleProductFormChange("image", e.target.value)}
//               />
//             </div>

//             {/* Additional Images */}
//             <div className="space-y-2">
//               <Label>Additional Images</Label>
//               <div className="space-y-2">
//                 {productForm.images.map((img, index) => (
//                   <div key={index} className="flex gap-2">
//                     <Input
//                       placeholder="https://..."
//                       value={img}
//                       onChange={(e) => handleImageLinkChange(index, e.target.value)}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleRemoveImageLink(index)}
//                       className="w-10 p-0"
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={handleAddImageLink}
//                 className="gap-2"
//               >
//                 <Plus className="w-3 h-3" />
//                 Add Image Link
//               </Button>
//             </div>

//             {/* Collection */}
//             <div className="space-y-2">
//               <Label htmlFor="product-collection">Collection *</Label>
//               <Select value={productForm.collection} onValueChange={(value) => handleProductFormChange("collection", value)}>
//                 <SelectTrigger id="product-collection">
//                   <SelectValue placeholder="Select a collection" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {COLLECTIONS.map((collection) => (
//                     <SelectItem key={collection} value={collection}>
//                       {collection}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Sizes & Prices */}
//             <div>
//               <h3 className="font-medium mb-3">Prices (PKR) *</h3>
//               <div className="grid grid-cols-3 gap-2">
//                 {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
//                   <div key={`price-${size}`} className="space-y-1">
//                     <Label htmlFor={`price-${size}`} className="text-xs">
//                       {size}
//                     </Label>
//                     <Input
//                       id={`price-${size}`}
//                       type="number"
//                       placeholder="0"
//                       value={productForm[`${size}_price` as keyof ProductFormData] as string}
//                       onChange={(e) =>
//                         handleProductFormChange(`${size}_price` as keyof ProductFormData, e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Stock */}
//             <div>
//               <h3 className="font-medium mb-3">Stock (Quantity) *</h3>
//               <div className="grid grid-cols-3 gap-2">
//                 {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
//                   <div key={`stock-${size}`} className="space-y-1">
//                     <Label htmlFor={`stock-${size}`} className="text-xs">
//                       {size}
//                     </Label>
//                     <Input
//                       id={`stock-${size}`}
//                       type="number"
//                       placeholder="0"
//                       value={productForm[`${size}_stock` as keyof ProductFormData] as string}
//                       onChange={(e) =>
//                         handleProductFormChange(`${size}_stock` as keyof ProductFormData, e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Kids Checkbox */}
//             <div className="flex items-center gap-2">
//               <Checkbox
//                 id="product-kids"
//                 checked={productForm.kids}
//                 onCheckedChange={(checked) => handleProductFormChange("kids", checked)}
//               />
//               <Label htmlFor="product-kids" className="cursor-pointer">
//                 Kids Product
//               </Label>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setAddProductOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddProduct} disabled={loadingProduct}>
//               {loadingProduct ? "Adding..." : "Add Product"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* ---------------- ORDERS SECTION ---------------- */}
//       <section>
//         <h2 className="font-serif text-2xl">Orders</h2>
//         {loadingOrders ? (
//           <p className="mt-4 text-muted-foreground">Loading orders...</p>
//         ) : (
//           <div className="mt-4 space-y-3">
//             {orders.map((o) => (
//               <div
//                 key={o.order_id}
//                 className={`border rounded-lg p-4 space-y-3 ${STATUS_STYLES[o.status]?.border ?? "border-gray-200"} ${STATUS_STYLES[o.status]?.card ?? ""}`}
//               >
//                 <div className="flex justify-between text-sm">
//                   <div className="flex flex-col">
//                     <span className="font-medium">Order #{o.order_id} · User {o.username}</span>
//                     <span className="text-xs text-muted-foreground">{o.order_time}</span>
//                     {(() => {
//                       const computedTotal = o.products.reduce((s, item) => {
//                         const qty = item.quantity || 1;
//                         const prod = getProducts().find(p => p.name.toLowerCase() === String(item.product_name).toLowerCase());
//                         const pct = prod ? getDiscountForCollection(prod.collection) : 0;
//                         const unit = qty > 0 ? Number(item.price) / qty : Number(item.price);
//                         const discountedUnit = applyDiscount(unit, pct);
//                         const line = Math.round(discountedUnit * qty);
//                         return s + line;
//                       }, 0);

//                       if (o.status === "pending") return <span className="text-xs text-muted-foreground">Total: {formatPKR(computedTotal)}</span>;
//                       if (o.status === "canceled") return <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>;
//                       if (o.status === "delivered") return <span className="text-xs text-muted-foreground">Paid: {formatPKR(computedTotal)}</span>;
//                       return <span className="text-xs text-muted-foreground">Paid: {formatPKR(Math.round(computedTotal * 0.5))} | Remaining: {formatPKR(Math.round(computedTotal * 0.5))}</span>;
//                     })()}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {/* Colored badge showing current status */}
//                     <span
//                       className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[o.status]?.badge ?? "bg-gray-100 text-gray-800"}`}
//                     >
//                       {o.status}
//                     </span>
//                     {/* Select styled with matching border color; trigger confirmation */}
//                     <select
//                       className={`rounded px-2 py-1 border ${STATUS_STYLES[o.status]?.border ?? "border-gray-300"}`}
//                       value={o.status}
//                       onChange={(e) => handleStatusChange(o, e.target.value)}
//                     >
//                       <option value="pending">pending</option>
//                       <option value="processing">processing</option>
//                       <option value="shipped">shipped</option>
//                       <option value="delivered">delivered</option>
//                       <option value="canceled">canceled</option>
//                     </select>
//                   </div>
//                 </div>
//                 <ul className="space-y-2 text-sm text-muted-foreground">
//                   {o.products.map((i) => {
//                     const qty = i.quantity || 1;
//                     const prod = getProducts().find(p => p.name.toLowerCase() === String(i.product_name).toLowerCase());
//                     const pct = prod ? getDiscountForCollection(prod.collection) : 0;
//                     const unit = qty > 0 ? Number(i.price) / qty : Number(i.price);
//                     const discountedUnit = applyDiscount(unit, pct);
//                     const linePrice = Math.round(discountedUnit * qty);
//                     return (
//                       <li key={i.product_name + i.size} className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2">
//                         <span>
//                           {i.product_name} {i.size ? `(${i.size})` : ""} × {i.quantity} — {formatPKR(linePrice)}
//                           {pct > 0 && <span className="ml-2 text-xs text-muted-foreground line-through">{formatPKR(Number(i.price))}</span>}
//                         </span>
//                       </li>
//                     );
//                   })}
//                   {o.products.length === 0 && (
//                     <li className="text-muted-foreground">No products in order.</li>
//                   )}
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

//       {/* Confirmation Dialog */}
//       <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Status Change</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to change {selectedOrder?.username}'s status from{" "}
//               {selectedOrder?.status} to {newStatus}?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={cancelStatusChange}>
//               Cancel
//             </Button>
//             <Button onClick={confirmStatusChange}>Confirm</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
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
import { getDiscountForCollection, applyDiscount } from "@/data/discount";
import { getProducts } from "@/data/catalog";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLLECTIONS = [
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
  "🎨 Handpainted Dupattas Collection"
] as const;

// const ALLOWED_ADMIN_EMAILS = new Set([
//   "l1f22bscs1019@ucp.edu.pk",
//   "itsmywork1019@gmail.com",
//   "rangistaarttowear@gmail.com",
// ]);



const ALLOWED_ADMIN_EMAILS = new Set(
  (import.meta.env.VITE_ALLOWED_ADMIN_EMAILS || "")
    .split(",")
    .map((email: string) => email.trim())
    .filter((email: string) => email)
);




interface ProductFormData {
  id: string;
  name: string;
  image: string;
  images: string[];
  collection: string;
  description: string;
  XS_price: string;
  S_price: string;
  M_price: string;
  L_price: string;
  XL_price: string;
  XXL_price: string;
  XS_stock: string;
  S_stock: string;
  M_stock: string;
  L_stock: string;
  XL_stock: string;
  XXL_stock: string;
  kids: boolean;
}

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
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productForm, setProductForm] = useState<ProductFormData>({
    id: "",
    name: "",
    image: "",
    images: [],
    collection: "",
    description: "",
    XS_price: "",
    S_price: "",
    M_price: "",
    L_price: "",
    XL_price: "",
    XXL_price: "",
    XS_stock: "",
    S_stock: "",
    M_stock: "",
    L_stock: "",
    XL_stock: "",
    XXL_stock: "",
    kids: false,
  });

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
              if (pass.trim() === import.meta.env.VITE_ADMIN_PASSWORD) setUnlocked(true);
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

  const handleProductFormChange = (field: keyof ProductFormData, value: string | boolean): void => {
    if (field === 'kids' && typeof value === 'boolean') {
      setProductForm((prev) => ({ ...prev, kids: value }));
    } else if (field !== 'kids' && typeof value === 'string') {
      setProductForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddImageLink = () => {
    setProductForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleRemoveImageLink = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageLinkChange = (index: number, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  const handleAddProduct = async () => {
    try {
      setLoadingProduct(true);

      // Validate required fields
      if (
        !productForm.id.trim() ||
        !productForm.name.trim() ||
        !productForm.image.trim() ||
        !productForm.collection.trim() ||
        !productForm.XS_price ||
        !productForm.S_price ||
        !productForm.M_price ||
        !productForm.L_price ||
        !productForm.XL_price ||
        !productForm.XXL_price ||
        !productForm.XS_stock ||
        !productForm.S_stock ||
        !productForm.M_stock ||
        !productForm.L_stock ||
        !productForm.XL_stock ||
        !productForm.XXL_stock
      ) {
        alert("Please fill in all required fields");
        setLoadingProduct(false);
        return;
      }

      // Filter out empty image links
      const filteredImages = productForm.images.filter((img) => img.trim());

      const payload = {
        id: productForm.id.trim(),
        name: productForm.name.trim(),
        image: productForm.image.trim(),
        images: filteredImages.length > 0 ? filteredImages : undefined,
        collection: productForm.collection.trim(),
        description: productForm.description.trim() || undefined,
        XS_price: parseInt(productForm.XS_price),
        S_price: parseInt(productForm.S_price),
        M_price: parseInt(productForm.M_price),
        L_price: parseInt(productForm.L_price),
        XL_price: parseInt(productForm.XL_price),
        XXL_price: parseInt(productForm.XXL_price),
        XS_stock: parseInt(productForm.XS_stock),
        S_stock: parseInt(productForm.S_stock),
        M_stock: parseInt(productForm.M_stock),
        L_stock: parseInt(productForm.L_stock),
        XL_stock: parseInt(productForm.XL_stock),
        XXL_stock: parseInt(productForm.XXL_stock),
        kids: productForm.kids || undefined,
      };

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Failed to add product: ${response.statusText}`;
        try {
          const error = await response.json();
          errorMessage = error.detail || errorMessage;
        } catch {
          // Response is not JSON, use statusText
        }
        throw new Error(errorMessage);
      }

      alert("Product added successfully!");
      setProductForm({
        id: "",
        name: "",
        image: "",
        images: [],
        collection: "",
        description: "",
        XS_price: "",
        S_price: "",
        M_price: "",
        L_price: "",
        XL_price: "",
        XXL_price: "",
        XS_stock: "",
        S_stock: "",
        M_stock: "",
        L_stock: "",
        XL_stock: "",
        XXL_stock: "",
        kids: false,
      });
      setAddProductOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Failed to add product"}`);
    } finally {
      setLoadingProduct(false);
    }
  };

  return (
    <main className="container py-10 space-y-10">
      {/* Product Management Button */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Admin Panel</h1>
        <Button onClick={() => setAddProductOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in all product details to add a new item to the catalog</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-id">Product ID *</Label>
                <Input
                  id="product-id"
                  placeholder="e.g., ind-2"
                  value={productForm.id}
                  onChange={(e) => handleProductFormChange("id", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name *</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., meri gul pari"
                  value={productForm.name}
                  onChange={(e) => handleProductFormChange("name", e.target.value)}
                />
              </div>
            </div>

            {/* Main Image */}
            <div className="space-y-2">
              <Label htmlFor="product-image">Primary Image URL *</Label>
              <Input
                id="product-image"
                placeholder="https://..."
                value={productForm.image}
                onChange={(e) => handleProductFormChange("image", e.target.value)}
              />
            </div>

            {/* Additional Images */}
            <div className="space-y-2">
              <Label>Additional Images</Label>
              <div className="space-y-2">
                {productForm.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://..."
                      value={img}
                      onChange={(e) => handleImageLinkChange(index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveImageLink(index)}
                      className="w-10 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddImageLink}
                className="gap-2"
              >
                <Plus className="w-3 h-3" />
                Add Image Link
              </Button>
            </div>

            {/* Collection */}
            <div className="space-y-2">
              <Label htmlFor="product-collection">Collection *</Label>
              <Select value={productForm.collection} onValueChange={(value) => handleProductFormChange("collection", value)}>
                <SelectTrigger id="product-collection">
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  {COLLECTIONS.map((collection) => (
                    <SelectItem key={collection} value={collection}>
                      {collection}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="product-description">Description (Optional)</Label>
              <textarea
                id="product-description"
                placeholder="Enter product description..."
                value={productForm.description}
                onChange={(e) => handleProductFormChange("description", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                rows={3}
              />
            </div>

            {/* Sizes & Prices */}
            <div>
              <h3 className="font-medium mb-3">Prices (PKR) *</h3>
              <div className="grid grid-cols-3 gap-2">
                {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
                  <div key={`price-${size}`} className="space-y-1">
                    <Label htmlFor={`price-${size}`} className="text-xs">
                      {size}
                    </Label>
                    <Input
                      id={`price-${size}`}
                      type="number"
                      placeholder="0"
                      value={productForm[`${size}_price` as keyof ProductFormData] as string}
                      onChange={(e) =>
                        handleProductFormChange(`${size}_price` as keyof ProductFormData, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div>
              <h3 className="font-medium mb-3">Stock (Quantity) *</h3>
              <div className="grid grid-cols-3 gap-2">
                {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
                  <div key={`stock-${size}`} className="space-y-1">
                    <Label htmlFor={`stock-${size}`} className="text-xs">
                      {size}
                    </Label>
                    <Input
                      id={`stock-${size}`}
                      type="number"
                      placeholder="0"
                      value={productForm[`${size}_stock` as keyof ProductFormData] as string}
                      onChange={(e) =>
                        handleProductFormChange(`${size}_stock` as keyof ProductFormData, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kids Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="product-kids"
                checked={productForm.kids}
                onCheckedChange={(checked) => handleProductFormChange("kids", checked)}
              />
              <Label htmlFor="product-kids" className="cursor-pointer">
                Kids Product
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} disabled={loadingProduct}>
              {loadingProduct ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    {(() => {
                      const computedTotal = o.products.reduce((s, item) => {
                        const qty = item.quantity || 1;
                        const prod = getProducts().find(p => p.name.toLowerCase() === String(item.product_name).toLowerCase());
                        const pct = prod ? getDiscountForCollection(prod.collection) : 0;
                        const unit = qty > 0 ? Number(item.price) / qty : Number(item.price);
                        const discountedUnit = applyDiscount(unit, pct);
                        const line = Math.round(discountedUnit * qty);
                        return s + line;
                      }, 0);

                      if (o.status === "pending") return <span className="text-xs text-muted-foreground">Total: {formatPKR(computedTotal)}</span>;
                      if (o.status === "canceled") return <span className="text-xs text-muted-foreground">Canceled (Original Total: {formatPKR(o.total_price)})</span>;
                      if (o.status === "delivered") return <span className="text-xs text-muted-foreground">Paid: {formatPKR(computedTotal)}</span>;
                      return <span className="text-xs text-muted-foreground">Paid: {formatPKR(Math.round(computedTotal * 0.5))} | Remaining: {formatPKR(Math.round(computedTotal * 0.5))}</span>;
                    })()}
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
                  {o.products.map((i) => {
                    const qty = i.quantity || 1;
                    const prod = getProducts().find(p => p.name.toLowerCase() === String(i.product_name).toLowerCase());
                    const pct = prod ? getDiscountForCollection(prod.collection) : 0;
                    const unit = qty > 0 ? Number(i.price) / qty : Number(i.price);
                    const discountedUnit = applyDiscount(unit, pct);
                    const linePrice = Math.round(discountedUnit * qty);
                    return (
                      <li key={i.product_name + i.size} className="flex flex-wrap items-center gap-2 rounded border border-dashed p-2">
                        <span>
                          {i.product_name} {i.size ? `(${i.size})` : ""} × {i.quantity} — {formatPKR(linePrice)}
                          {pct > 0 && <span className="ml-2 text-xs text-muted-foreground line-through">{formatPKR(Number(i.price))}</span>}
                        </span>
                      </li>
                    );
                  })}
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
