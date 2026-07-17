import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "dentistree.cart.v1";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage unavailable (private browsing, etc.) — cart just won't persist
    }
  }, [cart]);

  const addToCart = (id, qty = 1) => {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + qty) }));
    setCartOpen(true);
  };

  const changeQty = (id, delta) =>
    setCart((c) => {
      const next = Math.max(0, (c[id] || 0) + delta);
      return { ...c, [id]: next };
    });

  const removeItem = (id) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const clearCart = () => setCart({});

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }))
        .filter((i) => i.qty > 0 && i.id),
    [cart]
  );

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  const value = {
    items,
    subtotal,
    itemCount,
    addToCart,
    changeQty,
    removeItem,
    clearCart,
    cartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
