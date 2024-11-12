"use client";

import { FullPageSpinner } from "@/shared/components/ui";
import { useAppSession } from "@/entities/user/session";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AuthorizedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      toast("Войдите в систему", {
        description: "Для доступа необходимо зарегистрироваться на сайте",
      });
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading =
    session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />

      {session.status === "authenticated" && children}
    </>
  );
}
