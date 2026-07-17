import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";
import Seo from "../components/Seo";
import { useCart } from "../context/CartContext";
import { money } from "../data/products";

// Publishable key is safe to expose in frontend code — it can only create
// checkout sessions, never move money on its own. Set it in your .env file
// as VITE_STRIPE_PUBLISHABLE_KEY. The SECRET key must only ever live on the
// server (see /api/create-checkout-session.js) and must never be committed
// or shipped to the browser.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (items.length === 0) return <Navigate to="/shop" replace />;

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
        }),
      });

      if (!res.ok) throw new Error("Could not start checkout. Please try again.");
      const { sessionId, url } = await res.json();

      // Prefer a direct redirect URL if the backend returns one; otherwise
      // fall back to Stripe.js's redirectToCheckout using the session id.
      if (url) {
        window.location.href = url;
        return;
      }
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) throw stripeError;
    } catch (err) {
      setError(err.message || "Something went wrong starting checkout.");
      setLoading(false);
    }
  };

  return (
    <main className="section py-10 max-w-lg">
      <Seo title="Checkout" />

      <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-bold text-pine mb-6">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <h1 className="font-display text-2xl font-semibold text-pine-ink mb-1">Review your order</h1>
      <p className="text-sm text-steel mb-6">
        You'll enter shipping and payment details on Stripe's secure checkout page next.
      </p>

      <div className="rounded-xl2 border border-line bg-white divide-y divide-line">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-bold text-ink">{i.name}</p>
              <p className="text-xs text-steel">Qty {i.qty}</p>
            </div>
            <p className="font-mono text-sm font-bold">{money(i.price * i.qty)}</p>
          </div>
        ))}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="font-bold">Subtotal</p>
          <p className="font-mono font-bold text-lg">{money(subtotal)}</p>
        </div>
      </div>
      <p className="text-xs text-steel mt-2">Shipping and tax are calculated at checkout.</p>

      {error && (
        <div className="mt-4 rounded-xl bg-signal-light text-signal-dark text-sm px-4 py-3">{error}</div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="btn-primary w-full mt-6 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Redirecting…
          </>
        ) : (
          <>
            <Lock size={16} /> Continue to secure payment
          </>
        )}
      </button>
      <p className="text-xs text-steel text-center mt-3">Payments processed securely by Stripe.</p>
    </main>
  );
}
