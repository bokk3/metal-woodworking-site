"use client";

import { PortfolioGrid } from "./Portfolio/PortfolioGrid";
import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={cn(typography.h2, "text-foreground mb-6")}>
            Our <span className="text-bronze">Masterpieces</span>
          </h2>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            A curated collection of our finest work. From robust industrial
            steel structures to the delicate grain of reclaimed wood, every
            piece tells a story.
          </p>
        </motion.div>

        <PortfolioGrid />
      </div>
    </section>
  );
}
