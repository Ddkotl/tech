"use client";
import { Button } from "@/shared/components";
import { AdminIcon } from "@/shared/components";
import { ROLES } from "@/entities/user/_domain/types";
import { useRole } from "@/entities/user/session";
import Link from "next/link";

export function AdminLogo() {
  const role = useRole();
  if (role !== ROLES.ADMIN) {
    return null;
  }
  return (
    <Link className="flex items-center space-x-2" href="/admin/dashboard">
      <Button variant="ghost" size="icon">
        <AdminIcon className="h-5 w-5" />
      </Button>
    </Link>
  );
}
