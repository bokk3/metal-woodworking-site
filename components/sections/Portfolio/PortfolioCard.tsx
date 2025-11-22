"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PortfolioItem } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { MagneticWrapper } from "@/components/effects/MagneticWrapper";

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  return (
    <MagneticWrapper className="h-full">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-card h-full"
        onClick={() => onClick(item)}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
          <Badge className="mb-3 bg-bronze hover:bg-bronze-dark text-white border-none">
            {item.category}
          </Badge>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">
            {item.description}
          </p>
        </div>
      </motion.div>
    </MagneticWrapper>
  );
}
