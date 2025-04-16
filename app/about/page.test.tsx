import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders hero section with correct text", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/After Buying Our Products.*Come/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "h1" &&
          content.includes("Back To") &&
          content.includes("Buy Again")
        );
      })
    ).toBeInTheDocument();
  });

  it("renders brand section with correct content", () => {
    render(<AboutPage />);
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "h2" &&
          content.includes("Royal") &&
          content.includes("Fashion")
        );
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Feel Royal")).toBeInTheDocument();
  });

  it("renders product info section with correct content", () => {
    render(<AboutPage />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("BEST SERVICE")).toBeInTheDocument();
    expect(
      screen.getByText(/Online shopping for retail sales/)
    ).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<AboutPage />);
    const features = [
      "Best Value",
      "Cash-Back",
      "100% Secure Payment",
      "Customer Support 24/7",
    ].sort();

    const renderedFeatures = screen
      .getAllByRole("heading", { level: 4 })
      .map((heading) => heading.textContent)
      .sort();

    expect(renderedFeatures).toEqual(features);
  });

  it("renders feature descriptions", () => {
    render(<AboutPage />);
    const descriptions = [
      "Premium quality products",
      "Money-back guarantee",
      "We ensure secure payment!",
      "Instant access to perfect support",
    ];

    descriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});
