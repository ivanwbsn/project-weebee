import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./providers/theme-provider";
import { CartProvider } from "./providers/cart-provider";
import { AuthProvider } from "./providers/auth-provider";
import { WishlistProvider } from "./providers/wishlist-provider";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import LiveChat from "./components/live-chat";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeShop",
  description: "Modern e-commerce shop built with React and Next.js",
  icons: {
    icon: "/ENlogo.svg",
    shortcut: "/ENlogo.svg",
    apple: "/ENlogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LiveChat />
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <Toaster position="top-right" />
                <Navbar />
                {children}
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
