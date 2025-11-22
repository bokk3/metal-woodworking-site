"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAdminPasswordHash, setAdminPasswordHash } from "@/lib/db";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

// Initialize admin password from env if not exists
export async function initializeAdminPassword() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.warn("ADMIN_PASSWORD not set in environment variables");
    return;
  }

  const existingHash = getAdminPasswordHash();
  
  // Only set if no password exists yet
  if (!existingHash) {
    const hash = await bcrypt.hash(adminPassword, 10);
    setAdminPasswordHash(hash);
    console.log("Admin password initialized from environment");
  }
}

export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Initialize password from env if needed
    await initializeAdminPassword();

    const storedHash = getAdminPasswordHash();
    
    if (!storedHash) {
      return { success: false, error: "Admin account not configured" };
    }

    const isValid = await bcrypt.compare(password, storedHash);
    
    if (!isValid) {
      return { success: false, error: "Ongeldig wachtwoord" };
    }

    // Create session
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Er is een fout opgetreden" };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    return session?.value === "authenticated";
  } catch {
    return false;
  }
}

