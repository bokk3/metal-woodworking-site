import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metal & Wood | Custom Handcrafted Furniture",
  description:
    "Premium handcrafted metal and wood furniture for your home and office.",
  openGraph: {
    title: "Metal & Wood | Custom Handcrafted Furniture",
    description:
      "Premium handcrafted metal and wood furniture for your home and office.",
    type: "website",
    locale: "en_US",
    siteName: "Metal & Wood",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
