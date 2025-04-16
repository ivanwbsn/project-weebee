"use client";

import { useCart } from "../providers/cart-provider";
import { cleanUrl } from "../utils/url";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
      >
        <svg
          className="w-6 h-6 text-gray-700 dark:text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Shopping Cart
            </h3>
            {items.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-4 border-b dark:border-gray-700"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={cleanUrl(item.image)}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ${item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            -
                          </button>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <Link
                    href="/cart"
                    className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors inline-block text-center"
                  >
                    View Cart & Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
