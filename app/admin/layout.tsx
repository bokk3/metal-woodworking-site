import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isAuthenticated } from "@/app/actions/auth";
import { initializeAdminPassword } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize admin password from env on first access
  await initializeAdminPassword();

  // Get the current path to check if we're on login page
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/admin/login";

  // Only check authentication if not on login page
  if (!isLoginPage) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      redirect("/admin/login");
    }
  }

  return <>{children}</>;
}

