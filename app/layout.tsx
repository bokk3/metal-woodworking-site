import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MetalCraft | Custom Metal & Woodworking",
    template: "%s | MetalCraft",
  },
  description:
    "Premium handcrafted metal and wood furniture, custom fabrication, and architectural elements. Designed to elevate your living and working spaces.",
  keywords: [
    "metalwork",
    "woodworking",
    "custom furniture",
    "fabrication",
    "welding",
    "industrial design",
  ],
  authors: [{ name: "MetalCraft Team" }],
  creator: "MetalCraft",
  openGraph: {
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
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
