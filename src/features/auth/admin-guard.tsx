"use client";

import { FullPageSpinner } from "@/shared/components";
import { ROLES } from "@/entities/user/_domain/types";
import { useAppSession } from "@/entities/user/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const session = useAppSession();
  const router = useRouter();
  const isAdmin = session.data?.user.role === ROLES.ADMIN;
  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (!isAdmin || isUnauthenticated) {
      toast("Не взламывайте меня, пожалуйста", {
        description: "Спасибо 🥺",
      });
      router.replace("/", { scroll: false });
    }
  }, [isAdmin, isUnauthenticated, router]);

  const isLoading = session.status === "loading";

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />

      {session.status === "authenticated" && session.data?.user.role === ROLES.ADMIN && children}
    </>
  );
}
