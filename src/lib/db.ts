import PocketBase, { ClientResponseError, ListResult, RecordModel } from "pocketbase";
import { QueryClient } from "@tanstack/react-query";
import { DB_URL } from "./config";

const MAX_RETRIES = 3;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];
const HTTP_STATUS_TO_IGNORE = 404;

export const pb = new PocketBase(DB_URL);

export type PbList<BaseType> = {
  items: BaseType[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

/** Execute the given error swallowing any 404s thrown */
export const ignore404 = <T>(fn: () => Promise<T>) =>
  async () => {
    try {
      return await fn();
    } catch (error) {
      if (
        isPbError(error) &&
        HTTP_STATUS_TO_IGNORE === error.response.code
      ) {
        return await ({ items: [] } as T);
      }
      throw error;
    }
  };

/** Returns true if the given error was HTTP 404 error */
export const isEmptyError = (error: Error) => {
  if (!error) {
    return false;
  }

  if (isPbError(error)) {
    return HTTP_STATUS_TO_NOT_RETRY.includes(error.response.code);
  }

  return false;
};

/** Return true if the given error is a PocketBase request error */
export const isPbError = (error: Error): error is ClientResponseError => {
  const { url, status } = error as ClientResponseError;
  return typeof url === 'string' && typeof status === 'number';
};

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
    }
  }
});

