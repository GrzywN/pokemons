import { QueryClient } from "@tanstack/react-query";

const SECOND_IN_MS = 1000 as const;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;

const STALE_TIME_IN_MINUTES = 5 as const;
const CACHE_TIME_IN_MINUTES = 10 as const;
const RETRY_COUNT = 2 as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_IN_MINUTES * MINUTE_IN_MS,
      gcTime: CACHE_TIME_IN_MINUTES * MINUTE_IN_MS,
      retry: RETRY_COUNT,
      refetchOnWindowFocus: false,
    },
  },
});

