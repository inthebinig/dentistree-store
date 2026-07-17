# DentisTree

Endodontic & dental supply storefront. React 18 + Vite + Tailwind + React
Router, with Stripe Checkout for payments.

## What changed from the old version

- Real Tailwind build (config + PostCSS) instead of the CDN `<script>` tag —
  smaller, faster, production-safe
- Multi-page routing: `/`, `/shop`, `/product/:id`, `/checkout`,
  `/checkout/success`, `/checkout/cancel`
- Cart moved into a proper context (`src/context/CartContext.jsx`), persisted
  to `localStorage` so it survives a refresh
- Code split into `components/`, `pages/`, `data/` instead of one 560-line file
- Real Stripe Checkout integration (see below) — the old "demo, no real
  payment processed" form is gone
- Basic SEO: per-page titles/descriptions, Open Graph tags, `robots.txt`,
  `sitemap.xml`
- Accessibility: focus rings, `aria-label`s on icon buttons, keyboard-
  reachable nav, `role="tablist"` on category switcher

## Local development

```bash
npm install
cp .env.example .env   # then fill in your Stripe test keys
npm run dev
```

The `/api` folder only runs on Vercel (locally or deployed). If you want to
test checkout locally, install the Vercel CLI and run `vercel dev` instead of
`npm run dev` — it serves both the Vite app and the `/api` function together.

## Setting up Stripe (required for real checkout to work)

1. Create a free Stripe account at https://dashboard.stripe.com
2. Grab your **test** keys from Developers → API keys:
   - Publishable key (`pk_test_...`) → put in `.env` as
     `VITE_STRIPE_PUBLISHABLE_KEY`
   - Secret key (`sk_test_...`) → put in `.env` as `STRIPE_SECRET_KEY`
     (**never** commit this or put it in frontend code)
3. Test the flow using Stripe's test card `4242 4242 4242 4242`, any future
   expiry, any CVC.
4. When you're ready to take real payments, switch to your **live** keys in
   your hosting provider's environment variables and complete Stripe's
   account activation (business details, bank account).

Prices charged are always looked up server-side from
`src/data/products.js` inside `/api/create-checkout-session.js` — the
frontend cart amounts are for display only, so nothing can be tampered with
in the browser to change what gets charged.

## Deploying

This is set up to deploy to **Vercel** with zero extra config: it auto-detects
Vite for the frontend and turns `/api/*.js` files into serverless functions.

1. Push this repo to GitHub
2. Import it in Vercel
3. Add `VITE_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` under Project
   Settings → Environment Variables
4. Deploy

If you'd rather use a different host, you'll need something that supports
serverless/edge functions (Netlify Functions, Cloudflare Pages Functions,
etc.) — the frontend is a static build (`npm run build` → `dist/`), and
`api/create-checkout-session.js` just needs to be adapted to that platform's
function format.

## Growing the catalog

Edit `src/data/products.js`. Each product needs `id`, `category` (must match
one in `CATEGORIES`), `price`, `sku`, `desc`, and `available: true`. Add
`image: "/products/your-photo.jpg"` once you have a real photo (drop the
file in `public/products/`). A category tab only appears once it has at
least one available product — so it's safe to plan out future categories
ahead of time.

Once the catalog is closer to final, it's worth generating `sitemap.xml`
from this file automatically (a small build script) rather than editing it
by hand.
