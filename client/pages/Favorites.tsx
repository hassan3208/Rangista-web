import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { getProducts } from "@/data/catalog";

export default function Favorites() {
  const { favorites } = useFavorites();
  const catalog = getProducts();
  const favProducts = catalog.filter((p) => favorites.includes(p.id));

  return (
    <main className="container py-10">
      <h1 className="font-serif text-3xl">Your Favorites</h1>
      {favProducts.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No favorites yet. Tap the ♥ on a product to save it here.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              collection={p.collection as "✨ Bestsellers Edit" | "🌸 New Arrivals" | "❄ Winter Wonders" | "☀ Summer Bloom" | "💍 The Wedding Season" | "🌙 Eid Collection" | "🐐 Bakra Eid Edit" | "Azadi Collection" | "👩‍🍼 Mommy & Me" | "👗 Adults Collection" | "🎨 Handpainted Dupattas Collection"}
              total_reviews={p.total_reviews}
              average_rating={p.average_rating}
              XS_price={p.XS_price}
              S_price={p.S_price}
              M_price={p.M_price}
              L_price={p.L_price}
              XL_price={p.XL_price}
              XXL_price={p.XXL_price}
              XS_stock={p.XS_stock}
              S_stock={p.S_stock}
              M_stock={p.M_stock}
              L_stock={p.L_stock}
              XL_stock={p.XL_stock}
              XXL_stock={p.XXL_stock}
              kids={p.kids}
            />
          ))}
        </div>
      )}
    </main>
  );
}
