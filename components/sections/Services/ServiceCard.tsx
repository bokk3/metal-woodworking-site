"use client";

import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/services-data";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-8 rounded-lg bg-card border border-border/50 hover:border-bronze/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(205,127,50,0.1)] dark:hover:shadow-[0_0_20px_rgba(205,127,50,0.1)] hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(205,127,50,0.1)] shadow-sm hover:-translate-y-1"
    >
      <div className="mb-6 inline-block p-3 rounded-full bg-bronze/10 text-bronze group-hover:bg-bronze group-hover:text-white transition-colors duration-300">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-bronze transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}
