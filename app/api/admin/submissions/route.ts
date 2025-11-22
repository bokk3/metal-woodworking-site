import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContactSubmissions, getQuoteSubmissions } from "@/lib/db";

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return session?.value === "authenticated";
  } catch {
    return false;
  }
}

export async function GET() {
  // Check authentication
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const contacts = getContactSubmissions(1000); // Get up to 1000 submissions
    const quotes = getQuoteSubmissions(1000);

    return NextResponse.json({
      contacts,
      quotes,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

