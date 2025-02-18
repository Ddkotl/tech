import { AppFooter } from "@/widgets/app-footer/app-footer";
import { AppHeader } from "@/widgets/app-header/app-header";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {" "}
      <AppHeader variant="public" />
      <main className="flex flex-auto flex-col p-2 h-full">{children}</main>
      <AppFooter />
    </div>
  );
}
