import SignInGuard from "@/features/auth/sign-in-guard";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {" "}
      <SignInGuard>{children}</SignInGuard>
    </>
  );
}
