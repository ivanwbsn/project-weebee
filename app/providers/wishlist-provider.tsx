"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import toast from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.email}`);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated, user]);

  const addToWishlist = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    const newWishlist = [...wishlist, product];
    localStorage.setItem(
      `wishlist_${user?.email}`,
      JSON.stringify(newWishlist)
    );
    setWishlist(newWishlist);
    toast.success(`${product.title} added to wishlist`);
  };

  const removeFromWishlist = (productId: number) => {
    if (!isAuthenticated) {
      toast.error("Please login to manage wishlist");
      return;
    }
    const product = wishlist.find((item) => item.id === productId);
    const newWishlist = wishlist.filter((item) => item.id !== productId);
    localStorage.setItem(
      `wishlist_${user?.email}`,
      JSON.stringify(newWishlist)
    );
    setWishlist(newWishlist);
    if (product) {
      toast.success(`${product.title} removed from wishlist`);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
