"use server";

import { saveQuoteSubmission } from "@/lib/db";
import { getQuoteRange } from "@/lib/quote-calculator";

export interface QuoteFormData {
  projectType: string;
  material: string;
  length: number;
  width: number;
  quantity: number;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export async function submitQuote(formData: FormData) {
  try {
    const projectType = formData.get("projectType") as string;
    const material = formData.get("material") as string;
    const length = formData.get("length") as string;
    const width = formData.get("width") as string;
    const quantity = formData.get("quantity") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const notes = formData.get("notes") as string;
    const estimatedPrice = formData.get("estimatedPrice") as string;

    // Validation
    if (!projectType || !material || !length || !width || !estimatedPrice) {
      return { 
        success: false, 
        error: "Ontbrekende verplichte velden. Zorg ervoor dat u een projecttype, materiaal en afmetingen heeft geselecteerd." 
      };
    }

    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const quantityNum = parseInt(quantity) || 1;
    const estimatedPriceNum = parseFloat(estimatedPrice);

    if (isNaN(lengthNum) || isNaN(widthNum) || isNaN(estimatedPriceNum)) {
      return { 
        success: false, 
        error: "Ongeldige numerieke waarden" 
      };
    }

    if (lengthNum <= 0 || widthNum <= 0 || quantityNum <= 0) {
      return { 
        success: false, 
        error: "Afmetingen en hoeveelheid moeten groter zijn dan 0" 
      };
    }

    // Calculate price range
    const range = getQuoteRange(estimatedPriceNum);

    // Save to database
    const submissionId = saveQuoteSubmission({
      name: name?.trim() || undefined,
      email: email?.trim() || undefined,
      phone: phone?.trim() || undefined,
      projectType: projectType.trim(),
      material: material.trim(),
      length: lengthNum,
      width: widthNum,
      quantity: quantityNum,
      estimatedPrice: estimatedPriceNum,
      priceMin: range.min,
      priceMax: range.max,
      notes: notes?.trim() || undefined,
    });

    return { 
      success: true, 
      message: "Offerte succesvol verzonden! We nemen zo spoedig mogelijk contact met u op.",
      id: submissionId,
      estimatedPrice: estimatedPriceNum,
      priceRange: range
    };
  } catch (error) {
    console.error("Error saving quote submission:", error);
    return { 
      success: false, 
      error: "Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw." 
    };
  }
}

