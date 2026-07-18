import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CATEGORIES } from "../data/categories";

function slugify(s) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Dropdown({ label, isOpen, onEnter, onLeave, onClick, children, width = "w-56" }) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        onClick={onClick}
        className="flex items-center gap-1 py-1 text-sm font-semibold text-steel hover:text-pine transition-colors"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 ${width} bg-canvas border border-line rounded-lg shadow-lg py-2 z-30 max-h-[70vh] overflow-y-auto`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { itemCount, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(CATEGORIES[0].title);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const closeTimer = useRef(null);

  const openNow = (key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setSearchOpen(false);
    }
  };

  const activeCat = CATEGORIES.find((c) => c.title === hoveredCategory);

  return (
    <header className="sticky top-0 z-20 bg-canvas/95 backdrop-blur border-b border-line">
      <div className="section flex items-center justify-between py-4 gap-4">
        <NavLink to="/" className="flex items-center gap-2 rounded-lg shrink-0" onClick={() => setMenuOpen(false)}>
          <img src="/logo-header.svg" alt="DentisTree Supplies" className="h-16 w-auto" />
        </NavLink>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className="text-sm font-semibold text-steel hover:text-pine transition-colors">
            Home
          </NavLink>

          <Dropdown
            label="Shop"
            isOpen={openMenu === "shop"}
            onEnter={() => openNow("shop")}
            onLeave={closeSoon}
            width="w-[680px]"
          >
            <div className="flex">
              <div className="w-64 border-r border-line py-1 max-h-[70vh] overflow-y-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.title}
                    onMouseEnter={() => setHoveredCategory(cat.title)}
                    onClick={() => { navigate(`/shop?category=${slugify(cat.title)}`); setOpenMenu(null); }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left ${
                      hoveredCategory === cat.title ? "bg-line/40 text-pine" : "text-steel"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.title}
                  </button>
                ))}
              </div>
              <div className="flex-1 py-2 px-4 max-h-[70vh] overflow-y-auto">
                {activeCat?.groups.map((g) => (
                  <div key={g.name} className="mb-3">
                    <button
                      onClick={() => {
                        navigate(`/shop?category=${slugify(activeCat.title)}&group=${slugify(g.name)}`);
                        setOpenMenu(null);
                      }}
                      className="text-sm font-semibold text-pine mb-1 text-left"
                    >
                      {g.name}
                    </button>
                    <div className="grid grid-cols-2 gap-x-3">
                      {g.items.slice(0, 6).map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            navigate(`/shop?category=${slugify(activeCat.title)}&group=${slugify(g.name)}&item=${slugify(item)}`);
                            setOpenMenu(null);
                          }}
                          className="text-left text-xs text-steel hover:text-pine py-0.5 truncate"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Dropdown>

          <NavLink to="/brands" className="text-sm font-semibold text-steel hover:text-pine transition-colors">
            Brands
          </NavLink>

          <NavLink to="/about" className="text-sm font-semibold text-steel hover:text-pine transition-colors">
            About
          </NavLink>

          <NavLink to="/contact" className="text-sm font-semibold text-steel hover:text-pine transition-colors">
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={() => !searchTerm && setSearchOpen(false)}
                  placeholder="Search products..."
                  className="w-48 px-3 py-2 text-sm border border-line rounded-full focus:outline-none focus:border-pine"
                />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-steel hover:text-pine transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          <Dropdown
            label=""
            isOpen={openMenu === "account"}
            onEnter={() => openNow("account")}
            onLeave={closeSoon}
            width="w-44"
          >
            <div className="p-2 -m-2">
              <User size={20} className="text-steel" />
            </div>
            <NavLink to="/login" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-steel hover:text-pine">
              Login
            </NavLink>
            <NavLink to="/register" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-steel hover:text-pine">
              Register
            </NavLink>
          </Dropdown>

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

      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-canvas max-h-[75vh] overflow-y-auto">
          <div className="section flex flex-col py-2">
            <NavLink to="/" end onClick={() => setMenuOpen(false)} className="py-3 text-base font-semibold border-b border-line/60 text-steel">
              Home
            </NavLink>
            <NavLink to="/shop" onClick={() => setMenuOpen(false)} className="py-3 text-base font-semibold border-b border-line/60 text-steel">
              Shop
            </NavLink>
            <NavLink to="/brands" onClick={() => setMenuOpen(false)} className="py-3 text-base font-semibold border-b border-line/60 text-steel">
              Brands
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="py-3 text-base font-semibold border-b border-line/60 text-steel">
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="py-3 text-base font-semibold border-b border-line/60 text-steel">
              Contact
            </NavLink>
            <NavLink to="/login" onClick={() => setMenuOpen(false)} className="py-3 text-base font-semibold border-b border-line/60 text-steel">
              Account
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
