"use client";

import { PortfolioGrid } from "./Portfolio/PortfolioGrid";
import { motion } from "framer-motion";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-bronze">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of custom handcrafted pieces, ranging from
            industrial steel structures to refined wood furniture.
          </p>
        </motion.div>

        <PortfolioGrid />
      </div>
    </section>
  );
}
