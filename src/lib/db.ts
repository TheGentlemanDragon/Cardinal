import { QueryClient } from "@tanstack/react-query";
import PocketBase, { ClientResponseError } from "pocketbase";
import { Card, Project, Template } from "./types";

export type PbList<BaseType> = {
  items: BaseType[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

const MAX_RETRIES = 3;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];
const HTTP_STATUS_TO_IGNORE = 404;

export const pb = new PocketBase(import.meta.env.VITE_DB_URL);

export const Collections = {
  Cards: pb.collection("cardinal_cards"),
  Projects: pb.collection("cardinal_projects"),
  Templates: pb.collection("cardinal_templates"),
  Users: pb.collection("users"),
};

/** Execute the given error swallowing any 404s thrown */
export const ignore404 =
  <T>(fn: () => Promise<T>) =>
  async () => {
    try {
      return await fn();
    } catch (error) {
      if (isPbError(error) && isIgnorable(error)) {
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

export const isIgnorable = (error: ClientResponseError) =>
  error.response.code === HTTP_STATUS_TO_IGNORE;

/** Return true if the given error is a PocketBase request error */
export const isPbError = (error: Error): error is ClientResponseError => {
  const { url, status } = error as ClientResponseError;
  return typeof url === "string" && typeof status === "number";
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
    },
  },
});

export const getCards = (templateId: string) =>
  ignore404(
    (): Promise<PbList<Card>> =>
      Collections.Cards.getList(1, 20, {
        filter: `template.id="${templateId}"`,
      })
  );

export const getProject = (id: string) =>
  ignore404((): Promise<Project> => Collections.Projects.getOne(id));

export const getProjects = ignore404(
  (): Promise<PbList<Project>> => Collections.Projects.getList(1, 20)
);

export const getTemplate = (id: string) =>
  ignore404((): Promise<Template> => Collections.Templates.getOne(id));

export const getTemplates = (projectId: string) =>
  ignore404(
    (): Promise<PbList<Template>> =>
      Collections.Templates.getList(1, 20, {
        filter: `project.id="${projectId}"`,
      })
  );
