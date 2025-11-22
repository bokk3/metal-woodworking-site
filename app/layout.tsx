import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ContactWidget } from "@/components/ui/ContactWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
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
    url: "https://metalcraft.com",
    title: "MetalCraft | Custom Metal & Woodworking",
    description:
      "Premium handcrafted metal and wood furniture, custom fabrication, and architectural elements.",
    siteName: "MetalCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetalCraft | Custom Metal & Woodworking",
    description:
      "Premium handcrafted metal and wood furniture, custom fabrication, and architectural elements.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = 'metalcraft-theme';
                  const defaultTheme = 'system';
                  const stored = localStorage.getItem(storageKey) || defaultTheme;
                  let theme;
                  if (stored === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } else {
                    theme = stored;
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider defaultTheme="system" storageKey="metalcraft-theme">
          <ScrollProgress />
          <CustomCursor />
          <ContactWidget />
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
