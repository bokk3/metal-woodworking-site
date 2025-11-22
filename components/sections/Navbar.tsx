"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/", sectionId: "home" },
  { name: "Portfolio", href: "/#portfolio", sectionId: "portfolio" },
  { name: "Diensten", href: "/#services", sectionId: "services" },
  { name: "Over Ons", href: "/#about", sectionId: "about" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
  { name: "Blog", href: "/blog", sectionId: null },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Scroll spy for section highlighting
      if (pathname === "/") {
        const scrollPosition = window.scrollY + 150; // Offset for navbar + some padding
        
        // If at top, highlight home
        if (window.scrollY < 200) {
          setActiveSection("home");
          return;
        }
        
        // Check sections in reverse order (bottom to top)
        const sections = ["contact", "about", "services", "portfolio", "home"];
        let found = false;
        
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop) {
              setActiveSection(sectionId);
              found = true;
              break;
            }
          }
        }
        
        // If no section found, default to last section (contact)
        if (!found) {
          setActiveSection("contact");
        }
      } else {
        // Not on home page, clear active section
        setActiveSection("");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tighter text-foreground">
            METAL<span className="text-bronze">CRAFT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === "/" && activeSection === item.sectionId;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-bronze"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
          <Button 
            asChild
            className="bg-bronze hover:bg-bronze-dark text-white font-semibold ml-2"
          >
            <Link href="/quote-calculator">Offerte Aanvragen</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-bronze transition-colors"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border/40 overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === "/" && activeSection === item.sectionId;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-3 text-lg font-medium transition-colors rounded-md",
                      isActive
                        ? "text-bronze bg-bronze/10"
                        : "text-foreground hover:text-bronze hover:bg-bronze/5"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSectionMobile"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-bronze rounded-r"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
              <Button 
                asChild
                className="w-full bg-bronze hover:bg-bronze-dark text-white font-semibold mt-2"
              >
                <Link href="/quote-calculator" onClick={() => setIsOpen(false)}>
                  Offerte Aanvragen
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
