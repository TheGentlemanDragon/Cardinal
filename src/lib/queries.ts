import { useQuery } from "@tanstack/react-query";
import {
  type PbList,
  getCards,
  getProject,
  getProjects,
  getTemplate,
  getTemplates,
  queryClient,
} from "./db";
import {
  type Card,
  cardSchema,
  type Project,
  projectSchema,
  type Template,
  templateSchema,
} from "./types";

export const getQueryKey = (...keys: any) => [...keys];

export const invalidate = (...keys: any) =>
  queryClient.invalidateQueries({ queryKey: getQueryKey(keys) });

const parseItems = (schema) => (data) => ({
  ...data,
  items: data.items.map((item) => schema.parse(item)),
});

/** Cards */
export const useCardsList = (templateId?: string) =>
  useQuery<PbList<Card>>({
    enabled: templateId !== undefined,
    queryFn: getCards(templateId),
    queryKey: getQueryKey("cards"),
    select: parseItems(cardSchema),
  });

/** Projects */

export const useProject = (id: string) =>
  useQuery<Project>({
    queryFn: getProject(id),
    queryKey: getQueryKey("projects", { id }),
  });

export const useProjectsList = () =>
  useQuery<PbList<Project>>({
    queryFn: getProjects,
    queryKey: getQueryKey("projects"),
    select: parseItems(projectSchema),
  });

/** Templates */

export const useTemplate = (templateId?: string) =>
  useQuery<Template>({
    enabled: templateId !== undefined,
    queryFn: getTemplate(templateId),
    queryKey: getQueryKey("templates", { templateId }),
    select: templateSchema.parse,
  });

export const useTemplatesList = (projectId: string) =>
  useQuery<PbList<Template>>({
    enabled: projectId !== undefined,
    queryFn: getTemplates(projectId),
    queryKey: getQueryKey("templates", { projectId }),
    select: parseItems(templateSchema),
  });
