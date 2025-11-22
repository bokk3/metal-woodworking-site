"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioFilter } from "./PortfolioFilter";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioModal } from "./PortfolioModal";
import { PortfolioSearch } from "./PortfolioSearch";
import { portfolioItems, Category, PortfolioItem } from "@/lib/portfolio-data";

export function PortfolioGrid() {
  const [filter, setFilter] = useState<Category>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      // Category filter
      const matchesCategory = filter === "all" || item.category === filter;

      // Search filter
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Material filter
      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.some((mat) =>
          item.materials?.toLowerCase().includes(mat.toLowerCase())
        );

      // Year filter
      const matchesYear =
        selectedYears.length === 0 ||
        (item.year && selectedYears.includes(item.year));

      return matchesCategory && matchesSearch && matchesMaterial && matchesYear;
    });
  }, [filter, searchTerm, selectedMaterials, selectedYears]);

  return (
    <div>
      <PortfolioFilter currentCategory={filter} onCategoryChange={setFilter} />

      <PortfolioSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedMaterials={selectedMaterials}
        onMaterialToggle={toggleMaterial}
        selectedYears={selectedYears}
        onYearToggle={toggleYear}
        totalItems={portfolioItems.length}
        filteredCount={filteredItems.length}
      />

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={setSelectedItem}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No projects found matching your criteria. Try adjusting your
            filters.
          </p>
        </div>
      )}

      <PortfolioModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
