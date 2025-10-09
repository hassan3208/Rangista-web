import { useEffect, useMemo, useState } from "react";
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

type SizeKey = "S" | "M" | "L" | "Kids";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
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
  const [size, setSize] = useState<SizeKey | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Initialize size when product changes
  useEffect(() => {
    if (product) {
      const initialSize: SizeKey = sizes[0] || (product.kids ? "Kids" : "S");
      setSize(initialSize);
    } else {
      setSize(null);
    }
  }, [product, sizes]);

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

  useEffect(() => {
    if (id && size) {
      setStock(getStock(id, size));
    } else {
      setStock(0);
    }
  }, [id, size]);

  useEffect(() => {
    if (!product) return;
    const update = () => setReviews(listReviewsByProduct(product.id));
    update();
    if (typeof window !== "undefined") {
      window.addEventListener("reviews:change", update);
      return () => window.removeEventListener("reviews:change", update);
    }
  }, [product?.id]);

  if (!product) return <div className="container py-10">Product not found. <Link to="/" className="underline">Go back</Link></div>;

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
    <main className="container py-10 grid gap-8 md:grid-cols-2">
      <div>
        <Carousel className="w-full">
          <CarouselContent>
            {(product.images && product.images.length > 0 ? product.images : [product.image]).map((src, idx) => (
              <CarouselItem key={src + idx}>
                <img src={src} alt={`${product.name} ${idx + 1}`} className="w-full aspect-[4/3] rounded-xl object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <h1 className="font-serif text-3xl">{product.name}</h1>
        <p className="mt-2 text-muted-foreground">{product.collection}</p>
        <p className="mt-4 text-2xl font-semibold">{formatPKR(size ? (size === "S" ? product.S_price : size === "M" ? product.M_price : size === "L" ? product.L_price : product.S_price) : 0)}</p>
        <p className="mt-2 text-sm">
          {size === "Kids" ? (
            <>Availability: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock > 0 ? "Available" : "Not available"}</span></>
          ) : (
            <>In stock: <span className={stock > 0 ? "text-green-600" : "text-destructive"}>{stock}</span></>
          )}
        </p>

        <div className="mt-6">
          <label className="text-xs text-muted-foreground">Size</label>
          <div className="mt-2 flex flex-wrap gap-2">
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
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            className={index < review.rating ? "text-yellow-500" : "text-muted-foreground"}
                            fill={index < review.rating ? "currentColor" : "none"}
                          />
                        ))}
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