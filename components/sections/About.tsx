"use client";

import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg dark:shadow-none">
              <Image
                src="/images/hero/background.png"
                alt="MetalCraft Workshop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 dark:bg-black/20" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-2/3 aspect-[4/3] rounded-lg overflow-hidden border-4 border-background shadow-2xl dark:shadow-xl hidden md:block">
              <Image
                src="/images/portfolio/metal-table.png"
                alt="Detail work"
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className={cn(typography.h2, "text-foreground mb-6")}>
              Forging <span className="text-bronze">Excellence</span> Since 2012
            </h2>

            <div className="space-y-6 text-muted-foreground">
              <p className={typography.bodyLarge}>
                At MetalCraft, we believe that furniture should be more than
                just functional—it should be a legacy. Founded by master
                craftsman Elias Thorne, our workshop brings together the raw
                strength of industrial steel and the organic warmth of reclaimed
                wood.
              </p>
              <p>
                Every piece that leaves our studio is handcrafted with obsessive
                attention to detail. We don't use assembly lines. We use hands,
                hearts, and tools that have been passed down through
                generations, combined with modern precision engineering.
              </p>
              <p>
                Whether we're designing a custom conference table for a Fortune
                500 company or a dining table for a family home, our philosophy
                remains the same: build it to last, build it to inspire.
              </p>
            </div>

            <div className="mt-8">
              <Button className="bg-bronze hover:bg-bronze-dark text-white">
                Meet the Team <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
