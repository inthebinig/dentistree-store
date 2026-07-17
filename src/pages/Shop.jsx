import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const visibleCategories = useMemo(
    () => CATEGORIES.filter((c) => PRODUCTS.some((p) => p.category === c && p.available)),
    []
  );

  const activeCategory = searchParams.get("category") || visibleCategories[0] || CATEGORIES[0];

  const setCategory = (c) => setSearchParams({ category: c });

  const shown = PRODUCTS.filter((p) => p.category === activeCategory && p.available);

  return (
    <main>
      <Seo
        title="Shop"
        description="Browse DentisTree's in-stock endodontic files, lubricants, and dental instruments by category."
      />

      <section className="section pt-10 pb-4">
        <h1 className="font-display text-3xl font-semibold text-pine-ink">Shop</h1>
        <p className="text-sm text-steel mt-1">
          {shown.length} item{shown.length === 1 ? "" : "s"} in {activeCategory}
        </p>
      </section>

      <section className="section">
        <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Product categories">
          {visibleCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={activeCategory === c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeCategory === c ? "bg-pine text-white" : "bg-canvas-soft text-pine hover:bg-line"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="section py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 rounded-xl2 p-10 text-center text-sm bg-canvas-soft text-steel">
            No items stocked in this category yet — check back soon.
          </div>
        )}
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
