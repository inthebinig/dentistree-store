import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function CheckoutCancel() {
  return (
    <main className="section py-20 max-w-lg text-center">
      <Seo title="Checkout canceled" />
      <h1 className="font-display text-2xl font-semibold text-pine-ink">Checkout canceled</h1>
      <p className="mt-2 text-sm text-steel">
        No payment was taken. Your cart is still saved if you'd like to try again.
      </p>
      <Link to="/checkout" className="btn-primary inline-flex mt-8">
        Return to checkout
      </Link>
    </main>
  );
}
