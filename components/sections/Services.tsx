"use client";

import { ServiceCard } from "./Services/ServiceCard";
import { services } from "@/lib/services-data";

export function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-darkBg-lighter relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-size-[2rem_2rem] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What We <span className="text-bronze">Do</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine traditional craftsmanship with modern techniques to
            deliver exceptional results across a wide range of services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
