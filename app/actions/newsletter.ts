"use server";

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { success: false, error: "Email is required" };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // Simulate saving to database (placeholder)
  // In a real app, you would save to your database here
  console.log("Newsletter subscription:", email);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}
