"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/portfolio-data";

interface PortfolioFilterProps {
  currentCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "metal", label: "Metal" },
  { value: "wood", label: "Wood" },
  { value: "combined", label: "Combined" },
];

export function PortfolioFilter({
  currentCategory,
  onCategoryChange,
}: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300",
            currentCategory === category.value
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {currentCategory === category.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-bronze rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
