"use client";

import { ServiceCard } from "./Services/ServiceCard";
import { services } from "@/lib/services-data";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-card relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cd7f32_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className={cn(typography.h2, "text-foreground mb-6")}>
            Expert <span className="text-steel">Craftsmanship</span>
          </h2>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            We combine traditional techniques with modern precision to deliver
            exceptional quality in every project.
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
