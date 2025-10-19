import PocketBase, { ClientResponseError } from "pocketbase";

export const MAX_RETRIES = 3;
export const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];
export const HTTP_STATUS_TO_IGNORE = 404;

export const pb = new PocketBase(import.meta.env.VITE_DB_URL);

export const Collections = {
  Cards: pb.collection("cardinal_cards"),
  Projects: pb.collection("cardinal_projects"),
  Templates: pb.collection("cardinal_templates"),
  Users: pb.collection("users"),
};

/** Execute the given error swallowing any 404s thrown */
export function ignore404<T>(fn: () => Promise<T>) {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      if (isPbError(error) && isIgnorable(error)) {
        return await ({ items: [] } as T);
      }
      throw error;
    }
  };
}

/** Returns true if the given error was HTTP 404 error */
export function isEmptyError(error: Error) {
  if (!error) {
    return false;
  }

  if (isPbError(error)) {
    return HTTP_STATUS_TO_NOT_RETRY.includes(error.response.code);
  }

  return false;
}

export function isIgnorable(error: ClientResponseError) {
  return error.response.code === HTTP_STATUS_TO_IGNORE;
}

/** Return true if the given error is a PocketBase request error */
export function isPbError(error: Error): error is ClientResponseError {
  const { url, status } = error as ClientResponseError;
  return typeof url === "string" && typeof status === "number";
}
