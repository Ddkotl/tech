"use client";

import { FullPageSpinner } from "@/shared/components";
import { useAppSession } from "@/entities/user/session";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
