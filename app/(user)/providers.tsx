"use client";

// let's import all of the providers here
import { ThemeProvider } from "contexts/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
