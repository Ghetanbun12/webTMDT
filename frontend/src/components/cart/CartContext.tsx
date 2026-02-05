import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

/* =====================
   TYPES
===================== */

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

/* =====================
   CONTEXT
===================== */

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/* =====================
   PROVIDER
===================== */

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =====================
   CUSTOM HOOK
===================== */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
