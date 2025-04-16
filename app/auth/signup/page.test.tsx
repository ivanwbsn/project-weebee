import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./page";

describe("Signup Page", () => {
  const mockWindowLocation = {
    href: "",
  };

  beforeAll(() => {
    // Mock window.location
    Object.defineProperty(window, "location", {
      value: mockWindowLocation,
      writable: true,
    });
  });

  beforeEach(() => {
    mockWindowLocation.href = "";
  });

  it("renders signup form", () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  it("handles successful signup", async () => {
    render(<Signup />);

    const firstNameInput = screen.getByPlaceholderText("First name");
    const lastNameInput = screen.getByPlaceholderText("Last name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe("/auth/login");
    });
  });

  it("handles signup failure", async () => {
    render(<Signup />);

    const firstNameInput = screen.getByPlaceholderText("First name");
    const lastNameInput = screen.getByPlaceholderText("Last name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    // Submit without filling required fields
    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).not.toBe("/auth/login");
    });
  });
});
