"use client";

import { ContactForm } from "./Contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={cn(typography.h2, "text-foreground mb-6")}>
            Start Uw <span className="text-bronze">Project</span>
          </h2>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Klaar om uw ruimte te transformeren? Neem vandaag contact met ons op voor een consultatie. We zijn er om uw ideeën tot leven te brengen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-card p-8 rounded-lg border border-border/50 h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Contactgegevens
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-bronze/10 text-bronze">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Telefoon
                    </p>
                    <p className="text-foreground font-semibold">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-bronze/10 text-bronze">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      E-mail
                    </p>
                    <p className="text-foreground font-semibold">
                      hello@metalcraft.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-bronze/10 text-bronze">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Werkplaats
                    </p>
                    <p className="text-foreground font-semibold">
                      123 Artisan Way
                      <br />
                      Industrial District, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-sm font-bold text-foreground mb-4">
                  Openingsuren
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Maandag - Vrijdag</span>
                    <span className="text-foreground">8:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Zaterdag</span>
                    <span className="text-foreground">9:00 - 16:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Zondag</span>
                    <span className="text-foreground">Gesloten</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
