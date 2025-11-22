"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-bronze hover:bg-bronze-dark text-white"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="border-bronze text-bronze hover:bg-bronze hover:text-white"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
