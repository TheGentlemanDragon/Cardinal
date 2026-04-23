import { QueryClient } from "@tanstack/react-query";
import type * as z from "zod/v4";
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

export function parseItems<Schema extends z.ZodType>(schema: Schema) {
  return <List extends { items: unknown[] }>(
    data: List
  ): Omit<List, "items"> & { items: z.infer<Schema>[] } => ({
    ...data,
    items: data.items.map((item) => schema.parse(item)),
  });
}
