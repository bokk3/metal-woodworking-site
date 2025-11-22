"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Interior Designer",
    content:
      "MetalCraft's attention to detail is unmatched. The custom steel shelving unit they built for my client's loft completely transformed the space. It's not just furniture; it's art.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Restaurant Owner",
    content:
      "We needed 20 custom tables that could withstand heavy use but still look elegant. The walnut and steel tables they delivered exceeded our expectations. Our customers love them.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Architect",
    content:
      "I've worked with many fabricators, but MetalCraft stands out. Their ability to interpret complex architectural drawings and execute them with precision is rare. Highly recommended.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    role: "Homeowner",
    content:
      "The floating staircase they designed and installed is the centerpiece of our home. The craftsmanship is flawless, and the team was professional throughout the entire process.",
    rating: 5,
  },
];

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(typography.h2, "text-foreground mb-6")}>
            Klant <span className="text-bronze">Verhalen</span>
          </h2>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Geloof ons niet zomaar op ons woord. Luister naar de architecten, ontwerpers en huiseigenaren waarmee we het voorrecht hebben gehad om samen te werken.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/2"
                >
                  <div className="p-1 h-full">
                    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-bronze/50 transition-colors duration-300">
                      <CardContent className="flex flex-col justify-between h-full p-8">
                        <div>
                          <Quote className="w-8 h-8 text-bronze/20 mb-6" />
                          <p className="text-lg text-muted-foreground italic mb-6">
                            "{testimonial.content}"
                          </p>
                        </div>

                        <div>
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-bronze fill-bronze"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 border-bronze/20 hover:bg-bronze/10 hover:text-bronze" />
              <CarouselNext className="-right-12 border-bronze/20 hover:bg-bronze/10 hover:text-bronze" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
