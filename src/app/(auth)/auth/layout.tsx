import { AppHeader } from "@/widgets/app-header/app-header";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {" "}
      <AppHeader />
      {children}
    </>
  );
}
