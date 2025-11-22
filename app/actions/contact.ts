"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const projectType = formData.get("projectType") as string;
  const message = formData.get("message") as string;

  // Basic Server-side Validation
  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Log data (in a real app, this would send an email)
  console.log("Contact Form Submission:", {
    name,
    email,
    phone,
    projectType,
    message,
  });

  return { success: true, message: "Message sent successfully!" };
}
