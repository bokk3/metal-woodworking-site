"use client";

import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { MessageSquare, PenTool, Hammer, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Consultatie",
    description:
      "We beginnen met het begrijpen van uw visie, vereisten en de ruimte waar het stuk zal staan.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Ontwerp",
    description:
      "Ons team maakt gedetailleerde 3D-modellen en technische tekeningen voor uw goedkeuring.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Vervaardiging",
    description:
      "Meester-ambachtslieden brengen het ontwerp tot leven met premium materialen en precisietechnieken.",
    icon: Hammer,
  },
  {
    id: 4,
    title: "Installatie",
    description:
      "We zorgen voor perfecte plaatsing en opstelling, waardoor u een vlekkeloos afgewerkt product krijgt.",
    icon: Truck,
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-muted dark:bg-muted relative overflow-hidden bg-gradient-to-b from-muted via-background to-muted"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className={cn(typography.h2, "text-foreground mb-6")}>
            Ons <span className="text-bronze">Proces</span>
          </h2>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Van concept tot voltooiing volgen we een rigoureuze workflow om ervoor te zorgen dat elk detail aan onze veeleisende normen voldoet.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-bronze flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(205,127,50,0.2)]">
                  <step.icon className="w-8 h-8 text-bronze" />
                </div>
                <h3 className={cn(typography.h4, "text-foreground mb-3")}>
                  {step.title}
                </h3>
                <p className={cn(typography.body, "text-muted-foreground")}>
                  {step.description}
                </p>

                {/* Step Number Background */}
                <div className="absolute -top-4 -right-4 text-6xl font-bold text-foreground/5 select-none -z-10 font-heading">
                  0{step.id}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
