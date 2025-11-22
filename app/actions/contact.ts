"use server";

import { saveContactSubmission } from "@/lib/db";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const projectType = formData.get("projectType") as string;
    const budget = formData.get("budget") as string;
    const preferredContact = formData.get("preferredContact") as string;
    const appointmentDate = formData.get("appointmentDate") as string;
    const message = formData.get("message") as string;

    // Basic Server-side Validation
    if (!name || !email || !message) {
      return { success: false, error: "Ontbrekende verplichte velden" };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Ongeldig e-mailadres" };
    }

    // Save to database
    const submissionId = saveContactSubmission({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      projectType: projectType || undefined,
      budget: budget ? parseInt(budget) : undefined,
      preferredContact: preferredContact || undefined,
      appointmentDate: appointmentDate || undefined,
      message: message.trim(),
    });

    return { 
      success: true, 
      message: "Bericht succesvol verzonden!",
      id: submissionId
    };
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return { 
      success: false, 
      error: "Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw." 
    };
  }
}
