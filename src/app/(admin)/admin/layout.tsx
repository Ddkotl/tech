import AdminGuard from "@/features/auth/admin-guard";
import AdminLayout from "@/widgets/admin-nav/admin-nav";
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminGuard>
        <AdminLayout>{children}</AdminLayout>
      </AdminGuard>
    </>
  );
}
