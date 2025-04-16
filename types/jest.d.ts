import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeEmpty(): R;
      toBeEmptyDOMElement(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeVisible(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
      toHaveFormValues(values: { [key: string]: any }): R;
      toHaveStyle(css: string | object): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value?: string | string[] | number): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveDescription(text?: string | RegExp): R;
    }
  }
  var mockRouter: {
    push: jest.Mock;
    back: jest.Mock;
    forward: jest.Mock;
  };
  var mockAuth: {
    isAuthenticated: boolean;
    user: null | { email: string; username: string };
    setUser: jest.Mock;
    login: jest.Mock;
    logout: jest.Mock;
  };

  var mockCart: {
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
    addToCart: jest.Mock;
    removeFromCart: jest.Mock;
    updateQuantity: jest.Mock;
  };

  var mockWishlist: {
    items: Array<{
      id: string;
      name: string;
      price: number;
      description: string;
      image: string;
    }>;
    addToWishlist: jest.Mock;
    removeFromWishlist: jest.Mock;
  };
}

export {};
