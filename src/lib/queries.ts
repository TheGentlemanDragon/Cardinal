import { QueryClient } from "@tanstack/react-query";
import { HTTP_STATUS_TO_NOT_RETRY, MAX_RETRIES, isPbError } from "./db";

/** Default query client for React Query */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false;
        }

        if (
          isPbError(error) &&
          HTTP_STATUS_TO_NOT_RETRY.includes(error.response.code)
        ) {
          console.log(`Aborting retry due to ${error.response.code} status`);
          return false;
        }

        return true;
      },
    },
  },
});

export function getQueryKey(...keys: any) {
  return [...keys];
}

export function invalidate(...keys: any) {
  return queryClient.invalidateQueries({ queryKey: getQueryKey(keys) });
}

export function parseItems(schema) {
  return (data) => ({
    ...data,
    items: data.items.map((item) => schema.parse(item)),
  });
}
