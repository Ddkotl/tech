import { ThemeProvider } from "@/features/theme/theme-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
