import { Button } from "@/components/ui";
import { AdminIcon } from "@/components/ui";
import Link from "next/link";

export function AdminLogo() {
  return (
    <Link className="flex items-center space-x-2" href="/admin/dashboard">
      <Button variant="ghost" size="icon">
        <AdminIcon className="h-5 w-5" />
      </Button>
    </Link>
  );
}
