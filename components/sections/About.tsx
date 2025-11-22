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
              Vervaardigen van <span className="text-bronze">Uitmuntendheid</span> Sinds 2012
            </h2>

            <div className="space-y-6 text-muted-foreground">
              <p className={typography.bodyLarge}>
                Bij MetalCraft geloven we dat meubels meer moeten zijn dan alleen functioneel—ze moeten een erfenis zijn. Opgericht door meester-ambachtsman Elias Thorne, brengt onze werkplaats de ruwe kracht van industrieel staal en de organische warmte van gerecupereerd hout samen.
              </p>
              <p>
                Elk stuk dat onze studio verlaat, wordt handgemaakt met obsessieve aandacht voor detail. We gebruiken geen assemblagelijnen. We gebruiken handen, harten en gereedschappen die generaties lang zijn doorgegeven, gecombineerd met moderne precisietechniek.
              </p>
              <p>
                Of we nu een op maat gemaakte vergadertafel ontwerpen voor een Fortune 500-bedrijf of een eettafel voor een gezinswoning, onze filosofie blijft hetzelfde: bouw het om te blijven, bouw het om te inspireren.
              </p>
            </div>

            <div className="mt-8">
              <Button className="bg-bronze hover:bg-bronze-dark text-white">
                Ontmoet het Team <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
