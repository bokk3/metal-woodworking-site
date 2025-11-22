"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PortfolioItem } from "@/lib/portfolio-data";
import Image from "next/image";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ item, isOpen, onClose }: PortfolioModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <DialogHeader className="mb-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant="outline"
                  className="text-bronze border-bronze/20 uppercase tracking-wider text-xs"
                >
                  {item.category}
                </Badge>
                {item.year && (
                  <span className="text-sm text-muted-foreground font-mono">
                    {item.year}
                  </span>
                )}
              </div>
              <DialogTitle className={cn(typography.h3, "text-foreground")}>
                {item.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Description
                </h4>
                <DialogDescription
                  className={cn(typography.body, "text-muted-foreground")}
                >
                  {item.description}
                </DialogDescription>
              </div>

              {item.specs && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Dimensions
                  </h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    {item.specs}
                  </p>
                </div>
              )}

              {item.materials && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Materials
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.materials}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
