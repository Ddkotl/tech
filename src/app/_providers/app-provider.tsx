"use client";
import { AppSessionProvider } from "@/entities/user/session";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/shared/components";
import { queryClient } from "@/shared/lib/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../store";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <AppSessionProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </Provider>
        </AppSessionProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}
