import React from "react";
import { Link } from "react-router-dom";
import { Package, Plus } from "lucide-react";
import { money } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-36 flex items-center justify-center bg-canvas-soft">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-steel">
              <Package size={22} />
              <span className="text-xs">Photo coming soon</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-3">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-display text-lg font-semibold text-pine hover:underline">
                {product.name}
              </h3>
            </Link>
            <span className="font-mono text-xs text-steel shrink-0">{product.sku}</span>
          </div>
          <p className="text-xs font-bold mt-1 text-signal-dark">{product.size}</p>
          <p className="text-sm mt-2 text-steel line-clamp-2">{product.desc}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-lg font-bold text-ink">{money(product.price)}</span>
          <button
            onClick={() => addToCart(product.id)}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold bg-signal text-white hover:bg-signal-dark transition-colors"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
