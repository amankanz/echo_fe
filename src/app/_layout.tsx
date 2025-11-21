//src/app/_layout.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RouteLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />;
    </QueryClientProvider>
  );
}
