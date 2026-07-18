import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
];

export default function Header() {
  const { itemCount, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-semibold transition-colors ${
      isActive ? "text-pine" : "text-steel hover:text-pine"
    }`;

  return (
    <header className="sticky top-0 z-20 bg-canvas/95 backdrop-blur border-b border-line">
      <div className="section flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-2 rounded-lg" onClick={() => setMenuOpen(false)}>
          <img src="/logo.jpeg" alt="DentisTree Supplies" className="h-24 w-auto" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-signal rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-pine text-white text-sm font-bold hover:bg-pine-ink transition-colors"
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-signal text-white text-xs font-bold w-[22px] h-[22px]">
                {itemCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-lg text-pine"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-canvas">
          <div className="section flex flex-col py-2">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base font-semibold border-b border-line/60 last:border-0 ${
                    isActive ? "text-pine" : "text-steel"
                  }`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}