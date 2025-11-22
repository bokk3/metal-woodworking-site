"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitContactForm } from "@/app/actions/contact";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  Upload,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [budget, setBudget] = useState([5000]);
  const [preferredContact, setPreferredContact] = useState("email");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Client-side Validation
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Naam is verplicht";
    if (!email.trim()) {
      errors.email = "E-mail is verplicht";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Ongeldig e-mailformaat";
    }
    if (!message.trim()) {
      errors.message = "Bericht is verplicht";
    } else if (message.length < 10) {
      errors.message = "Bericht moet minimaal 10 tekens bevatten";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSuccess(true);
        // Reset form
        event.currentTarget.reset();
        setBudget([5000]);
        setPreferredContact("email");
        setAppointmentDate(undefined);
        setSelectedFile(null);
      } else {
        setError(result.error || "Er is iets misgegaan");
      }
    } catch {
      setError("Bericht verzenden mislukt. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card p-8 rounded-lg border border-border/50 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Bericht Verzonden!</h3>
        <p className="text-muted-foreground mb-6">
          Bedankt voor uw bericht. We nemen zo spoedig mogelijk contact met u op.
        </p>
        <Button
          variant="outline"
          onClick={() => setSuccess(false)}
          className="border-bronze text-bronze hover:bg-bronze hover:text-white"
        >
          Nog een Bericht Versturen
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-8 rounded-lg border border-border/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Naam <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            className="bg-background border-border focus:border-bronze"
            aria-invalid={!!validationErrors.name}
          />
          {validationErrors.name && (
            <p className="text-xs text-red-500">{validationErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            E-mail <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            className="bg-background border-border focus:border-bronze"
            aria-invalid={!!validationErrors.email}
          />
          {validationErrors.email && (
            <p className="text-xs text-red-500">{validationErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Telefoon (Optioneel)
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="bg-background border-border focus:border-bronze"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="projectType"
            className="text-sm font-medium text-foreground"
          >
            Projecttype
          </label>
          <select
            id="projectType"
            name="projectType"
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-bronze"
          >
            <option value="custom-metalwork">Op Maat Metaalwerk</option>
            <option value="fine-woodworking">Fijn Houtwerk</option>
            <option value="welding">Lassen & Vervaardiging</option>
            <option value="design">Ontwerpadvies</option>
            <option value="other">Anders</option>
          </select>
        </div>
      </div>

      {/* Budget Range Slider */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">
          Project Budget Bereik: ${budget[0].toLocaleString()}+
        </label>
        <Slider
          value={budget}
          onValueChange={setBudget}
          max={50000}
          min={1000}
          step={1000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$1,000</span>
          <span>$50,000+</span>
        </div>
        <input type="hidden" name="budget" value={budget[0]} />
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Voorkeur Contactmethode
        </label>
        <RadioGroup
          value={preferredContact}
          onValueChange={setPreferredContact}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email-contact" />
              <Label htmlFor="email-contact">E-mail</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone-contact" />
              <Label htmlFor="phone-contact">Telefoon</Label>
            </div>
          </div>
        </RadioGroup>
        <input type="hidden" name="preferredContact" value={preferredContact} />
      </div>

      {/* Appointment Date Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Voorkeur Afspraakdatum (Optioneel)
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-background",
                !appointmentDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {appointmentDate ? format(appointmentDate, "PPP") : "Kies een datum"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={appointmentDate}
              onSelect={setAppointmentDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        {appointmentDate && (
          <input
            type="hidden"
            name="appointmentDate"
            value={appointmentDate.toISOString()}
          />
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Referentiebeelden (Optioneel)
        </label>
        <label
          htmlFor="fileUpload"
          className="block border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-bronze/50 transition-colors cursor-pointer"
        >
          {selectedFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-bronze" />
                <span className="text-sm text-foreground">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  removeFile();
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Klik om te uploaden of sleep en zet neer
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG tot 10MB
              </p>
            </>
          )}
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Bericht <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Vertel ons over uw project..."
          className="min-h-[120px] bg-background border-border focus:border-bronze"
          aria-invalid={!!validationErrors.message}
        />
        {validationErrors.message && (
          <p className="text-xs text-red-500">{validationErrors.message}</p>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-md">
          <AlertCircle className="w-4 h-4" />
          <p>{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-bronze hover:bg-bronze-dark text-white font-semibold h-12 text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verzenden...
          </>
        ) : (
          "Bericht Versturen"
        )}
      </Button>
    </form>
  );
}
