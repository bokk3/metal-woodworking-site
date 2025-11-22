"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PortfolioSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMaterials: string[];
  onMaterialToggle: (material: string) => void;
  selectedYears: string[];
  onYearToggle: (year: string) => void;
  totalItems: number;
  filteredCount: number;
}

const availableMaterials = ["Steel", "Walnut", "Oak", "Metal", "Wood"];
const availableYears = ["2024", "2023", "2022"];

export function PortfolioSearch({
  searchTerm,
  onSearchChange,
  selectedMaterials,
  onMaterialToggle,
  selectedYears,
  onYearToggle,
  totalItems,
  filteredCount,
}: PortfolioSearchProps) {
  const hasActiveFilters =
    searchTerm || selectedMaterials.length > 0 || selectedYears.length > 0;

  const clearAllFilters = () => {
    onSearchChange("");
    selectedMaterials.forEach((m) => onMaterialToggle(m));
    selectedYears.forEach((y) => onYearToggle(y));
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects by name or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border/50"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground font-medium">
            Materials:
          </span>
          {availableMaterials.map((material) => (
            <Badge
              key={material}
              variant={
                selectedMaterials.includes(material) ? "default" : "outline"
              }
              className={`cursor-pointer transition-all ${
                selectedMaterials.includes(material)
                  ? "bg-bronze hover:bg-bronze-dark text-white"
                  : "hover:border-bronze"
              }`}
              onClick={() => onMaterialToggle(material)}
            >
              {material}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground font-medium">
            Year:
          </span>
          {availableYears.map((year) => (
            <Badge
              key={year}
              variant={selectedYears.includes(year) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedYears.includes(year)
                  ? "bg-bronze hover:bg-bronze-dark text-white"
                  : "hover:border-bronze"
              }`}
              onClick={() => onYearToggle(year)}
            >
              {year}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-bold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-bold text-foreground">{totalItems}</span>{" "}
          projects
        </p>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-bronze hover:text-bronze-dark hover:bg-bronze/10"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
