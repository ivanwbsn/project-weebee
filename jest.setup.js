import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./app/mocks/server";

// Mock Next.js components
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
    sizes,
    className,
    priority,
    quality,
    onError,
  }) => {
    return <img src={src} alt={alt} className={className} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock Next.js router
const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

// Mock React context hooks
const mockAuth = {
  isAuthenticated: false,
  user: null,
  setUser: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};

jest.mock("./app/providers/auth-provider", () => ({
  useAuth: () => mockAuth,
}));

// Export mocks for test usage
global.mockRouter = mockRouter;
global.mockAuth = mockAuth;

jest.mock("./app/providers/cart-provider", () => ({
  useCart: () => ({
    items: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
  }),
}));

jest.mock("./app/providers/wishlist-provider", () => ({
  useWishlist: () => ({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));

// Menekan warning deprecation
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((...args) => {
    const message = args[0];
    if (typeof message === "string" && message.includes("punycode")) {
      return;
    }
    originalWarn.apply(console, args);
  });

  jest.spyOn(console, "error").mockImplementation((...args) => {
    const message = args[0];
    if (typeof message === "string" && message.includes("punycode")) {
      return;
    }
    originalError.apply(console, args);
  });

  // Setup MSW
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  server.close();
  console.warn.mockRestore();
  console.error.mockRestore();
});
