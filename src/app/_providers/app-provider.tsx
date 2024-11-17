"use client";
import { AppSessionProvider } from "@/entities/user/session";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/shared/components";

import { queryClient } from "@/shared/lib/api/query-client";
import { ComposeChildren } from "@/shared/lib/react";
import { QueryClientProvider } from "@tanstack/react-query";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ComposeChildren>
        <ThemeProvider />
        <AppSessionProvider />
        <QueryClientProvider client={queryClient} />
        {children}
      </ComposeChildren>
      <Toaster />
    </>
  );
}
