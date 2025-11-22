"use client";

import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { MessageSquare, PenTool, Hammer, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We start by understanding your vision, requirements, and the space where the piece will live.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Design",
    description:
      "Our team creates detailed 3D models and technical drawings for your approval.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Fabrication",
    description:
      "Master craftsmen bring the design to life using premium materials and precision techniques.",
    icon: Hammer,
  },
  {
    id: 4,
    title: "Installation",
    description:
      "We ensure perfect placement and setup, leaving you with a flawless finished product.",
    icon: Truck,
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-darkBg relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className={cn(typography.h2, "text-white mb-6")}>
            Our <span className="text-bronze">Process</span>
          </h2>
          <p
            className={cn(
              typography.bodyLarge,
              "text-gray-400 max-w-2xl mx-auto"
            )}
          >
            From concept to completion, we follow a rigorous workflow to ensure
            every detail meets our exacting standards.
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
                <div className="w-16 h-16 rounded-full bg-darkBg border-2 border-bronze flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(205,127,50,0.2)]">
                  <step.icon className="w-8 h-8 text-bronze" />
                </div>
                <h3 className={cn(typography.h4, "text-white mb-3")}>
                  {step.title}
                </h3>
                <p className={cn(typography.body, "text-gray-400")}>
                  {step.description}
                </p>

                {/* Step Number Background */}
                <div className="absolute -top-4 -right-4 text-6xl font-bold text-white/5 select-none -z-10 font-heading">
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
