"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ParallaxSection } from "@/components/effects/ParallaxSection";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Hero image */}
        <img
          src="/images/hero/hero-video-poster.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay - transparent top to background bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />

        {/* Video - commented out for now */}
        {/* <ParallaxSection offset={30} className="absolute inset-0 z-[1]">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/hero-video-poster.png"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/images/hero/hero-video.mp4" type="video/mp4" />
          </video>
        </ParallaxSection> */}

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-size-[4rem_4rem] dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[linear-gradient(to_right,#d4d1cc_1px,transparent_1px),linear-gradient(to_bottom,#d4d1cc_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:opacity-10 opacity-15 mix-blend-overlay pointer-events-none" />

        {/* Radial Gradient for depth - lighter overlay, only at edges */}
        <div 
          className="absolute inset-0 pointer-events-none dark:[background:radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(10,10,10,0.3)_100%)] [background:radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(250,249,247,0.6)_100%)]"
        />
      </div>

      <div className="container relative z-[10] px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className={cn(typography.h1, "text-foreground mb-6")}>
            Vervaardigen van{" "}
            <span 
              className="inline-block bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #cbd5e1 0%, #f1f5f9 25%, #ffffff 50%, #f1f5f9 75%, #cbd5e1 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              }}
            >
              Metaal
            </span>{" "}
            & <span className="text-bronze">Hout</span> tot{" "}
            <br className="hidden md:block" />
            Tijdloze Erfenissen
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
              "text-muted-foreground mb-10 max-w-2xl mx-auto"
            )}
          >
            Waar industriële precisie organische warmte ontmoet. We ontwerpen en bouwen op maat gemaakte meubels en architecturale elementen die ruimtes definiëren.
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
            Bekijk Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-bronze text-bronze hover:bg-bronze hover:text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300"
          >
            Offerte Aanvragen
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
