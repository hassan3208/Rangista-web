// // import { Button } from "@/components/ui/button";
// // import SizeChartDialog from "@/components/SizeChartDialog";
// // import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// // import { useCart } from "@/context/CartContext";
// // import { formatPKR } from "@/lib/currency";
// // import { useEffect, useState } from "react";
// // import { Star, StarHalf, CheckCircle } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { getStock } from "@/data/stock";
// // import { useFavorites } from "@/context/FavoritesContext";
// // import { listReviewsByProduct } from "@/data/reviews";
// // import type { Product } from "@/data/products";

// // type SizeKey = "S" | "M" | "L";

// // function FavButton({ id }: { id: string }) {
// //   const { isFavorite, toggleFavorite } = useFavorites();
// //   const active = isFavorite(id);
// //   return (
// //     <button
// //       aria-label="wishlist"
// //       onClick={() => toggleFavorite(id)}
// //       className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-medium ${active ? "bg-accent text-accent-foreground" : "bg-background/80"}`}
// //     >
// //       ♥
// //     </button>
// //   );
// // }

// // export default function ProductCard({
// //   id,
// //   name,
// //   image,
// //   collection,
// //   total_reviews,
// //   average_rating,
// //   S_price,
// //   M_price,
// //   L_price,
// //   S_stock,
// //   M_stock,
// //   L_stock,
// //   kids,
// // }: Product) {
// //   const { addItem } = useCart();
// //   const navigate = useNavigate();
// //   const sizes: SizeKey[] = ["S", "M", "L"];
// //   const [size, setSize] = useState<SizeKey | null>(sizes[0] || null);
// //   const [stock, setStock] = useState<number>(size ? getStock(id, size) : 0);
// //   const [avgRating, setAvgRating] = useState<number>(average_rating);
// //   const [reviewCount, setReviewCount] = useState<number>(total_reviews);

// //   useEffect(() => {
// //     if (size) {
// //       const newStock = getStock(id, size);
// //       setStock(newStock);
// //       console.log("Stock updated:", { id, size, stock: newStock });
// //     } else {
// //       setStock(0);
// //       console.log("No size selected:", { id, size });
// //     }
// //   }, [id, size]);

// //   useEffect(() => {
// //     const onChange = () => {
// //       if (size) {
// //         const newStock = getStock(id, size);
// //         setStock(newStock);
// //         console.log("Stock change event:", { id, size, stock: newStock });
// //       } else {
// //         setStock(0);
// //         console.log("Stock change event, no size:", { id, size });
// //       }
// //     };
// //     window.addEventListener("stock:change", onChange);
// //     return () => window.removeEventListener("stock:change", onChange);
// //   }, [id, size]);

// //   useEffect(() => {
// //     const onChange = () => {
// //       if (size) {
// //         const newStock = getStock(id, size);
// //         setStock(newStock);
// //         console.log("Products change event:", { id, size, stock: newStock });
// //       } else {
// //         setStock(0);
// //         console.log("Products change event, no size:", { id, size });
// //       }
// //     };
// //     window.addEventListener("products:change", onChange);
// //     return () => window.removeEventListener("products:change", onChange);
// //   }, [id, size]);

// //   useEffect(() => {
// //     const update = async () => {
// //       const list = await listReviewsByProduct(id);
// //       const count = list.length;
// //       const avg = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
// //       setAvgRating(avg);
// //       setReviewCount(count);
// //     };
// //     update();
// //     window.addEventListener("reviews:change", update);
// //     return () => window.removeEventListener("reviews:change", update);
// //   }, [id]);

// //   const currentPrice = size === "S" ? S_price : size === "M" ? M_price : size === "L" ? L_price : S_price;

// //   const add = async () => {
// //     if (stock <= 0 || !size) return;
// //     const savedUser = localStorage.getItem("rangista_user");
// //     if (!savedUser) {
// //       navigate("/login");
// //       return;
// //     }

// //     const userId = JSON.parse(savedUser).id; // Assuming rangista_user contains { id: number, ... }
// //     const payload = {
// //       user_id: userId,
// //       product_id: id,
// //       size,
// //       quantity: 1,
// //     };

// //     try {
// //       const response = await fetch('http://127.0.0.1:8000/cart/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to add to cart: ${response.statusText}`);
// //       }

// //       const result = await response.json();
// //       console.log("Cart updated:", result);

// //       // Update local cart state
// //       addItem({ id, name, price: currentPrice, image, size, collection }, 1);

// //       // Optionally, adjust stock locally (assuming backend handles stock)
// //       // If backend doesn't adjust stock, uncomment the following:
// //       // adjustStock(id, -1, size);
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //       // Optionally, show user feedback (e.g., toast notification)
// //       alert("Failed to add item to cart. Please try again.");
// //     }
// //   };

// //   return (
// //     <Card className="overflow-hidden">
// //       <CardHeader className="p-0">
// //         <div className="relative">
// //           <Link to={`/product/${id}`}>
// //             <img src={image} alt={name} className="h-56 w-full object-cover" />
// //           </Link>
// //           <FavButton id={id} />
// //         </div>
// //       </CardHeader>
// //       <CardContent className="pt-4">
// //         <div className="flex items-start justify-between gap-3">
// //           <div>
// //             <Link to={`/product/${id}`} className="font-medium hover:underline">{name}</Link>
// //             <div className="text-xs text-muted-foreground">{collection}</div>
// //           </div>
// //           <div className="text-right font-semibold">{formatPKR(currentPrice)}</div>
// //         </div>
// //         <div className="mt-1 text-xs flex items-center gap-2">
// //           <span>In stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></span>
// //           {kids && (
// //             <span className="flex items-center gap-1 text-green-600">
// //               <CheckCircle size={14} aria-label="Suitable for kids" />
// //               Kids
// //             </span>
// //           )}
// //         </div>
// //         <div className="mt-2 flex items-center gap-1 text-yellow-500 text-sm">
// //           {(() => {
// //             const fullStars = Math.floor(avgRating);
// //             const hasHalf = avgRating - fullStars >= 0.5;
// //             return Array.from({ length: 5 }).map((_, i) => {
// //               if (i < fullStars) {
// //                 return <Star key={i} size={14} className="fill-yellow-500" />;
// //               }
// //               if (i === fullStars && hasHalf) {
// //                 return <StarHalf key={i} size={14} className="fill-yellow-500" />;
// //               }
// //               return <Star key={i} size={14} className="opacity-30" />;
// //             });
// //           })()}
// //           <span className="ml-1 text-xs text-muted-foreground">({reviewCount})</span>
// //         </div>
// //         <div className="mt-3 flex flex-wrap items-center gap-2">
// //           {sizes.map((s) => (
// //             <button
// //               key={s}
// //               onClick={() => setSize(s)}
// //               className={`rounded-full border px-3 py-1 text-xs ${size === s ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
// //             >
// //               {s}
// //             </button>
// //           ))}
// //           <SizeChartDialog collection={collection} />
// //         </div>
// //       </CardContent>
// //       <CardFooter>
// //         <Button className="w-full" onClick={add} disabled={stock <= 0 || !size}>
// //           {stock > 0 && size ? "Add to Cart" : "Out of stock"}
// //         </Button>
// //       </CardFooter>
// //     </Card>
// //   );
// // }
















import { Button } from "@/components/ui/button";
import SizeChartDialog from "@/components/SizeChartDialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/lib/currency";
import { useEffect, useState } from "react";
import { Star, StarHalf, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getStock } from "@/data/stock";
import { useFavorites } from "@/context/FavoritesContext";
import { listReviewsByProduct } from "@/data/reviews";
import type { Product } from "@/data/products";
import { API_BASE_URL } from "@/lib/api-config";

type SizeKey = "S" | "M" | "L";

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
  image,
  collection,
  total_reviews,
  average_rating,
  S_price,
  M_price,
  L_price,
  S_stock,
  M_stock,
  L_stock,
  kids,
}: Product) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const sizes: SizeKey[] = ["S", "M", "L"];
  const [size, setSize] = useState<SizeKey | null>(sizes[0] || null);
  const [stock, setStock] = useState<number>(size ? getStock(id, size) : 0);
  const [avgRating, setAvgRating] = useState<number>(average_rating);
  const [reviewCount, setReviewCount] = useState<number>(total_reviews);
  const [showCartEmoji, setShowCartEmoji] = useState<boolean>(false);

  useEffect(() => {
    if (size) {
      const newStock = getStock(id, size);
      setStock(newStock);
      console.log("Stock updated:", { id, size, stock: newStock });
    } else {
      setStock(0);
      console.log("No size selected:", { id, size });
    }
  }, [id, size]);

  useEffect(() => {
    const onChange = () => {
      if (size) {
        const newStock = getStock(id, size);
        setStock(newStock);
        console.log("Stock change event:", { id, size, stock: newStock });
      } else {
        setStock(0);
        console.log("Stock change event, no size:", { id, size });
      }
    };
    window.addEventListener("stock:change", onChange);
    return () => window.removeEventListener("stock:change", onChange);
  }, [id, size]);

  useEffect(() => {
    const onChange = () => {
      if (size) {
        const newStock = getStock(id, size);
        setStock(newStock);
        console.log("Products change event:", { id, size, stock: newStock });
      } else {
        setStock(0);
        console.log("Products change event, no size:", { id, size });
      }
    };
    window.addEventListener("products:change", onChange);
    return () => window.removeEventListener("products:change", onChange);
  }, [id, size]);

  useEffect(() => {
    const update = async () => {
      const list = await listReviewsByProduct(id);
      const count = list.length;
      const avg = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
      setAvgRating(avg);
      setReviewCount(count);
    };
    update();
    window.addEventListener("reviews:change", update);
    return () => window.removeEventListener("reviews:change", update);
  }, [id]);

  const currentPrice = size === "S" ? S_price : size === "M" ? M_price : size === "L" ? L_price : S_price;

  const add = async () => {
    if (stock <= 0 || !size) return;

    // Trigger cart emoji animation
    setShowCartEmoji(true);
    setTimeout(() => setShowCartEmoji(false), 2000); // Hide after 2s animation

    const savedUser = localStorage.getItem("rangista_user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    const userId = JSON.parse(savedUser).id; // Assuming rangista_user contains { id: number, ... }
    const payload = {
      user_id: userId,
      product_id: id,
      size,
      quantity: 1,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Cart updated:", result);

      // Update local cart state
      addItem({ id, name, price: currentPrice, image, size, collection }, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <Card className="overflow-hidden relative">
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
        <div className="mt-1 text-xs flex items-center gap-2">
          <span>In stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></span>
          {kids && (
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle size={14} aria-label="Suitable for kids" />
              Kids
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 text-yellow-500 text-sm">
          {(() => {
            const fullStars = Math.floor(avgRating);
            const hasHalf = avgRating - fullStars >= 0.5;
            return Array.from({ length: 5 }).map((_, i) => {
              if (i < fullStars) {
                return <Star key={i} size={14} className="fill-yellow-500" />;
              }
              if (i === fullStars && hasHalf) {
                return <StarHalf key={i} size={14} className="fill-yellow-500" />;
              }
              return <Star key={i} size={14} className="opacity-30" />;
            });
          })()}
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
      <CardFooter className="relative">
        <Button className="w-full" onClick={add} disabled={stock <= 0 || !size}>
          {stock > 0 && size ? "Add to Cart" : "Out of stock"}
        </Button>
        {showCartEmoji && (
          <span
            className="absolute bottom-16 right-4 text-2xl"
            style={{
              animation: "spinAndFly 2s ease-out forwards",
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🛒
          </span>
        )}
      </CardFooter>
      <style>
        {`
          @keyframes spinAndFly {
            0% {
              opacity: 1;
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateY(-150px) rotate(0deg) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-400px) rotate(720deg) scale(1.2);
            }
          }
        `}
      </style>
    </Card>
  );
}





