"use client";

import { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity?: number;
    selectedSize?: string;
    selectedColor?: string;
  }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: {
      id: number;
      title: string;
      price: number;
      image: string;
      quantity?: number;
      selectedSize?: string;
      selectedColor?: string;
    }) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );
        if (existingItem) {
          setTimeout(() => {
            toast.success(`Added another ${product.title} to cart`);
          }, 0);
          return currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        setTimeout(() => {
          toast.success(`${product.title} added to cart`);
        }, 0);
        return [
          ...currentItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: product.quantity || 1,
            selectedSize: product.selectedSize,
            selectedColor: product.selectedColor,
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      const item = items.find((item) => item.id === productId);
      if (item) {
        setTimeout(() => {
          toast.success(`${item.title} removed from cart`);
        }, 0);
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== productId)
        );
      }
    },
    [items]
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity < 1) return;
      const item = items.find((item) => item.id === productId);
      if (item) {
        setTimeout(() => {
          toast.success(`Updated ${item.title} quantity to ${quantity}`);
        }, 0);
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    },
    [items]
  );

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
