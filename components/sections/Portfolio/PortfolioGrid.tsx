"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioFilter } from "./PortfolioFilter";
import { PortfolioCard } from "./PortfolioCard";
import { portfolioItems, Category } from "@/lib/portfolio-data";

export function PortfolioGrid() {
  const [filter, setFilter] = useState<Category>("all");

  const filteredItems = portfolioItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div>
      <PortfolioFilter currentCategory={filter} onCategoryChange={setFilter} />

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
