"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { useWishlist } from "../providers/wishlist-provider";
import { useCart } from "../providers/cart-provider";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {wishlist.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven&apos;t added anything to your wishlist yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            My Wishlist ({wishlist.length} items)
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 space-y-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-6 pb-6 border-b dark:border-gray-700 last:border-0 last:pb-0"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover rounded"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 truncate"
                    >
                      {product.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-medium text-purple-600">
                        €{product.price.toLocaleString()}
                      </span>
                      {product.price < 100 && (
                        <span className="text-gray-400 dark:text-gray-500 line-through">
                          €100.00
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      In Stock
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={async () => {
                          setAddingToCart(product.id);
                          addToCart(product);
                          setAddingToCart(null);
                        }}
                        disabled={addingToCart === product.id}
                        className={`bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors ${
                          addingToCart === product.id
                            ? "opacity-75 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {addingToCart === product.id
                          ? "Adding..."
                          : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
