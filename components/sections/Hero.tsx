"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-darkBg">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-size-[4rem_4rem] bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />

        {/* Radial Gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-darkBg/50 to-darkBg" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Crafting <span className="text-bronze">Metal</span> &{" "}
            <span className="text-steel">Wood</span> into Art
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Custom metalwork and woodworking for residential and commercial
            projects. Where industrial strength meets natural beauty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-bronze hover:bg-bronze-dark text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(205,127,50,0.3)] hover:shadow-[0_0_25px_rgba(205,127,50,0.5)]"
          >
            View Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-bronze text-bronze hover:bg-bronze hover:text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300"
          >
            Get a Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
