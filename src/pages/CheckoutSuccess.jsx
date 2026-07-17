import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import Seo from "../components/Seo";
import { useCart } from "../context/CartContext";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="section py-20 max-w-lg text-center">
      <Seo title="Order confirmed" />
      <div className="mx-auto mb-6 flex items-center justify-center rounded-full bg-line w-16 h-16">
        <Check size={28} className="text-pine" />
      </div>
      <h1 className="font-display text-2xl font-semibold text-pine-ink">Order placed</h1>
      <p className="mt-2 text-sm text-steel">
        Thanks for your order. A confirmation email is on its way.
        {sessionId && (
          <>
            {" "}
            Reference: <span className="font-mono font-bold">{sessionId.slice(-10)}</span>
          </>
        )}
      </p>
      <Link to="/shop" className="btn-primary inline-flex mt-8">
        Continue shopping
      </Link>
    </main>
  );
}
