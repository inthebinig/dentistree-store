import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Clock } from "lucide-react";
import Seo from "../components/Seo";
import RootMark from "../components/RootMark";
import { PRODUCTS, CATEGORIES, money } from "../data/products";

const TRUST = [
  { icon: Truck, label: "Ships within 1–2 business days" },
  { icon: ShieldCheck, label: "Sterile, single-use where applicable" },
  { icon: Clock, label: "Restocked weekly, no backorders" },
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.available).slice(0, 3);
  const populatedCategories = CATEGORIES.filter((c) =>
    PRODUCTS.some((p) => p.category === c && p.available)
  );

  return (
    <main>
      <Seo
        title="Endodontic & Dental Supply"
        description="DentisTree supplies dental files, canal lubricants, and endodontic instruments your practice can rely on — stocked and shipped fast."
      />

      {/* Hero */}
      <section className="section pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow mb-3">Endodontic supply, rooted in quality</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-pine-ink">
            Every canal starts with the right instrument.
          </h1>
          <p className="mt-4 text-base text-steel max-w-md">
            DentisTree supplies dental files and canal lubricants your practice can rely
            on, stocked and shipped fast.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              Shop the catalog <ArrowRight size={16} />
            </Link>
            <a href="#why" className="btn-ghost">
              Why DentisTree
            </a>
          </div>
        </div>
        <div className="rounded-xl2 bg-canvas-soft p-8 flex items-center justify-center h-56 md:h-64">
          <div className="w-52 h-40">
            <RootMark />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="section pb-14">
        <div className="grid sm:grid-cols-3 gap-4">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
              <Icon size={18} className="text-pine shrink-0" />
              <span className="text-sm font-semibold text-ink">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="section py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="eyebrow mb-2">In stock now</p>
              <h2 className="font-display text-2xl font-semibold text-pine-ink">Featured instruments</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-bold text-pine hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {featured.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="card overflow-hidden block">
                <div className="h-32 bg-canvas-soft" />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-pine">{p.name}</h3>
                  <p className="font-mono text-sm text-ink mt-1">{money(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Why DentisTree */}
      <section id="why" className="section py-16 border-t border-line scroll-mt-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10">
          <div>
            <p className="eyebrow mb-2">Why DentisTree</p>
            <h2 className="font-display text-2xl font-semibold text-pine-ink">
              Built for practices that can't afford a supply gap.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display font-semibold text-pine mb-1">Curated, not everything</h3>
              <p className="text-sm text-steel">
                We carry the instruments practices actually reach for — not a catalog padded
                with filler.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-pine mb-1">Real stock, real numbers</h3>
              <p className="text-sm text-steel">
                What's shown as available is what's on the shelf. No orders placed against
                items we don't have.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-pine mb-1">Fast, predictable shipping</h3>
              <p className="text-sm text-steel">
                Orders placed before 2pm ship the same day from our fulfillment partner.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-pine mb-1">A team that knows the tools</h3>
              <p className="text-sm text-steel">
                Questions about taper, sizing, or compatibility get answered by people who
                understand the workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {populatedCategories.length > 0 && (
        <section className="section pb-16">
          <p className="eyebrow mb-4">Browse by category</p>
          <div className="flex flex-wrap gap-2">
            {populatedCategories.map((c) => (
              <Link
                key={c}
                to={`/shop?category=${encodeURIComponent(c)}`}
                className="px-4 py-2 rounded-full text-sm font-bold bg-canvas-soft text-pine hover:bg-line transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
