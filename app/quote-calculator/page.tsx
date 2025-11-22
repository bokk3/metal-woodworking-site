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
            Offerte <span className="text-bronze">Calculator</span>
          </h1>
          <p
            className={cn(
              typography.bodyLarge,
              "text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Krijg een directe schatting voor uw aangepaste project. Selecteer uw opties hieronder en we berekenen een prijsbereik.
          </p>
        </div>

        {/* Quote Form */}
        <QuoteForm />

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            <strong>Opmerking:</strong> Deze calculator geeft geschatte prijzen op basis van typische projecten. Elk op maat gemaakt stuk is uniek, en de uiteindelijke prijs wordt bepaald na bespreking van uw specifieke vereisten, beoordeling van ontwerpen en beoordeling van complexiteit. Neem contact met ons op voor een gedetailleerd consult en nauwkeurige offerte.
          </p>
        </div>
      </div>
    </div>
  );
}
