// Serverless function (deploys automatically on Vercel as
// /api/create-checkout-session). This is the ONLY place the Stripe SECRET
// key is used — it must live in an environment variable on your hosting
// provider (never in frontend code, never committed to git).
//
// Prices are looked up server-side from PRODUCTS, not trusted from the
// client, so a request can't be tampered with to change what gets charged.

import Stripe from "stripe";
import { PRODUCTS } from "../src/data/products.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items in cart" });
    }

    const line_items = items.map(({ id, qty }) => {
      const product = PRODUCTS.find((p) => p.id === id && p.available);
      if (!product) throw new Error(`Unknown or unavailable product: ${id}`);
      const quantity = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));

      return {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100), // cents, from server-side data only
          product_data: {
            name: product.name,
            description: product.size,
            metadata: { sku: product.sku },
          },
        },
      };
    });

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Standard shipping (1–2 business days)",
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err.message);
    return res.status(500).json({ error: "Could not create checkout session" });
  }
}
