"use client";

import { useCart } from "../providers/cart-provider";
import Image from "next/image";
import Link from "next/link";
import { cleanUrl } from "../utils/url";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart ({totalItems} items)
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 pb-6 border-b dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={cleanUrl(item.image)}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 truncate"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-lg font-medium text-purple-600">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border dark:border-gray-600 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="w-12 text-center text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="text-gray-900 dark:text-white">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Shipping</p>
                  <p className="text-gray-900 dark:text-white">Free</p>
                </div>
                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Total
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
