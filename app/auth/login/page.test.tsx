import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./page";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/auth-provider";

// Mock the modules
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../providers/auth-provider", () => ({
  useAuth: jest.fn(),
}));

describe("Login Page", () => {
  const mockPush = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAuth as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        username: "test",
        email: "test@example.com",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("handles login failure", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });
});
