// import { useEffect, useMemo, useState } from "react";
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

// type SizeKey = "S" | "M" | "L" | "Kids";

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const product = useMemo(() => (id ? getProduct(id) : undefined), [id]);
//   const sizes = useMemo(() => {
//     if (!product) return [];
//     return ["S", "M", "L"].filter((s) => {
//       if (s === "S" && product.S_stock > 0) return true;
//       if (s === "M" && product.M_stock > 0) return true;
//       if (s === "L" && product.L_stock > 0) return true;
//       return false;
//     }) as SizeKey[];
//   }, [product]);
//   const [size, setSize] = useState<SizeKey | null>(null);
//   const [stock, setStock] = useState<number>(0);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const { addItem } = useCart();
//   const navigate = useNavigate();

//   // Initialize size when product changes
//   useEffect(() => {
//     if (product) {
//       const initialSize: SizeKey = sizes[0] || (product.kids ? "Kids" : "S");
//       setSize(initialSize);
//     } else {
//       setSize(null);
//     }
//   }, [product, sizes]);

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

//   useEffect(() => {
//     if (id && size) {
//       setStock(getStock(id, size));
//     } else {
//       setStock(0);
//     }
//   }, [id, size]);

//   useEffect(() => {
//     if (!product) return;
//     const update = async () => {
//       const fetchedReviews = await listReviewsByProduct(product.id);
//       setReviews(fetchedReviews);
//     };
//     update();
//     if (typeof window !== "undefined") {
//       window.addEventListener("reviews:change", update);
//       return () => window.removeEventListener("reviews:change", update);
//     }
//   }, [product?.id]);

//   if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

//   const canAdd = stock > 0 && !!size;

//   const onAdd = () => {
//     if (!canAdd || !size) return;
//     const savedUser = localStorage.getItem("rangista_user");
//     if (!savedUser) {
//       navigate("/login");
//       return;
//     }
//     const price = size === "S" ? product.S_price : size === "M" ? product.M_price : size === "L" ? product.L_price : product.S_price;
//     addItem({ id: product.id, name: product.name, price, image: product.image, size, collection: product.collection }, 1);
//   };

//   return (
//     <main className="container py-10 grid gap-8 md:grid-cols-2">
//       <div>
//         <Carousel className="w-full">
//           <CarouselContent>
//             {(product.images && product.images.length > 0 ? product.images : [product.image]).map((src, idx) => (
//               <CarouselItem key={src + idx}>
//                 <img src={src} alt={`${product.name} ${idx + 1}`} className="w-full aspect-[4/3] rounded-xl object-cover" />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//       <div>
//         <h1 className="font-serif text-3xl">{product.name}</h1>
//         <p className="mt-2 text-muted-foreground">{product.collection}</p>
//         <p className="mt-4 text-2xl font-semibold">{formatPKR(size ? (size === "S" ? product.S_price : size === "M" ? product.M_price : size === "L" ? product.L_price : product.S_price) : 0)}</p>
//         <p className="mt-2 text-sm">
//           {size === "Kids" ? (
//             <>Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span></>
//           ) : (
//             <>In stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
//           )}
//         </p>

//         <div className="mt-6">
//           <label className="text-xs text-muted-foreground">Size</label>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {sizes.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setSize(s)}
//                 className={`rounded-full border px-3 py-1 text-sm ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
//               >
//                 {s}
//               </button>
//             ))}
//             {product.kids && (
//               <button
//                 onClick={() => setSize("Kids")}
//                 className={`rounded-full border px-3 py-1 text-sm ${size === "Kids" ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
//               >
//                 Kids
//               </button>
//             )}
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
//             <p className="text-sm text-muted-foreground">{product.description}</p>
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
//                     <div className="flex items-center justify-between text-sm">
//                       <div className="flex items-center gap-1 text-yellow-500">
//                         {Array.from({ length: 5 }).map((_, index) => (
//                           <Star
//                             key={index}
//                             size={14}
//                             className={index < review.rating ? "text-yellow-500" : "text-muted-foreground"}
//                             fill={index < review.rating ? "currentColor" : "none"}
//                           />
//                         ))}
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
















// import { useEffect, useMemo, useState } from "react";
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

// type SizeKey = "S" | "M" | "L" | "Kids";

// export default function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const product = useMemo(() => (id ? getProduct(id) : undefined), [id]);
//   const sizes = useMemo(() => {
//     if (!product) return [];
//     return ["S", "M", "L"].filter((s) => {
//       if (s === "S" && product.S_stock > 0) return true;
//       if (s === "M" && product.M_stock > 0) return true;
//       if (s === "L" && product.L_stock > 0) return true;
//       return false;
//     }) as SizeKey[];
//   }, [product]);
//   const [size, setSize] = useState<SizeKey | null>(null);
//   const [stock, setStock] = useState<number>(0);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const { addItem } = useCart();
//   const navigate = useNavigate();

//   // Initialize size when product changes
//   useEffect(() => {
//     if (product) {
//       const initialSize: SizeKey = sizes[0] || (product.kids ? "Kids" : "S");
//       setSize(initialSize);
//     } else {
//       setSize(null);
//     }
//   }, [product, sizes]);

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

//   useEffect(() => {
//     if (id && size) {
//       setStock(getStock(id, size));
//     } else {
//       setStock(0);
//     }
//   }, [id, size]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!product) return;
//       const updatedReviews = await listReviewsByProduct(product.id);
//       setReviews(updatedReviews);
//     };
//     fetchReviews();
//     if (typeof window !== "undefined") {
//       const update = () => fetchReviews();
//       window.addEventListener("reviews:change", update);
//       return () => window.removeEventListener("reviews:change", update);
//     }
//   }, [product?.id]);

//   if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

//   const canAdd = stock > 0 && !!size;

//   const onAdd = () => {
//     if (!canAdd || !size) return;
//     const savedUser = localStorage.getItem("rangista_user");
//     if (!savedUser) {
//       navigate("/login");
//       return;
//     }
//     const price = size === "S" ? product.S_price : size === "M" ? product.M_price : size === "L" ? product.L_price : product.S_price;
//     addItem({ id: product.id, name: product.name, price, image: product.image, size, collection: product.collection }, 1);
//   };

//   return (
//     <main className="container py-10 grid md:grid-cols-2 gap-6 md:gap-10">
//       {/* Carousel for images */}
//       <div className="relative">
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
//           <div className="flex items-center gap-1 text-yellow-500">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <Star
//                 key={index}
//                 size={16}
//                 className={index < Math.round(product.average_rating) ? "text-yellow-500" : "text-muted-foreground"}
//                 fill={index < Math.round(product.average_rating) ? "currentColor" : "none"}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-muted-foreground">
//             {product.average_rating.toFixed(1)} ({product.total_reviews} reviews)
//           </span>
//         </div>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold">
//             {size ? formatPKR(size === "S" ? product.S_price : size === "M" ? product.M_price : product.L_price) : formatPKR(product.S_price)}
//           </h2>
//           <p className="text-sm text-muted-foreground">Stock: {stock}</p>
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Size</label>
//           <div className="flex gap-2">
//             {sizes.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setSize(s)}
//                 className={`rounded-full border px-3 py-1 text-sm ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
//               >
//                 {s}
//               </button>
//             ))}
//             {product.kids && (
//               <button
//                 onClick={() => setSize("Kids")}
//                 className={`rounded-full border px-3 py-1 text-sm ${size === "Kids" ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
//               >
//                 Kids
//               </button>
//             )}
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
//             <p className="text-sm text-muted-foreground">{product.description}</p>
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
//                       <div className="flex items-center gap-1 text-yellow-500">
//                         {Array.from({ length: 5 }).map((_, index) => (
//                           <Star
//                             key={index}
//                             size={14}
//                             className={index < review.rating ? "text-yellow-500" : "text-muted-foreground"}
//                             fill={index < review.rating ? "currentColor" : "none"}
//                           />
//                         ))}
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












































import { useEffect, useMemo, useState, useId } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct } from "@/data/catalog";
import { formatPKR } from "@/lib/currency";
import { getStock } from "@/data/stock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { listReviewsByProduct, type Review } from "@/data/reviews";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PartialStar = ({ percent = 0, size = 16 }: { percent?: number; size?: number }) => {
  const id = useId();
  const pct = Math.max(0, Math.min(100, percent));
  const starPath =
    "M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.21l8.2-1.192z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect x="0" y="0" width={`${pct}%`} height="100%" />
        </clipPath>
      </defs>
      {/* background (unfilled) */}
      <path d={starPath} fill="#e5e7eb" />
      {/* filled portion masked to percent */}
      <g clipPath={`url(#clip-${id})`}>
        <path d={starPath} fill="#f59e0b" />
      </g>
      {/* subtle stroke */}
      <path d={starPath} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
    </svg>
  );
};

type SizeKey = "S" | "M" | "L" | "Kids";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Memoize product and sizes
  const product = useMemo(() => (id ? getProduct(id) : undefined), [id]);
  const sizes = useMemo(() => {
    if (!product) return [];
    return ["S", "M", "L"].filter((s) => {
      if (s === "S" && product.S_stock > 0) return true;
      if (s === "M" && product.M_stock > 0) return true;
      if (s === "L" && product.L_stock > 0) return true;
      return false;
    }) as SizeKey[];
  }, [product]);

  // Set initial size and stock
  const initialSize = product ? (sizes[0] || (product.kids ? "Kids" : "S")) : null;
  const initialStock = product && id && initialSize ? getStock(id, initialSize) : 0;

  const [size, setSize] = useState<SizeKey | null>(initialSize);
  const [stock, setStock] = useState<number>(initialStock);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Update stock when size changes or on mount
  useEffect(() => {
    if (!product || !id || !size) {
      setStock(0);
      return;
    }

    // Synchronous getStock
    const newStock = getStock(id, size);
    setStock(newStock);

    // Listen for stock changes
    const onChange = () => {
      const updatedStock = getStock(id, size);
      setStock(updatedStock);
    };
    window.addEventListener("stock:change", onChange);
    return () => window.removeEventListener("stock:change", onChange);
  }, [id, size, product]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product) return;
      const updatedReviews = await listReviewsByProduct(product.id);
      setReviews(updatedReviews);
    };
    fetchReviews();
    if (typeof window !== "undefined") {
      const update = () => fetchReviews();
      window.addEventListener("reviews:change", update);
      return () => window.removeEventListener("reviews:change", update);
    }
  }, [product?.id]);

  if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

  // Compute avgRating and reviewCount from reviews
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const reviewCount = reviews.length;

  const canAdd = stock > 0 && !!size;

  const onAdd = () => {
    if (!canAdd || !size) return;
    const savedUser = localStorage.getItem("rangista_user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    const price = size === "S" ? product.S_price : size === "M" ? product.M_price : size === "L" ? product.L_price : product.S_price;
    addItem({ id: product.id, name: product.name, price, image: product.image, size, collection: product.collection }, 1);
  };

  return (
    <main className="container py-10 grid md:grid-cols-2 gap-6 md:gap-10">
      {/* Carousel for images */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {[product.image, ...(product.images ?? [])].map((img, index) => (
              <CarouselItem key={index}>
                <img src={img} alt={`${product.name} - Image ${index + 1}`} className="rounded-lg object-cover w-full aspect-square" />
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
            {size ? formatPKR(size === "S" ? product.S_price : size === "M" ? product.M_price : product.L_price) : formatPKR(product.S_price)}
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
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full border px-3 py-1 text-sm ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
              >
                {s}
              </button>
            ))}
            {product.kids && (
              <button
                onClick={() => setSize("Kids")}
                className={`rounded-full border px-3 py-1 text-sm ${size === "Kids" ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
              >
                Kids
              </button>
            )}
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
            <p className="text-sm text-muted-foreground">{product.description}</p>
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