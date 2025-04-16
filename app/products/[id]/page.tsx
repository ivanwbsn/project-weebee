import ProductDetail from "@/app/components/product-detail";
import { Metadata } from "next";
import { Suspense } from "react";

// Definisikan interface Product dengan lebih lengkap
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Perbaiki interface PageProps sesuai dengan Next.js 15
type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      { next: { revalidate: 3600 } } // Add revalidation
    );
    if (!response.ok) {
      throw new Error("Failed to fetch from primary API");
    }
    const data = await response.json();

    if (!data || !data.id || !data.title) {
      throw new Error("Invalid product data structure");
    }

    return data as Product; // Type assertion untuk memastikan return type sesuai
  } catch (primaryError) {
    try {
      const backupResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKUP_API_URL}/products/${id}`,
        { next: { revalidate: 3600 } }
      );
      if (!backupResponse.ok) {
        throw new Error("Failed to fetch from backup API");
      }
      const backupData = await backupResponse.json();

      if (!backupData || !backupData.id || !backupData.title) {
        throw new Error("Invalid product data structure from backup API");
      }

      return backupData as Product;
    } catch (backupError) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Error fetching product:", {
          primaryError,
          backupError,
        });
      }
      throw new Error(
        "Failed to fetch product from both primary and backup APIs"
      );
    }
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);
    return {
      title: product.title,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product Details",
      description: "Product details page",
    };
  }
}

function ErrorDisplay() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <svg
          className="w-16 h-16 mx-auto text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Unable to Load Product
        </h2>
        <p className="text-gray-600 mb-6">
          We're having trouble fetching the product details. This might be due
          to:
        </p>
        <ul className="text-left text-gray-600 mb-6 space-y-2">
          <li>• Temporary network issues</li>
          <li>• The product may no longer be available</li>
          <li>• Server maintenance</li>
        </ul>
        <a
          href="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Browse Other Products
        </a>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail product={product} />
      </Suspense>
    );
  } catch (error) {
    return <ErrorDisplay />;
  }
}
