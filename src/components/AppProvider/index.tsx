"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterGuard from "../RouterGuard";
import { AuthProvider } from "@/contexts/auth";

const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterGuard>
        <AuthProvider>{children}</AuthProvider>
      </RouterGuard>
    </QueryClientProvider>
  );
}
