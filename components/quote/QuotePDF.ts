"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  QuoteData,
  calculateQuote,
  getQuoteRange,
} from "@/lib/quote-calculator";

export function generateQuotePDF(data: QuoteData, price: number) {
  const doc = new jsPDF();
  const range = getQuoteRange(price);

  // Header
  doc.setFontSize(24);
  doc.setTextColor(205, 127, 50); // Bronze color
  doc.text("MetalCraft", 20, 20);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Custom Metalwork & Woodworking", 20, 28);

  // Line
  doc.setDrawColor(205, 127, 50);
  doc.line(20, 32, 190, 32);

  // Title
  doc.setFontSize(18);
  doc.text("Project Quote", 20, 45);

  // Date
  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);

  // Customer Info
  if (data.name || data.email) {
    doc.setFontSize(12);
    doc.text("Customer Information:", 20, 65);
    doc.setFontSize(10);
    let y = 72;
    if (data.name) {
      doc.text(`Name: ${data.name}`, 20, y);
      y += 7;
    }
    if (data.email) {
      doc.text(`Email: ${data.email}`, 20, y);
      y += 7;
    }
    if (data.phone) {
      doc.text(`Phone: ${data.phone}`, 20, y);
      y += 7;
    }
  }

  // Project Details
  doc.setFontSize(12);
  doc.text("Project Details:", 20, 100);
  doc.setFontSize(10);
  doc.text(`Project Type: ${data.projectType}`, 20, 107);
  doc.text(`Material: ${data.material}`, 20, 114);
  doc.text(`Dimensions: ${data.length}" x ${data.width}"`, 20, 121);
  doc.text(`Quantity: ${data.quantity}`, 20, 128);

  if (data.notes) {
    doc.text("Notes:", 20, 135);
    const splitNotes = doc.splitTextToSize(data.notes, 170);
    doc.text(splitNotes, 20, 142);
  }

  // Pricing
  doc.setFontSize(12);
  doc.text("Estimated Pricing:", 20, 170);
  doc.setFontSize(10);
  doc.text(
    `Price Range: $${range.min.toLocaleString()} - $${range.max.toLocaleString()}`,
    20,
    177
  );

  doc.setFontSize(14);
  doc.setTextColor(205, 127, 50);
  doc.text(`Estimated Total: $${price.toLocaleString()}`, 20, 187);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This is an estimate only. Final pricing may vary based on project complexity.",
    20,
    270
  );
  doc.text(
    "Valid for 30 days. Contact us to discuss your project in detail.",
    20,
    275
  );
  doc.text("hello@metalcraft.com | (555) 555-1234", 20, 280);

  // Save
  doc.save(`MetalCraft-Quote-${new Date().getTime()}.pdf`);
}
