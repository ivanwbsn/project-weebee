import { render, screen } from "@testing-library/react";
import ProductDetailPage, { generateMetadata } from "./page";
import ProductDetail from "@/app/components/product-detail";

// Mock ProductDetail component
jest.mock("@/app/components/product-detail", () => {
  const ProductDetailMock = jest.fn((props) => (
    <div data-testid="mock-product-detail">
      Mock Product Detail: {props.product.title}
    </div>
  ));
  return ProductDetailMock;
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("ProductDetailPage", () => {
  // Create a test wrapper component that handles async components
  const renderWithProviders = async (ui: React.ReactNode) => {
    const Wrapper = () => <>{ui}</>;
    return render(<Wrapper />);
  };

  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "This is a test product description",
    image: "https://picsum.photos/200",
    category: "electronics",
  };

  beforeEach(() => {
    (ProductDetail as jest.Mock).mockClear();
  });

  it("renders product detail for valid product ID", async () => {
    // Mock successful fetch response
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      })
    ) as jest.Mock;

    const params = { id: "1" };
    const page = await ProductDetailPage({ params });
    await renderWithProviders(page);

    // Wait for the component to be rendered
    const productDetail = await screen.findByTestId("mock-product-detail");
    expect(productDetail).toBeInTheDocument();

    // Check if ProductDetail was called with correct props
    const mockCalls = (ProductDetail as jest.Mock).mock.calls;
    expect(mockCalls[0][0]).toEqual({ product: mockProduct });

    // Restore original fetch
    global.fetch = originalFetch;
  });

  it("renders error display for invalid product ID", async () => {
    // Mock fetch to fail for this test
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch"))
    ) as jest.Mock;

    const params = { id: "999" };
    const page = await ProductDetailPage({ params });
    await renderWithProviders(page);

    // Wait for error message to appear
    const errorMessage = await screen.findByText("Unable to Load Product");
    expect(errorMessage).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're having trouble fetching the product details. This might be due to:"
      )
    ).toBeInTheDocument();

    // Restore original fetch
    global.fetch = originalFetch;
  });

  it("handles primary API failure", async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    const params = { id: "1" };
    const page = await ProductDetailPage({ params });
    await renderWithProviders(page);

    // Wait for error message to appear
    const errorMessage = await screen.findByText("Unable to Load Product");
    expect(errorMessage).toBeInTheDocument();

    global.fetch = originalFetch;
  });

  it("handles invalid data response", async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ invalid: "data" }), // Missing required fields
      })
    ) as jest.Mock;

    const params = { id: "1" };
    const page = await ProductDetailPage({ params });
    await renderWithProviders(page);

    // Wait for error message to appear
    const errorMessage = await screen.findByText("Unable to Load Product");
    expect(errorMessage).toBeInTheDocument();

    global.fetch = originalFetch;
  });

  describe("generateMetadata", () => {
    it("returns product title for valid product", async () => {
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProduct),
        })
      ) as jest.Mock;

      const params = { id: "1" };
      const metadata = await generateMetadata({ params });

      expect(metadata.title).toBe("Test Product");

      global.fetch = originalFetch;
    });

    it("returns fallback title for error", async () => {
      const originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Failed to fetch"))
      ) as jest.Mock;

      const params = { id: "999" };
      const metadata = await generateMetadata({ params });

      expect(metadata.title).toBe("Product Details");

      global.fetch = originalFetch;
    });
  });
});
