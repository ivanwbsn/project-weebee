"use client";

import { useState } from "react";
import { useCart } from "@/app/providers/cart-provider";
import Image from "next/image";
import Link from "next/link";

const limitWords = (text: string, limit: number) => {
  const words = text.split(" ");
  return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity?: number;
  selectedSize?: string;
  selectedColor?: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("black");
  const [activeTab, setActiveTab] = useState("details");
  const { addToCart } = useCart();

  const images = [product.image, product.image, product.image, product.image]; // In real app, would use multiple product images
  const sizes = ["S", "M", "L"];
  const colors = ["black", "gray"];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:gap-8">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="relative w-full h-[600px]">
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <Image
                src={images[currentImage]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain rounded-lg"
                priority={true}
                quality={90}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x600/png?text=Product+Image";
                }}
              />
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative aspect-square w-24 rounded-lg overflow-hidden ${
                    currentImage === idx ? "ring-2 ring-black" : ""
                  }`}
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={img}
                      alt={`Product ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-contain"
                      quality={75}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/96x96/png?text=Thumbnail";
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {limitWords(product.title, 5)}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4 ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-500 ml-2">(4.9)</span>
            </div>

            <p className="text-3xl font-bold mt-4">${product.price}</p>

            {/* Size Selection */}
            <div className="mt-8">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Available Size
                </h3>
              </div>
              <div className="flex gap-4 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
                      selectedSize === size
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-gray-900"
                        : "border-gray-200 dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Available Color
              </h3>
              <div className="flex gap-4 mt-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ${
                      color === "black" ? "bg-black" : "bg-gray-400"
                    } ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Last 1 Left */}
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Last 1 left - make it yours!
            </p>

            {/* Quantity and Add to Cart */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                Add to cart
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-8 mt-8">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`text-sm font-medium ${
                    activeTab === "details"
                      ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  The Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`text-sm font-medium ${
                    activeTab === "reviews"
                      ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Ratings & Reviews
                  <span className="ml-2 text-gray-400">32</span>
                </button>
                <button
                  onClick={() => setActiveTab("discussion")}
                  className={`text-sm font-medium ${
                    activeTab === "discussion"
                      ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Discussion
                  <span className="ml-2 text-gray-400">5</span>
                </button>
              </div>
              <div className="mt-8">
                {activeTab === "details" && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium dark:text-white">
                            Kathryn Murphy
                          </h4>
                          <span className="text-sm text-gray-500">
                            1 weeks ago
                          </span>
                        </div>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                          The fit is perfect, and the quality is top-notch.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            Like · 7 likes
                          </button>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            Reply · 3 replies
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "discussion" && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Join the discussion...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
