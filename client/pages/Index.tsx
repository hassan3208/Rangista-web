import { useEffect, useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard";
import FilterBar, { Filters } from "@/components/FilterBar";
import Testimonials from "@/components/Testimonials";
import { getMinimumPrice, getProducts } from "@/data/catalog";
import { useSearchParams } from "react-router-dom";

const heroImages = [
  "https://i.postimg.cc/9Q36JwXv/Screenshot-2025-10-02-105818.png",
  "https://i.postimg.cc/VNsmW04j/Screenshot-2024-06-02-065610.png",
  "https://i.postimg.cc/9Q36JwXv/Screenshot-2025-10-02-105818.png",
  "https://i.postimg.cc/VNsmW04j/Screenshot-2024-06-02-065610.png",
];

export default function Index() {
  // Hero carousel state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Filters
  const [filters, setFilters] = useState<Filters>({
    collection: "all",
    size: "all",
    maxPrice: 20000,
  });

  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").toLowerCase();

  const products = getProducts();
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q && !(`${p.name} ${p.collection}`.toLowerCase().includes(q))) return false;
      if (filters.collection && filters.collection !== "all" && p.collection !== filters.collection) return false;
      if (filters.size && filters.size !== "all" && !p.sizes.includes(filters.size)) return false;
      const minPrice = getMinimumPrice(p);
      if (filters.maxPrice && minPrice > filters.maxPrice) return false;
      return true;
    });
  }, [filters, q, products]);

  const eid = products.filter((p) => p.collection === "Eid Collection").slice(0, 3);
  const azadi = products.filter((p) => p.collection === "14 August Independence Collection").slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-accent font-hand text-xl">Rangista</p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl leading-tight">
              Hand-Painted Clothes for Women & Children
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Rangista brings you artsy and traditional fashion inspired by culture and crafted with love.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#shop" className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-5 py-3">
                Shop now
              </a>
              <a href="/about" className="inline-flex items-center rounded-md border px-5 py-3">
                Learn more
              </a>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/3]">
            {heroImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Hero ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentHeroIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Products */}
      <section className="container py-10">
        <FilterBar filters={filters} onChange={setFilters} />
        <div id="shop" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={getMinimumPrice(p)}
              image={p.image}
              sizes={p.sizes}
              rating={p.rating}
              reviews={p.reviews}
              collection={p.collection as "14 August Independence Collection" | "Eid Collection" | "Bakra Eid Specials" | "Birthday Specials"}
              priceBySize={p.priceBySize}
            />
          ))}
        </div>
      </section>

      {/* Featured Eid Collection */}
      <section className="container py-16">
        <h2 className="font-serif text-3xl">Featured Eid Collection</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eid.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={getMinimumPrice(p)}
              image={p.image}
              sizes={p.sizes}
              rating={p.rating}
              reviews={p.reviews}
              collection={p.collection as "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials"}
              priceBySize={p.priceBySize}
            />
          ))}
        </div>
      </section>

      {/* 14 August Specials */}
      <section className="container py-16">
        <h2 className="font-serif text-3xl">14 August Specials</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {azadi.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={getMinimumPrice(p)}
              image={p.image}
              sizes={p.sizes}
              rating={p.rating}
              reviews={p.reviews}
              collection={p.collection as "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials"}
              priceBySize={p.priceBySize}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </main>
  );
}
