"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ClientQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ClientQueryProvider;
