import ProductList from "./components/product-list";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

async function getProducts() {
  try {
    console.log("Fetching products...");
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status, res.statusText);
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid response format:", data);
      throw new Error("Invalid response format: expected an array");
    }

    console.log(`Successfully fetched ${data.length} products`);
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
}

export default async function Home() {
  try {
    const products = await getProducts();

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <ProductList initialProducts={products} />
      </div>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
}
