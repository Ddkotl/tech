"use client";

import { FullPageSpinner } from "@/shared/components/ui";
import { useAppSession } from "@/entities/user/session";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignInGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession();
  const router = useRouter();
  const isAuthenticated = session.status === "authenticated";

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/", { scroll: false });
      toast("Вы успешно вошли в свой профиль");
    }
  }, [isAuthenticated, router]);

  const isLoading =
    session.status === "loading" || session.status === "authenticated";

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />

      {session.status === "unauthenticated" && children}
    </>
  );
}
