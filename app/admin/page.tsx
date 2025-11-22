"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Mail, Phone, Calendar, MessageSquare, DollarSign, Package, LogOut } from "lucide-react";
import { format } from "date-fns";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: number;
  preferredContact?: string;
  appointmentDate?: string;
  message: string;
  createdAt: string;
}

interface QuoteSubmission {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  projectType: string;
  material: string;
  length: number;
  width: number;
  quantity: number;
  estimatedPrice: number;
  priceMin?: number;
  priceMax?: number;
  notes?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [quoteSubmissions, setQuoteSubmissions] = useState<QuoteSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions");
      if (response.ok) {
        const data = await response.json();
        setContactSubmissions(data.contacts || []);
        setQuoteSubmissions(data.quotes || []);
      }
    } catch (error) {
      console.error("Error loading submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return "";
            // Escape quotes and wrap in quotes if contains comma
            const stringValue = String(value);
            if (stringValue.includes(",") || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm");
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bronze mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Bekijk en beheer contactformulier en offerte inzendingen
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-bronze text-bronze hover:bg-bronze hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Uitloggen
          </Button>
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="contacts">
              Contact Formulieren ({contactSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="quotes">
              Offertes ({quoteSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">Contact Inzendingen</h2>
              <Button
                onClick={() => exportToCSV(contactSubmissions, `contact-submissions-${Date.now()}.csv`)}
                variant="outline"
                disabled={contactSubmissions.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Exporteer naar CSV
              </Button>
            </div>

            {contactSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Geen contact inzendingen gevonden.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {contactSubmissions.map((submission) => (
                  <Card key={submission.id} className="hover:border-bronze/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{submission.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(submission.createdAt)}
                          </p>
                        </div>
                        {submission.projectType && (
                          <span className="px-3 py-1 bg-bronze/10 text-bronze text-sm font-semibold rounded-full">
                            {submission.projectType}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-bronze" />
                          <a
                            href={`mailto:${submission.email}`}
                            className="text-foreground hover:text-bronze transition-colors"
                          >
                            {submission.email}
                          </a>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-bronze" />
                            <a
                              href={`tel:${submission.phone}`}
                              className="text-foreground hover:text-bronze transition-colors"
                            >
                              {submission.phone}
                            </a>
                          </div>
                        )}
                        {submission.budget && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-bronze" />
                            <span className="text-foreground">
                              Budget: {formatCurrency(submission.budget)}
                            </span>
                          </div>
                        )}
                        {submission.preferredContact && (
                          <div className="flex items-center gap-2 text-sm">
                            <MessageSquare className="h-4 w-4 text-bronze" />
                            <span className="text-foreground">
                              Voorkeur: {submission.preferredContact === "email" ? "E-mail" : "Telefoon"}
                            </span>
                          </div>
                        )}
                        {submission.appointmentDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-bronze" />
                            <span className="text-foreground">
                              Afspraak: {formatDate(submission.appointmentDate)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-sm font-medium text-foreground mb-2">Bericht:</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {submission.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">Offerte Inzendingen</h2>
              <Button
                onClick={() => exportToCSV(quoteSubmissions, `quote-submissions-${Date.now()}.csv`)}
                variant="outline"
                disabled={quoteSubmissions.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Exporteer naar CSV
              </Button>
            </div>

            {quoteSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Geen offerte inzendingen gevonden.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {quoteSubmissions.map((submission) => (
                  <Card key={submission.id} className="hover:border-bronze/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">
                            {submission.name || "Anoniem"}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(submission.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-bronze">
                            {formatCurrency(submission.estimatedPrice)}
                          </p>
                          {submission.priceMin && submission.priceMax && (
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(submission.priceMin)} - {formatCurrency(submission.priceMax)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="h-4 w-4 text-bronze" />
                          <span className="text-foreground">
                            <strong>Project:</strong> {submission.projectType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="h-4 w-4 text-bronze" />
                          <span className="text-foreground">
                            <strong>Materiaal:</strong> {submission.material}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground">
                            <strong>Afmetingen:</strong> {submission.length}" × {submission.width}"
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-foreground">
                            <strong>Aantal:</strong> {submission.quantity}
                          </span>
                        </div>
                        {submission.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-bronze" />
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-foreground hover:text-bronze transition-colors"
                            >
                              {submission.email}
                            </a>
                          </div>
                        )}
                        {submission.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-bronze" />
                            <a
                              href={`tel:${submission.phone}`}
                              className="text-foreground hover:text-bronze transition-colors"
                            >
                              {submission.phone}
                            </a>
                          </div>
                        )}
                      </div>
                      {submission.notes && (
                        <div className="pt-4 border-t border-border/50">
                          <p className="text-sm font-medium text-foreground mb-2">Opmerkingen:</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {submission.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

