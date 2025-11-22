"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ParallaxSection } from "@/components/effects/ParallaxSection";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-darkBg">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <ParallaxSection offset={30} className="absolute inset-0">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            {/* Placeholder for video - User to provide public/images/hero/hero-video.mp4 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero/background.png"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
              <source src="/images/hero/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Fallback/Overlay Image (if video fails or while loading, though poster handles loading) */}
            <div className="absolute inset-0 bg-darkBg/60" />
          </div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-size-[4rem_4rem] bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 mix-blend-overlay" />
        </ParallaxSection>

        {/* Radial Gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-darkBg/80 to-darkBg" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className={cn(typography.h1, "text-white mb-6")}>
            Crafting <span className="text-bronze">Metal</span> &{" "}
            <span className="text-steel">Wood</span> into{" "}
            <br className="hidden md:block" />
            Timeless Legacies
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <p
            className={cn(
              typography.bodyLarge,
              "text-gray-300 mb-10 max-w-2xl mx-auto"
            )}
          >
            Where industrial precision meets organic warmth. We design and build
            bespoke furniture and architectural elements that define spaces.
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
