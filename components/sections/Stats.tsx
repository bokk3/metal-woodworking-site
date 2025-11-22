"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Hammer, Trophy, Users, Clock } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Projecten Voltooid",
    value: 150,
    suffix: "+",
    icon: Hammer,
  },
  {
    id: 2,
    label: "Jaar Ervaring",
    value: 12,
    suffix: "+",
    icon: Clock,
  },
  {
    id: 3,
    label: "Klanttevredenheid",
    value: 100,
    suffix: "%",
    icon: Users,
  },
  {
    id: 4,
    label: "Ontwerp Prijzen",
    value: 8,
    suffix: "",
    icon: Trophy,
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Simple counter animation logic could be added here using useSpring or similar
  // For now, we'll just display the number, but in a real app we'd animate it up.

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-bronze">
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20 bg-muted dark:bg-muted border-y border-border/20 bg-gradient-to-b from-background via-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-bronze/10 text-bronze">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className={cn(typography.label, "text-muted-foreground")}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
