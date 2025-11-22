"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input"; // Corrected import path for Input
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);

    const result = await subscribeNewsletter(formData);

    setIsLoading(false);

    if (result.success) {
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  return (
    <footer className="bg-black border-t border-border/40 text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground tracking-tight">
              METAL<span className="text-bronze">CRAFT</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium handcrafted metal and wood furniture designed to elevate
              your living and working spaces. Built to last, styled to impress.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#portfolio"
                  className="hover:text-primary transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Industrial Blvd, Craftsville, NY 10001</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <a
                  href="tel:+15555551234"
                  className="hover:text-primary transition-colors"
                >
                  +1 (555) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@metalcraft.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@metalcraft.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Get Inspired
            </h3>
            <p className="text-sm">
              Subscribe for project ideas, design tips, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                  disabled={isLoading}
                  className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-bronze hover:bg-bronze-dark text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-500 text-sm"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Thanks for subscribing!</span>
                  </motion.div>
                )}
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} MetalCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
