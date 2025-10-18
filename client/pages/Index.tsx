import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FilterBar, { Filters } from "@/components/FilterBar";
import Testimonials from "@/components/Testimonials";
import { getProducts } from "@/data/catalog";
import { useSearchParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Add custom CSS for carousel with mirror-like arrow buttons
const carouselStyles = `
  .carousel-container {
    position: relative;
    width: 100%;
    padding: 0 2.5rem; /* Space for arrows */
  }
  .carousel-content {
    margin: 0 -0.5rem; /* Adjust for item padding */
  }
  .carousel-prev,
  .carousel-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5);
    color: #fff;
    transition: all 0.3s ease;
  }
  .carousel-prev:hover,
  .carousel-next:hover {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.7);
  }
  .carousel-prev {
    left: 0;
  }
  .carousel-next {
    right: 0;
  }
  @media (max-width: 640px) {
    .carousel-container {
      padding: 0 1.5rem;
    }
    .carousel-prev,
    .carousel-next {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const heroImages = [
  "https://i.postimg.cc/9Q36JwXv/Screenshot-2025-10-02-105818.png",
  "https://i.postimg.cc/VNsmW04j/Screenshot-2024-06-02-065610.png",
  "https://i.postimg.cc/9Q36JwXv/Screenshot-2025-10-02-105818.png",
  "https://i.postimg.cc/VNsmW04j/Screenshot-2024-06-02-065610.png",
];

export default function Index() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [filters, setFilters] = useState<Filters>({
    collection: "all",
    size: "all",
    kids: false,
  });

  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").toLowerCase();

  const products = getProducts();
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q && !(`${p.name} ${p.collection}`.toLowerCase().includes(q))) return false;
      if (filters.collection && filters.collection !== "all" && p.collection !== filters.collection) return false;
      if (filters.size && filters.size !== "all") {
        const stockKey = `${filters.size}_stock` as keyof typeof p;
        const raw = p[stockKey];
        let stock = 0;
        if (typeof raw === "number") {
          stock = raw;
        } else if (typeof raw === "string") {
          stock = parseInt(raw, 10) || 0;
        } else if (typeof raw === "boolean") {
          stock = raw ? 1 : 0;
        } else {
          stock = 0;
        }
        if (stock <= 0) return false;
      }
      if (filters.kids && !p.kids) return false;
      return true;
    });
  }, [filters, q, products]);

  const eid = filtered.filter((p) => p.collection === "Eid Collection");
  const azadi = filtered.filter((p) => p.collection === "14 August Independence Collection");

  return (
    <main>
      {/* Inline styles for carousel */}
      <style>{carouselStyles}</style>

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

      <section className="container py-10">
        <FilterBar filters={filters} onChange={setFilters} />
        <div id="shop" className="mt-6 carousel-container">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent className="carousel-content">
              {filtered.map((p) => (
                <CarouselItem key={p.id} className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3">
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    image={p.image}
                    collection={p.collection as "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials"}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-prev" />
            <CarouselNext className="carousel-next" />
          </Carousel>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="font-serif text-3xl">Featured Eid Collection</h2>
        <div className="mt-6 carousel-container">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent className="carousel-content">
              {eid.map((p) => (
                <CarouselItem key={p.id} className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3">
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    image={p.image}
                    collection={p.collection as "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials"}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-prev" />
            <CarouselNext className="carousel-next" />
          </Carousel>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="font-serif text-3xl">14 August Specials</h2>
        <div className="mt-6 carousel-container">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent className="carousel-content">
              {azadi.map((p) => (
                <CarouselItem key={p.id} className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3">
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    image={p.image}
                    collection={p.collection as "Eid Collection" | "Bakra Eid Specials" | "14 August Independence Collection" | "Birthday Specials"}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-prev" />
            <CarouselNext className="carousel-next" />
          </Carousel>
        </div>
      </section>

      <Testimonials />
    </main>
  );
}