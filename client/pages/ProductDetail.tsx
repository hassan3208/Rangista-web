// // import { useEffect, useState } from "react";
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import { getProduct } from "@/data/catalog";
// // import { formatPKR } from "@/lib/currency";
// // import { getStock } from "@/data/stock";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { useCart } from "@/context/CartContext";
// // import { listReviewsByProduct, type Review } from "@/data/reviews";
// // import { Star } from "lucide-react";
// // import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// // import SizeChartDialog from "@/components/SizeChartDialog";
// // import { getDiscountForCollection, applyDiscount } from "@/data/discount";

// // type SizeKey = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Kids";

// // function PartialStar({ percent, size }: { percent: number; size: number }) {
// //   return (
// //     <div className="relative" style={{ width: size, height: size }}>
// //       <Star size={size} className="absolute text-yellow-500 opacity-30" />
// //       <div style={{ width: `${percent}%`, overflow: "hidden", position: "absolute" }}>
// //         <Star size={size} className="text-yellow-500 fill-yellow-500" />
// //       </div>
// //     </div>
// //   );
// // }

// // export default function ProductDetail() {
// //   const { id } = useParams<{ id: string }>();
// //   const [product, setProduct] = useState<ReturnType<typeof getProduct> | undefined>(undefined);
// //   const [sizes, setSizes] = useState<SizeKey[]>([]);
// //   const [size, setSize] = useState<SizeKey | null>(null);
// //   const [stock, setStock] = useState<number>(0);
// //   const [reviews, setReviews] = useState<Review[]>([]);
// //   const [avgRating, setAvgRating] = useState<number>(0);
// //   const [reviewCount, setReviewCount] = useState<number>(0);
// //   const { addItem } = useCart();
// //   const navigate = useNavigate();

// //   // Helper function to load product data
// //   const loadProductData = (productId: string) => {
// //     const prod = getProduct(productId);
// //     if (!prod) return;

// //     setProduct(prod);
// //     setAvgRating(prod.average_rating);
// //     setReviewCount(prod.total_reviews);

// //     // Calculate available sizes
// //     const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"].filter((s) => {
// //       if (s === "XS" && prod.XS_stock > 0) return true;
// //       if (s === "S" && prod.S_stock > 0) return true;
// //       if (s === "M" && prod.M_stock > 0) return true;
// //       if (s === "L" && prod.L_stock > 0) return true;
// //       if (s === "XL" && prod.XL_stock > 0) return true;
// //       if (s === "XXL" && prod.XXL_stock > 0) return true;
// //       return false;
// //     }) as SizeKey[];

// //     setSizes(availableSizes);

// //     // Set initial size (do NOT default to "Kids" as a selectable size)
// //     const initialSize: SizeKey | null = availableSizes[0] ?? null;
// //     setSize(initialSize);

// //     // Load stock for initial size (0 when there's no selectable size)
// //     const initialStock = initialSize ? getStock(productId, initialSize) : 0;
// //     setStock(initialStock);
// //   };

// //   // Fetch product when id changes or when products are loaded
// //   useEffect(() => {
// //     if (!id) {
// //       setProduct(undefined);
// //       setSizes([]);
// //       setSize(null);
// //       setStock(0);
// //       return;
// //     }

// //     // Try to load product immediately
// //     loadProductData(id);

// //     // Also listen for products:change in case they load after this component mounts
// //     const handleProductsLoaded = () => {
// //       loadProductData(id);
// //     };

// //     window.addEventListener("products:change", handleProductsLoaded);
// //     return () => window.removeEventListener("products:change", handleProductsLoaded);
// //   }, [id]);

// //   useEffect(() => {
// //     const onChange = () => {
// //       if (id && size) {
// //         setStock(getStock(id, size));
// //       } else {
// //         setStock(0);
// //       }
// //     };
// //     window.addEventListener("stock:change", onChange);
// //     return () => window.removeEventListener("stock:change", onChange);
// //   }, [id, size]);

// //   // Update stock when size changes
// //   useEffect(() => {
// //     if (id && size) {
// //       setStock(getStock(id, size));
// //     } else {
// //       setStock(0);
// //     }
// //   }, [id, size]);

// //   useEffect(() => {
// //     if (!product) return;
// //     const fetchReviews = async () => {
// //       try {
// //         const fetchedReviews = await listReviewsByProduct(product.id);
// //         setReviews(fetchedReviews);
// //         const count = fetchedReviews.length;
// //         const avg = count ? fetchedReviews.reduce((s, r) => s + r.rating, 0) / count : 0;
// //         setAvgRating(avg);
// //         setReviewCount(count);
// //       } catch (error) {
// //         console.error(`Error fetching reviews for product ${product.id}:`, error);
// //       }
// //     };
// //     fetchReviews();
// //     if (typeof window !== "undefined") {
// //       window.addEventListener("reviews:change", fetchReviews);
// //       return () => window.removeEventListener("reviews:change", fetchReviews);
// //     }
// //   }, [product?.id]);

// //   if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

// //   const canAdd = stock > 0 && !!size;

// //   // compute selected price and discount for UI
// //   const selectedPriceOriginal = size
// //     ? size === "XS"
// //       ? product.XS_price
// //       : size === "S"
// //       ? product.S_price
// //       : size === "M"
// //       ? product.M_price
// //       : size === "L"
// //       ? product.L_price
// //       : size === "XL"
// //       ? product.XL_price
// //       : size === "XXL"
// //       ? product.XXL_price
// //       : product.S_price
// //     : product.S_price;

// //   const detailDiscountPercent = getDiscountForCollection(product.collection as string);
// //   const selectedPrice = detailDiscountPercent > 0 ? applyDiscount(selectedPriceOriginal, detailDiscountPercent) : selectedPriceOriginal;

// //   const onAdd = () => {
// //     if (!canAdd || !size) return;
// //     const savedUser = sessionStorage.getItem("rangista_user");
// //     if (!savedUser) {
// //       navigate("/login");
// //       return;
// //     }
// //     addItem({ id: product.id, name: product.name, price: selectedPrice, image: product.image, size, collection: product.collection }, 1);
// //   };

// //   return (
// //     <main className="container py-10 grid md:grid-cols-2 gap-6 md:gap-10">
// //       {/* Carousel for images */}
// //       <div className="relative">
// //         {detailDiscountPercent > 0 ? (
// //           <div className="absolute left-3 top-3 z-20 rounded-sm bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">-{detailDiscountPercent}%</div>
// //         ) : null}
// //         <Carousel className="w-full">
// //           <CarouselContent>
// //             {[product.image, ...(product.images ?? [])].map((img, index) => (
// //               <CarouselItem key={index}>
// //                 <img src={img} alt={`${product.name} - Image ${index + 1}`} className="rounded-lg object-cover w-full aspect-square" />
// //               </CarouselItem>
// //             ))}
// //           </CarouselContent>
// //           <CarouselPrevious />
// //           <CarouselNext />
// //         </Carousel>
// //       </div>

// //       {/* Product info */}
// //       <div className="space-y-6">
// //         <div className="space-y-1">
// //           <h1 className="font-serif text-3xl">{product.name}</h1>
// //           <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.collection}</p>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <div className="flex items-center gap-1">
// //             {Array.from({ length: 5 }).map((_, index) => {
// //               const percent = Math.max(0, Math.min(100, (avgRating - index) * 100));
// //               return <PartialStar key={index} percent={percent} size={16} />;
// //             })}
// //           </div>
// //           <span className="text-sm text-muted-foreground">
// //             {avgRating.toFixed(1)} ({reviewCount} reviews)
// //           </span>
// //         </div>
// //         <div className="space-y-1">
// //           <h2 className="text-2xl font-bold">
// //             {detailDiscountPercent > 0 ? (
// //               <div className="flex items-baseline gap-3">
// //                 <span className="text-sm text-muted-foreground line-through">{formatPKR(selectedPriceOriginal)}</span>
// //                 <span className="text-2xl font-bold">{formatPKR(selectedPrice)}</span>
// //               </div>
// //             ) : (
// //               <span>{formatPKR(selectedPriceOriginal)}</span>
// //             )}
// //           </h2>
// //           <p className="text-sm text-muted-foreground">
// //             {size === "Kids" ? (
// //               <>Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span></>
// //             ) : (
// //               <>Stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
// //             )}
// //           </p>
// //         </div>
// //         <div className="space-y-2">
// //           <label className="text-sm font-medium">Size</label>
// //           <div className="flex gap-2 flex-wrap">
// //             {sizes.map((s) => (
// //               <button
// //                 key={s}
// //                 onClick={() => setSize(s)}
// //                 className={`rounded-full border px-3 py-1 text-sm ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
// //               >
// //                 {s}
// //               </button>
// //             ))}
// //             {/* show non-interactive kids availability as a green tick */}
// //             {product.kids ? (
// //               <span className="inline-flex items-center gap-2 ml-2 text-sm">
// //                 <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
// //                   ✓
// //                 </span>
// //                 <span className="text-muted-foreground">Kids</span>
// //               </span>
// //             ) : null}
// //             <SizeChartDialog collection={product.collection as any} />
// //           </div>
// //         </div>

// //         <div className="mt-6 flex gap-2">
// //           <Button disabled={!canAdd} onClick={onAdd} className="flex-1">
// //             {canAdd ? "Add to Cart" : "Out of stock"}
// //           </Button>
// //           <Link to="/" className="inline-flex items-center rounded-md border px-4">
// //             Back
// //           </Link>
// //         </div>

// //         <Card className="mt-8 p-4 space-y-4">
// //           <div>
// //             <h2 className="font-serif text-xl">Details</h2>
// //             <p className="text-sm text-muted-foreground">{product.description}</p>
// //           </div>
// //           <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
// //             <li>Available sizes: {sizes.join(", ")}{product.kids ? ", Kids" : ""}</li>
// //             <li>Collection: {product.collection}</li>
// //           </ul>
// //           <div className="space-y-3 border-t pt-4">
// //             <h3 className="font-medium">Customer Reviews</h3>
// //             {reviews.length === 0 ? (
// //               <p className="text-sm text-muted-foreground">No reviews yet. Submit one from your orders after purchase.</p>
// //             ) : (
// //               <ul className="space-y-3">
// //                 {reviews.map((review) => (
// //                   <li key={review.id} className="rounded-lg border p-3">
// //                     <div className="font-medium text-sm">{review.userId}</div>
// //                     <div className="flex items-center justify-between text-sm mt-1">
// //                       <div className="flex items-center gap-1">
// //                         {Array.from({ length: 5 }).map((_, index) => {
// //                           const percent = Math.max(0, Math.min(100, (review.rating - index) * 100));
// //                           return <PartialStar key={index} percent={percent} size={14} />;
// //                         })}
// //                       </div>
// //                       <span className="text-xs text-muted-foreground">
// //                         {new Date(review.createdAt).toLocaleDateString()}
// //                       </span>
// //                     </div>
// //                     {review.size ? (
// //                       <div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
// //                         Size: {review.size}
// //                       </div>
// //                     ) : null}
// //                     {review.comment ? (
// //                       <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
// //                     ) : null}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         </Card>
// //       </div>
// //     </main>
// //   );
// // }










// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { getProduct } from "@/data/catalog";
// import { formatPKR } from "@/lib/currency";
// import { getStock } from "@/data/stock";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useCart } from "@/context/CartContext";
// import { listReviewsByProduct, type Review } from "@/data/reviews";
// import { Star } from "lucide-react";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import SizeChartDialog from "@/components/SizeChartDialog";
// import { getDiscountForCollection, applyDiscount } from "@/data/discount";

// type SizeKey = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Kids";

// function PartialStar({ percent, size }: { percent: number; size: number }) {
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <Star size={size} className="absolute text-yellow-500 opacity-30" />
//       <div style={{ width: `${percent}%`, overflow: "hidden", position: "absolute" }}>
//         <Star size={size} className="text-yellow-500 fill-yellow-500" />
//       </div>
//     </div>
//   );
// }

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<ReturnType<typeof getProduct> | undefined>(undefined);
//   const [sizes, setSizes] = useState<SizeKey[]>([]);
//   const [size, setSize] = useState<SizeKey | null>(null);
//   const [stock, setStock] = useState<number>(0);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [avgRating, setAvgRating] = useState<number>(0);
//   const [reviewCount, setReviewCount] = useState<number>(0);
//   const { addItem } = useCart();
//   const navigate = useNavigate();

//   // Helper function to load product data
//   const loadProductData = (productId: string) => {
//     const prod = getProduct(productId);
//     if (!prod) return;

//     setProduct(prod);
//     setAvgRating(prod.average_rating);
//     setReviewCount(prod.total_reviews);

//     // Calculate available sizes
//     const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"].filter((s) => {
//       if (s === "XS" && prod.XS_stock > 0) return true;
//       if (s === "S" && prod.S_stock > 0) return true;
//       if (s === "M" && prod.M_stock > 0) return true;
//       if (s === "L" && prod.L_stock > 0) return true;
//       if (s === "XL" && prod.XL_stock > 0) return true;
//       if (s === "XXL" && prod.XXL_stock > 0) return true;
//       return false;
//     }) as SizeKey[];

//     setSizes(availableSizes);

//     // Set initial size (do NOT default to "Kids" as a selectable size)
//     const initialSize: SizeKey | null = availableSizes[0] ?? null;
//     setSize(initialSize);

//     // Load stock for initial size (0 when there's no selectable size)
//     const initialStock = initialSize ? getStock(productId, initialSize) : 0;
//     setStock(initialStock);
//   };

//   // Fetch product when id changes or when products are loaded
//   useEffect(() => {
//     if (!id) {
//       setProduct(undefined);
//       setSizes([]);
//       setSize(null);
//       setStock(0);
//       return;
//     }

//     // Try to load product immediately
//     loadProductData(id);

//     // Also listen for products:change in case they load after this component mounts
//     const handleProductsLoaded = () => {
//       loadProductData(id);
//     };

//     window.addEventListener("products:change", handleProductsLoaded);
//     return () => window.removeEventListener("products:change", handleProductsLoaded);
//   }, [id]);

//   useEffect(() => {
//     const onChange = () => {
//       if (id && size) {
//         setStock(getStock(id, size));
//       } else {
//         setStock(0);
//       }
//     };
//     window.addEventListener("stock:change", onChange);
//     return () => window.removeEventListener("stock:change", onChange);
//   }, [id, size]);

//   // Update stock when size changes
//   useEffect(() => {
//     if (id && size) {
//       setStock(getStock(id, size));
//     } else {
//       setStock(0);
//     }
//   }, [id, size]);

//   useEffect(() => {
//     if (!product) return;
//     const fetchReviews = async () => {
//       try {
//         const fetchedReviews = await listReviewsByProduct(product.id);
//         setReviews(fetchedReviews);
//         const count = fetchedReviews.length;
//         const avg = count ? fetchedReviews.reduce((s, r) => s + r.rating, 0) / count : 0;
//         setAvgRating(avg);
//         setReviewCount(count);
//       } catch (error) {
//         console.error(`Error fetching reviews for product ${product.id}:`, error);
//       }
//     };
//     fetchReviews();
//     if (typeof window !== "undefined") {
//       window.addEventListener("reviews:change", fetchReviews);
//       return () => window.removeEventListener("reviews:change", fetchReviews);
//     }
//   }, [product?.id]);

//   if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

//   const canAdd = stock > 0 && !!size;

//   // compute selected price and discount for UI
//   const selectedPriceOriginal = size
//     ? size === "XS"
//       ? product.XS_price
//       : size === "S"
//       ? product.S_price
//       : size === "M"
//       ? product.M_price
//       : size === "L"
//       ? product.L_price
//       : size === "XL"
//       ? product.XL_price
//       : size === "XXL"
//       ? product.XXL_price
//       : product.S_price
//     : product.S_price;

//   const detailDiscountPercent = getDiscountForCollection(product.collection as string);
//   const selectedPrice = detailDiscountPercent > 0 ? applyDiscount(selectedPriceOriginal, detailDiscountPercent) : selectedPriceOriginal;

//   const onAdd = () => {
//     if (!canAdd || !size) return;
//     const savedUser = sessionStorage.getItem("rangista_user");
//     if (!savedUser) {
//       navigate("/login");
//       return;
//     }
//     addItem({ id: product.id, name: product.name, price: selectedPrice, image: product.image, size, collection: product.collection }, 1);
//   };

//   return (
//     <main className="container py-10 grid md:grid-cols-2 gap-6 md:gap-10">
//       {/* Carousel for images */}
//       <div className="relative">
//         {detailDiscountPercent > 0 ? (
//           <div className="absolute left-3 top-3 z-20 rounded-sm bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">-{detailDiscountPercent}%</div>
//         ) : null}
//         <Carousel className="w-full">
//           <CarouselContent>
//             {[product.image, ...(product.images ?? [])].map((img, index) => (
//               <CarouselItem key={index}>
//                 <img src={img} alt={`${product.name} - Image ${index + 1}`} className="rounded-lg object-cover w-full aspect-square" />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>

//       {/* Product info */}
//       <div className="space-y-6">
//         <div className="space-y-1">
//           <h1 className="font-serif text-3xl">{product.name}</h1>
//           <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.collection}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="flex items-center gap-1">
//             {Array.from({ length: 5 }).map((_, index) => {
//               const percent = Math.max(0, Math.min(100, (avgRating - index) * 100));
//               return <PartialStar key={index} percent={percent} size={16} />;
//             })}
//           </div>
//           <span className="text-sm text-muted-foreground">
//             {avgRating.toFixed(1)} ({reviewCount} reviews)
//           </span>
//         </div>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold">
//             {detailDiscountPercent > 0 ? (
//               <div className="flex items-baseline gap-3">
//                 <span className="text-sm text-muted-foreground line-through">{formatPKR(selectedPriceOriginal)}</span>
//                 <span className="text-2xl font-bold">{formatPKR(selectedPrice)}</span>
//               </div>
//             ) : (
//               <span>{formatPKR(selectedPriceOriginal)}</span>
//             )}
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             {size === "Kids" ? (
//               <>Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span></>
//             ) : (
//               <>Stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
//             )}
//           </p>
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Size</label>
//           <div className="flex gap-2 flex-wrap">
//             {sizes.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setSize(s)}
//                 className={`rounded-full border px-3 py-1 text-sm ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
//               >
//                 {s}
//               </button>
//             ))}
//             {/* show non-interactive kids availability as a green tick */}
//             {product.kids ? (
//               <span className="inline-flex items-center gap-2 ml-2 text-sm">
//                 <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
//                   ✓
//                 </span>
//                 <span className="text-muted-foreground">Kids</span>
//               </span>
//             ) : null}
//             <SizeChartDialog collection={product.collection as any} />
//           </div>
//         </div>

//         <div className="mt-6 flex gap-2">
//           <Button disabled={!canAdd} onClick={onAdd} className="flex-1">
//             {canAdd ? "Add to Cart" : "Out of stock"}
//           </Button>
//           <Link to="/" className="inline-flex items-center rounded-md border px-4">
//             Back
//           </Link>
//         </div>

//         <Card className="mt-8 p-4 space-y-4">
//           <div>
//             <h2 className="font-serif text-xl">Details</h2>
//             <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
//               {product.description}
//             </div>
//           </div>
//           <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
//             <li>Available sizes: {sizes.join(", ")}{product.kids ? ", Kids" : ""}</li>
//             <li>Collection: {product.collection}</li>
//           </ul>
//           <div className="space-y-3 border-t pt-4">
//             <h3 className="font-medium">Customer Reviews</h3>
//             {reviews.length === 0 ? (
//               <p className="text-sm text-muted-foreground">No reviews yet. Submit one from your orders after purchase.</p>
//             ) : (
//               <ul className="space-y-3">
//                 {reviews.map((review) => (
//                   <li key={review.id} className="rounded-lg border p-3">
//                     <div className="font-medium text-sm">{review.userId}</div>
//                     <div className="flex items-center justify-between text-sm mt-1">
//                       <div className="flex items-center gap-1">
//                         {Array.from({ length: 5 }).map((_, index) => {
//                           const percent = Math.max(0, Math.min(100, (review.rating - index) * 100));
//                           return <PartialStar key={index} percent={percent} size={14} />;
//                         })}
//                       </div>
//                       <span className="text-xs text-muted-foreground">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     {review.size ? (
//                       <div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
//                         Size: {review.size}
//                       </div>
//                     ) : null}
//                     {review.comment ? (
//                       <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
//                     ) : null}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </Card>
//       </div>
//     </main>
//   );
// }


















import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct } from "@/data/catalog";
import { formatPKR } from "@/lib/currency";
import { getStock } from "@/data/stock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { listReviewsByProduct, type Review } from "@/data/reviews";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SizeChartDialog from "@/components/SizeChartDialog";
import { getDiscountForCollection, applyDiscount } from "@/data/discount";

type SizeKey = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Kids";

function PartialStar({ percent, size }: { percent: number; size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Star size={size} className="absolute text-yellow-500 opacity-30" />
      <div style={{ width: `${percent}%`, overflow: "hidden", position: "absolute" }}>
        <Star size={size} className="text-yellow-500 fill-yellow-500" />
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ReturnType<typeof getProduct> | undefined>(undefined);
  const [sizes, setSizes] = useState<SizeKey[]>([]);
  const [size, setSize] = useState<SizeKey | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Helper function to load product data
  const loadProductData = (productId: string) => {
    const prod = getProduct(productId);
    if (!prod) return;

    setProduct(prod);
    setAvgRating(prod.average_rating);
    setReviewCount(prod.total_reviews);

    // Calculate all sizes (including those with 0 stock), but exclude those with -1 or less stock
    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"].filter((s) => {
      let sizeStock = 0;
      if (s === "XS") sizeStock = prod.XS_stock;
      else if (s === "S") sizeStock = prod.S_stock;
      else if (s === "M") sizeStock = prod.M_stock;
      else if (s === "L") sizeStock = prod.L_stock;
      else if (s === "XL") sizeStock = prod.XL_stock;
      else if (s === "XXL") sizeStock = prod.XXL_stock;
      return sizeStock >= 0;
    }) as SizeKey[];

    setSizes(allSizes);

    // Set initial size to the first size with stock > 0, or first available size
    let initialSize: SizeKey | null = null;
    for (const s of allSizes) {
      const st = getStock(productId, s);
      if (st > 0) {
        initialSize = s;
        break;
      }
    }
    if (!initialSize && allSizes.length > 0) {
      initialSize = allSizes[0];
    }
    setSize(initialSize);

    // Load stock for initial size (0 when there's no selectable size)
    const initialStock = initialSize ? getStock(productId, initialSize) : 0;
    setStock(initialStock);
  };

  // Fetch product when id changes or when products are loaded
  useEffect(() => {
    if (!id) {
      setProduct(undefined);
      setSizes([]);
      setSize(null);
      setStock(0);
      return;
    }

    // Try to load product immediately
    loadProductData(id);

    // Also listen for products:change in case they load after this component mounts
    const handleProductsLoaded = () => {
      loadProductData(id);
    };

    window.addEventListener("products:change", handleProductsLoaded);
    return () => window.removeEventListener("products:change", handleProductsLoaded);
  }, [id]);

  useEffect(() => {
    const onChange = () => {
      if (id && size) {
        setStock(getStock(id, size));
      } else {
        setStock(0);
      }
    };
    window.addEventListener("stock:change", onChange);
    return () => window.removeEventListener("stock:change", onChange);
  }, [id, size]);

  // Update stock when size changes
  useEffect(() => {
    if (id && size) {
      setStock(getStock(id, size));
    } else {
      setStock(0);
    }
  }, [id, size]);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await listReviewsByProduct(product.id);
        setReviews(fetchedReviews);
        const count = fetchedReviews.length;
        const avg = count ? fetchedReviews.reduce((s, r) => s + r.rating, 0) / count : 0;
        setAvgRating(avg);
        setReviewCount(count);
      } catch (error) {
        console.error(`Error fetching reviews for product ${product.id}:`, error);
      }
    };
    fetchReviews();
    if (typeof window !== "undefined") {
      window.addEventListener("reviews:change", fetchReviews);
      return () => window.removeEventListener("reviews:change", fetchReviews);
    }
  }, [product?.id]);

  if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

  const canAdd = stock > 0 && !!size;

  // compute selected price and discount for UI
  const selectedPriceOriginal = size
    ? size === "XS"
      ? product.XS_price
      : size === "S"
      ? product.S_price
      : size === "M"
      ? product.M_price
      : size === "L"
      ? product.L_price
      : size === "XL"
      ? product.XL_price
      : size === "XXL"
      ? product.XXL_price
      : product.S_price
    : product.S_price;

  const detailDiscountPercent = getDiscountForCollection(product.collection as string);
  const selectedPrice = detailDiscountPercent > 0 ? applyDiscount(selectedPriceOriginal, detailDiscountPercent) : selectedPriceOriginal;

  const onAdd = () => {
    if (!canAdd || !size) return;
    const savedUser = sessionStorage.getItem("rangista_user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    addItem({ id: product.id, name: product.name, price: selectedPrice, image: product.image, size, collection: product.collection }, 1);
  };

  return (
    <main className="container py-10 grid md:grid-cols-2 gap-6 md:gap-10">
      {/* Carousel for images */}
      <div className="relative">
        {detailDiscountPercent > 0 ? (
          <div className="absolute left-3 top-3 z-20 rounded-sm bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">-{detailDiscountPercent}%</div>
        ) : null}
        <Carousel className="w-full">
          <CarouselContent>
            {[product.image, ...(product.images ?? [])].map((img, index) => (
              <CarouselItem key={index}>
                <img src={img} alt={`${product.name} - Image ${index + 1}`} className="rounded-lg object-cover w-full aspect-[3/4] md:aspect-square" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Product info */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl">{product.name}</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.collection}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const percent = Math.max(0, Math.min(100, (avgRating - index) * 100));
              return <PartialStar key={index} percent={percent} size={16} />;
            })}
          </div>
          <span className="text-sm text-muted-foreground">
            {avgRating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">
            {detailDiscountPercent > 0 ? (
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-muted-foreground line-through">{formatPKR(selectedPriceOriginal)}</span>
                <span className="text-2xl font-bold">{formatPKR(selectedPrice)}</span>
              </div>
            ) : (
              <span>{formatPKR(selectedPriceOriginal)}</span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            {size === "Kids" ? (
              <>Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span></>
            ) : (
              <>Stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
            )}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Size</label>
          <div className="flex gap-2 flex-wrap items-center">
            {sizes.map((s) => {
              const sizeStock = getStock(id!, s);
              const isOutOfStock = sizeStock === 0;
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-3 py-1 text-sm transition-all ${
                    size === s
                      ? "border-accent bg-accent text-accent-foreground"
                      : "bg-background hover:border-accent"
                  }`}
                  title={isOutOfStock ? "Out of Stock" : `${s} - ${sizeStock} in stock`}
                >
                  {s}
                </button>
              );
            })}
            {/* show non-interactive kids availability as a green tick */}
            {product.kids ? (
              <span className="inline-flex items-center gap-2 ml-2 text-sm">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                  ✓
                </span>
                <span className="text-muted-foreground">Kids</span>
              </span>
            ) : null}
            <SizeChartDialog collection={product.collection as any} />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Button disabled={!canAdd} onClick={onAdd} className="flex-1">
            {canAdd ? "Add to Cart" : "Out of stock"}
          </Button>
          <Link to="/" className="inline-flex items-center rounded-md border px-4">
            Back
          </Link>
        </div>

        <Card className="mt-8 p-4 space-y-4">
          <div>
            <h2 className="font-serif text-xl">Details</h2>
            <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
              {product.description}
            </div>
          </div>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
            <li>Available sizes: {sizes.join(", ")}{product.kids ? ", Kids" : ""}</li>
            <li>Collection: {product.collection}</li>
          </ul>
          <div className="space-y-3 border-t pt-4">
            <h3 className="font-medium">Customer Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet. Submit one from your orders after purchase.</p>
            ) : (
              <ul className="space-y-3">
                {reviews.map((review) => (
                  <li key={review.id} className="rounded-lg border p-3">
                    <div className="font-medium text-sm">{review.userId}</div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const percent = Math.max(0, Math.min(100, (review.rating - index) * 100));
                          return <PartialStar key={index} percent={percent} size={14} />;
                        })}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.size ? (
                      <div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Size: {review.size}
                      </div>
                    ) : null}
                    {review.comment ? (
                      <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
