"use client";

import { useState } from "react";
import {
  QuoteData,
  materials,
  projectTypes,
  calculateQuote,
  getQuoteRange,
} from "@/lib/quote-calculator";
import { generateQuotePDF } from "./QuotePDF";
import { submitQuote } from "@/app/actions/quote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FileDown, Calculator, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function QuoteForm() {
  const [formData, setFormData] = useState<QuoteData>({
    projectType: "",
    material: "",
    length: 0,
    width: 0,
    quantity: 1,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCalculate = () => {
    const price = calculateQuote(formData);
    setEstimatedPrice(price);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleDownloadPDF = () => {
    if (estimatedPrice > 0) {
      generateQuotePDF(formData, estimatedPrice);
    }
  };

  const handleSubmit = async () => {
    if (!formData.projectType || !formData.material || !formData.length || !formData.width || estimatedPrice <= 0) {
      setSubmitError("Vul alle verplichte velden in en bereken eerst een schatting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const submitFormData = new FormData();
      submitFormData.append("projectType", formData.projectType);
      submitFormData.append("material", formData.material);
      submitFormData.append("length", formData.length.toString());
      submitFormData.append("width", formData.width.toString());
      submitFormData.append("quantity", formData.quantity.toString());
      submitFormData.append("estimatedPrice", estimatedPrice.toString());
      if (formData.name) submitFormData.append("name", formData.name);
      if (formData.email) submitFormData.append("email", formData.email);
      if (formData.phone) submitFormData.append("phone", formData.phone);
      if (formData.notes) submitFormData.append("notes", formData.notes);

      const result = await submitQuote(submitFormData);

      if (result.success) {
        setSubmitSuccess(true);
        setSubmitError(null);
      } else {
        setSubmitError(result.error || "Er is iets misgegaan bij het verzenden.");
        setSubmitSuccess(false);
      }
    } catch (error) {
      setSubmitError("Er is een fout opgetreden. Probeer het later opnieuw.");
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const range = estimatedPrice > 0 ? getQuoteRange(estimatedPrice) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-8">
        {/* Project Type Selection */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">
            1. Selecteer Projecttype
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() =>
                  setFormData({ ...formData, projectType: type.id })
                }
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.projectType === type.id
                    ? "border-bronze bg-bronze/10"
                    : "border-border/50 hover:border-bronze/50"
                }`}
              >
                <h3 className="font-semibold text-foreground mb-1">
                  {type.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Material Selection */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">
            2. Kies Materiaal
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((mat) => (
              <button
                key={mat.id}
                onClick={() => setFormData({ ...formData, material: mat.id })}
                className={`rounded-lg border-2 transition-all overflow-hidden ${
                  formData.material === mat.id
                    ? "border-bronze"
                    : "border-border/50 hover:border-bronze/50"
                }`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-foreground">{mat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {mat.description}
                  </p>
                  <p className="text-sm text-bronze mt-1">
                    ${mat.baseRate}/m²
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">
            3. Voer Afmetingen In
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="length">Lengte (inch)</Label>
              <Input
                id="length"
                type="number"
                value={formData.length || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    length: parseFloat(e.target.value) || 0,
                  })
                }
                className="mt-1"
                placeholder="48"
              />
            </div>
            <div>
              <Label htmlFor="width">Breedte (inch)</Label>
              <Input
                id="width"
                type="number"
                value={formData.width || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    width: parseFloat(e.target.value) || 0,
                  })
                }
                className="mt-1"
                placeholder="24"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Aantal</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity || 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value) || 1,
                  })
                }
                className="mt-1"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Contact Info (Optional) */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">
            4. Uw Gegevens (Optioneel)
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefoon</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1"
                placeholder="(555) 555-1234"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="notes">Aanvullende Opmerkingen</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="mt-1"
              rows={3}
              placeholder="Specifieke vereisten of details..."
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div>
          <Button
            onClick={handleCalculate}
            disabled={
              !formData.projectType ||
              !formData.material ||
              !formData.length ||
              !formData.width
            }
            className="w-full bg-bronze hover:bg-bronze-dark text-white text-lg py-6"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Schatting Berekenen
          </Button>
        </div>

        {/* Results */}
        {estimatedPrice > 0 && range && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border-2 border-bronze rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Geschatte Offerte
            </h3>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Prijsbereik: ${range.min.toLocaleString()} - $
                {range.max.toLocaleString()}
              </p>
              <p className="text-4xl font-bold text-bronze">
                ${estimatedPrice.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                * Dit is een schatting. De uiteindelijke prijs kan variëren op basis van projectcomplexiteit en materiaalbeschikbaarheid.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-md"
                >
                  <CheckCircle className="w-5 h-5" />
                  <p>Offerte succesvol verzonden! We nemen zo spoedig mogelijk contact met u op.</p>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-md"
                >
                  <AlertCircle className="w-5 h-5" />
                  <p>{submitError}</p>
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-bronze hover:bg-bronze-dark text-white"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  PDF Offerte Downloaden
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || estimatedPrice <= 0}
                  className="bg-bronze hover:bg-bronze-dark text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    "Offerte Verzenden"
                  )}
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact">Neem Contact Op</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
