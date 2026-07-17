import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ArrowRight, Package, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { money } from "../data/products";

export default function CartDrawer() {
  const { items, subtotal, cartOpen, setCartOpen, changeQty, removeItem } = useCart();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div
        className="absolute inset-0 bg-pine-ink/35"
        onClick={() => setCartOpen(false)}
      />
      <div className="relative w-full max-w-sm h-full flex flex-col p-6 bg-canvas animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-pine">Your cart</h2>
          <button onClick={() => setCartOpen(false)} className="rounded p-1 text-pine" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-steel">
            <Package size={32} />
            <p className="mt-3 text-sm">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink truncate">{i.name}</p>
                  <p className="font-mono text-xs text-steel">{money(i.price)} each</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => changeQty(i.id, -1)}
                    className="rounded-full p-1 bg-canvas-soft"
                    aria-label={`Decrease quantity of ${i.name}`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono text-sm w-4 text-center">{i.qty}</span>
                  <button
                    onClick={() => changeQty(i.id, 1)}
                    className="rounded-full p-1 bg-canvas-soft"
                    aria-label={`Increase quantity of ${i.name}`}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => removeItem(i.id)}
                    className="rounded-full p-1 text-steel hover:text-signal-dark"
                    aria-label={`Remove ${i.name} from cart`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-6 pt-6 border-t border-line">
            <div className="flex items-center justify-between text-sm font-bold mb-4">
              <span>Subtotal</span>
              <span className="font-mono">{money(subtotal)}</span>
            </div>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate("/checkout");
              }}
              className="btn-primary w-full"
            >
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
