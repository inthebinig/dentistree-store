import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Package, Plus, Minus, ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";
import { PRODUCTS, money } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/shop" replace />;

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.available
  ).slice(0, 3);

  return (
    <main className="section py-10">
      <Seo title={product.name} description={product.desc} />

      <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-bold text-pine mb-6">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-xl2 bg-canvas-soft h-72 md:h-96 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-steel">
              <Package size={32} />
              <span className="text-sm">Photo coming soon</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-mono text-steel">{product.sku}</p>
          <h1 className="font-display text-3xl font-semibold text-pine-ink mt-1">{product.name}</h1>
          <p className="text-sm font-bold text-signal-dark mt-2">{product.size}</p>
          <p className="text-base text-steel mt-4 max-w-md">{product.desc}</p>

          <p className="font-mono text-3xl font-bold text-ink mt-6">{money(product.price)}</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-3 rounded-full border border-line px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="text-pine"
              >
                <Minus size={16} />
              </button>
              <span className="font-mono w-6 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="text-pine"
              >
                <Plus size={16} />
              </button>
            </div>
            <button onClick={() => addToCart(product.id, qty)} className="btn-accent">
              <Plus size={16} /> Add to cart
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-xl font-semibold text-pine-ink mb-5">
            Related in {product.category}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="card overflow-hidden block">
                <div className="h-28 bg-canvas-soft" />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-pine text-sm">{p.name}</h3>
                  <p className="font-mono text-sm text-ink mt-1">{money(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
