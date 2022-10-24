import { createTRPCReact } from "@trpc/react";
import type { AppRouter } from "@recurrink/api";
/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  return "http://localhost:3000";
  // return "https://recurr.ink";
};

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { transformer } from "@recurrink/api/transformer";
import { supabase } from "./supabase";

export const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            if (!session) {
              return {};
            } else {
              return {
                Authorization: `Bearer ${session.access_token}`,
              };
            }
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
