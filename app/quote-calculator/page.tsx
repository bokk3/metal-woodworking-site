import { QuoteForm } from "@/components/quote/QuoteForm";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Quote Calculator | MetalCraft",
  description:
    "Get an instant estimate for your custom metalwork or woodworking project. Interactive calculator with material and size options.",
};

export default function QuoteCalculatorPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={cn(typography.h1, "text-foreground mb-4")}>
            Quote <span className="text-bronze">Calculator</span>
          </h1>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Get an instant estimate for your custom project. Select your options
            below and we&apos;ll calculate a price range.
          </p>
        </div>

        {/* Quote Form */}
        <QuoteForm />

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            <strong>Note:</strong> This calculator provides estimated pricing
            based on typical projects. Every custom piece is unique, and final
            pricing will be determined after discussing your specific
            requirements, reviewing designs, and assessing complexity. Contact
            us for a detailed consultation and accurate quote.
          </p>
        </div>
      </div>
    </div>
  );
}
