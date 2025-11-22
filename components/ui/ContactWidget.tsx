"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle quick contact submission
    alert("Quick message sent! We'll get back to you soon.");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-bronze hover:bg-bronze-dark text-white shadow-lg hover:shadow-xl transition-all"
          aria-label="Open contact widget"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {/* Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96"
          >
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-bronze p-4 text-white">
                <h3 className="font-bold text-lg">Quick Contact</h3>
                <p className="text-sm text-white/90">We're here to help!</p>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+15555551234"
                    className="flex items-center gap-2 p-3 bg-background hover:bg-background/80 rounded-lg border border-border/50 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-bronze" />
                    <span className="text-sm font-medium">Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/15555551234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-background hover:bg-background/80 rounded-lg border border-border/50 transition-colors"
                  >
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.881 11.881 0 005.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                </div>

                {/* Quick Form */}
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <Input
                    placeholder="Your email"
                    type="email"
                    required
                    className="bg-background border-border/50"
                  />
                  <Textarea
                    placeholder="Quick message..."
                    required
                    className="bg-background border-border/50 min-h-[80px]"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-bronze hover:bg-bronze-dark text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
