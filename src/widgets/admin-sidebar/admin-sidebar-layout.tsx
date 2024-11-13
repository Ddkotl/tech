import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui";
import { AdminSidebar } from "./_ui/admin-sidebar";
import { cookies } from "next/headers";

export async function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
