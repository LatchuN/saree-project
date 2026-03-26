import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silk Saree Store | Premium Handwoven Silk Sarees Online",
  description:
    "Discover exquisite handwoven Kanchipuram, Banarasi, and Bridal silk sarees. Authentic craftsmanship, premium quality, delivered across India.",
  keywords: [
    "silk sarees",
    "kanchipuram sarees",
    "banarasi sarees",
    "bridal sarees",
    "handwoven sarees",
    "buy sarees online",
    "indian sarees",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
