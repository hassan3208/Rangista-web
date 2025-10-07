// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { useCart } from "@/context/CartContext";
// import { formatPKR } from "@/lib/currency";
// import { useEffect, useState } from "react";
// import { Star } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { getStock } from "@/data/stock";
// import { useFavorites } from "@/context/FavoritesContext";
// import { listReviewsByProduct } from "@/data/reviews";

// function FavButton({ id }: { id: string }) {
//   const { isFavorite, toggleFavorite } = useFavorites();
//   const active = isFavorite(id);
//   return (
//     <button
//       aria-label="wishlist"
//       onClick={() => toggleFavorite(id)}
//       className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-medium ${active ? "bg-accent text-accent-foreground" : "bg-background/80"}`}
//     >
//       ♥
//     </button>
//   );
// }

// export default function ProductCard({
//   id,
//   name,
//   price,
//   image,
//   sizes,
//   rating,
//   reviews,
//   collection,
//   priceBySize,
// }: {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   sizes: string[];
//   rating: number;
//   reviews: number;
//   collection: string;
//   priceBySize?: Record<string, number>;
// }) {
//   const { addItem } = useCart();
//   const navigate = useNavigate();
//   const [size, setSize] = useState<string>(sizes[0]);
//   const [stock, setStock] = useState<number>(() => getStock(id, sizes[0] as any));
//   const [avgRating, setAvgRating] = useState<number>(rating);
//   const [reviewCount, setReviewCount] = useState<number>(reviews);

//   useEffect(() => {
//     const onChange = () => setStock(getStock(id, size as any));
//     window.addEventListener("stock:change", onChange);
//     return () => window.removeEventListener("stock:change", onChange);
//   }, [id, size]);

//   useEffect(() => {
//     const update = () => {
//       const list = listReviewsByProduct(id);
//       const count = list.length;
//       const avg = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
//       setAvgRating(avg);
//       setReviewCount(count);
//     };
//     update();
//     window.addEventListener("reviews:change", update);
//     return () => window.removeEventListener("reviews:change", update);
//   }, [id]);

//   useEffect(() => {
//     setStock(getStock(id, size as any));
//   }, [id, size]);

//   const currentPrice = priceBySize?.[size] ?? price;

//   const add = () => {
//     if (stock <= 0) return;
//     // CartContext will alert if not logged, but also navigate to login here for UX
//     const savedUser = localStorage.getItem("rangista_user");
//     if (!savedUser) {
//       navigate("/login");
//       return;
//     }
//     addItem({ id, name, price: currentPrice, image, size, collection });
//     // Stock adjustment happens inside CartContext; component listens to stock:change
//   };

//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="p-0">
//         <div className="relative">
//           <Link to={`/product/${id}`}>
//             <img src={image} alt={name} className="h-56 w-full object-cover" />
//           </Link>
//           <FavButton id={id} />
//         </div>
//       </CardHeader>
//       <CardContent className="pt-4">
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <Link to={`/product/${id}`} className="font-medium hover:underline">{name}</Link>
//             <div className="text-xs text-muted-foreground">{collection}</div>
//           </div>
//           <div className="text-right font-semibold">{formatPKR(currentPrice)}</div>
//         </div>
//         <div className="mt-1 text-xs">
//           {size === "Kids" ? (
//             <>
//               Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span>
//             </>
//           ) : (
//             <>In stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
//           )}
//         </div>
//         <div className="mt-2 flex items-center gap-1 text-yellow-500 text-sm">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star key={i} size={14} className={i + 1 <= Math.round(avgRating) ? "fill-yellow-500" : "opacity-30"} />
//           ))}
//           <span className="ml-1 text-xs text-muted-foreground">({reviewCount})</span>
//         </div>
//         <div className="mt-3 flex flex-wrap gap-2">
//           {sizes.map((s) => (
//             <button
//               key={s}
//               onClick={() => setSize(s)}
//               className={`rounded-full border px-3 py-1 text-xs ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full" onClick={add} disabled={stock <= 0}>
//           {stock > 0 ? "Add to Cart" : "Out of stock"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }


import { Button } from "@/components/ui/button";
import SizeChartDialog from "@/components/SizeChartDialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/lib/currency";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getStock } from "@/data/stock";
import { useFavorites } from "@/context/FavoritesContext";
import { listReviewsByProduct } from "@/data/reviews";
import type { Product } from "@/data/products";

function FavButton({ id }: { id: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);
  return (
    <button
      aria-label="wishlist"
      onClick={() => toggleFavorite(id)}
      className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-medium ${active ? "bg-accent text-accent-foreground" : "bg-background/80"}`}
    >
      ♥
    </button>
  );
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  sizes,
  rating,
  reviews,
  collection,
  priceBySize,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  rating: number;
  reviews: number;
  collection: Product["collection"];
  priceBySize?: Record<string, number>;
}) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState<string>(sizes[0]);
  const [stock, setStock] = useState<number>(() => getStock(id, sizes[0] as any));
  const [avgRating, setAvgRating] = useState<number>(rating);
  const [reviewCount, setReviewCount] = useState<number>(reviews);

  useEffect(() => {
    const onChange = () => setStock(getStock(id, size as any));
    window.addEventListener("stock:change", onChange);
    return () => window.removeEventListener("stock:change", onChange);
  }, [id, size]);

  useEffect(() => {
    const update = () => {
      const list = listReviewsByProduct(id);
      const count = list.length;
      const avg = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
      setAvgRating(avg);
      setReviewCount(count);
    };
    update();
    window.addEventListener("reviews:change", update);
    return () => window.removeEventListener("reviews:change", update);
  }, [id]);

  useEffect(() => {
    setStock(getStock(id, size as any));
  }, [id, size]);

  const currentPrice = priceBySize?.[size] ?? price;

  const add = () => {
    if (stock <= 0) return;
    // CartContext will alert if not logged, but also navigate to login here for UX
    const savedUser = localStorage.getItem("rangista_user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    addItem({ id, name, price: currentPrice, image, size, collection });
    // Stock adjustment happens inside CartContext; component listens to stock:change
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <Link to={`/product/${id}`}>
            <img src={image} alt={name} className="h-56 w-full object-cover" />
          </Link>
          <FavButton id={id} />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/product/${id}`} className="font-medium hover:underline">{name}</Link>
            <div className="text-xs text-muted-foreground">{collection}</div>
          </div>
          <div className="text-right font-semibold">{formatPKR(currentPrice)}</div>
        </div>
        <div className="mt-1 text-xs">
          {size === "Kids" ? (
            <>
              Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span>
            </>
          ) : (
            <>In stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i + 1 <= Math.round(avgRating) ? "fill-yellow-500" : "opacity-30"} />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({reviewCount})</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-full border px-3 py-1 text-xs ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
            >
              {s}
            </button>
          ))}
          <SizeChartDialog collection={collection} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={add} disabled={stock <= 0}>
          {stock > 0 ? "Add to Cart" : "Out of stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
