"use client";

import { useCallback, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../providers/cart-provider";
import { useWishlist } from "../providers/wishlist-provider";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [sortBy, setSortBy] = useState<string>("default");
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Fetch categories
  useEffect(() => {
    setIsCategoriesLoading(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setIsCategoriesLoading(false));
  }, []);

  // Fetch products by category
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setIsLoading(false));
    } else {
      setProducts(initialProducts);
    }
  }, [selectedCategory, initialProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products;

    // Apply search filter
    if (searchTerm) {
      filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "name":
        return [...filteredProducts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      default:
        return filteredProducts;
    }
  }, [products, searchTerm, sortBy]);

  const toggleWishlist = useCallback(
    (e: React.MouseEvent, product: Product) => {
      e.preventDefault();
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  const limitWords = (text: string, limit: number) => {
    const words = text.split(" ");
    return (
      words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "")
    );
  };

  const handleAddToCart = useCallback(
    (e: React.MouseEvent, product: Product) => {
      e.preventDefault();
      setAddingToCart(product.id);
      setTimeout(() => {
        addToCart(product);
        setAddingToCart(null);
      }, 0);
    },
    [addToCart]
  );

  return (
    <div className="max-w-7xl container mx-auto px-4 py-8">
      {/* Search and Sort Bar */}
      <div className="max-w-2xl mx-auto mb-8 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product, index) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative"
              >
                <button
                  onClick={(e) => toggleWishlist(e, product)}
                  className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className={`w-5 h-5 ${
                      isInWishlist(product.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
                <div className="aspect-w-2 aspect-h-3 bg-gray-50 relative group">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                      priority={index < 3}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
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
                <div className="p-2 space-y-1">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {product.category}
                  </p>
                  <h3 className="text-xs text-gray-700 dark:text-gray-300">
                    {limitWords(product.title, 5)}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={addingToCart === product.id}
                      className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {addingToCart === product.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        "Add to Bag"
                      )}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Sidebar */}
        <div className="w-64 flex-shrink-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Categories :
          </h2>
          <div className="space-y-2">
            {isCategoriesLoading ? (
              <div className="py-4">
                <Loading />
              </div>
            ) : (
              <>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    selectedCategory === null
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      selectedCategory === category
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
}
