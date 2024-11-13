import AdminGuard from "@/features/auth/admin-guard";
import { AdminSidebarLayout } from "@/widgets/admin-sidebar/admin-sidebar-layout";

import { AppHeader } from "@/widgets/app-header/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant="admin" />
      <AdminGuard>
        <AdminSidebarLayout>{children}</AdminSidebarLayout>
      </AdminGuard>
    </>
  );
}
