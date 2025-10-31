import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "preact/hooks";
import { useRoute } from "preact-iso";
import { Collections, ignore404 } from "./db";
import { newElementForTemplate } from "./elements";
import { getQueryKey, parseItems, queryClient } from "./queries";
import { elements, template, user } from "./signals";
import {
  templateSchema,
  type Element,
  type PbList,
  type Template,
} from "./types";

export const invalidateTemplates = () =>
  queryClient.invalidateQueries({ queryKey: ["templates"] });

function withoutElement(template: Template, element: Element) {
  return {
    ...template,
    elements: template.elements.filter((item) => item.id !== element.id),
  };
}

function withUpdatedElement(template: Template, element: Element) {
  return {
    ...template,
    elements: template.elements.map((item) =>
      element.id === item.id ? element : item
    ),
  };
}

export async function createTemplate(name: string, projectId: string) {
  await Collections.Templates.create({
    name,
    owner: user.value?.id,
    project: projectId,
  });
  invalidateTemplates();
}

export function getTemplate(id: string) {
  return ignore404((): Promise<Template> => Collections.Templates.getOne(id));
}

export function getTemplates(projectId: string) {
  return ignore404(
    (): Promise<PbList<Template>> =>
      Collections.Templates.getList(1, 20, {
        filter: `project.id="${projectId}"`,
      })
  );
}

export function syncTemplate(value: Template) {
  if (value !== template.value) {
    template.value = value;
  }
}

export function useAddToTemplate() {
  const { data: template, isSuccess } = useCurrentTemplate();

  return useMutation({
    mutationFn: async (type: string) => {
      if (!isSuccess) {
        return;
      }

      return await Collections.Templates.update(
        template.id,
        newElementForTemplate(type, template)
      );
    },
    onSuccess: invalidateTemplates,
  });
}

export function useCurrentTemplate() {
  const { params } = useRoute();
  const query = useTemplate(params.id);

  const { data, isSuccess } = query;

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    elements.value = data.elements;
  }, [data, isSuccess]);

  return query;
}

export function useDeleteElement() {
  const { data: template, isSuccess } = useCurrentTemplate();

  return useMutation({
    mutationFn: async (element: Element) => {
      if (!isSuccess) {
        return;
      }

      const newTemplate = withoutElement(template, element);
      elements.value = newTemplate.elements;
      return await Collections.Templates.update(template.id, newTemplate);
    },
    onSuccess: invalidateTemplates,
  });
}

export function useSaveElement() {
  const { data: template, isSuccess } = useCurrentTemplate();

  return useMutation({
    mutationFn: async (element: Element) => {
      if (!isSuccess) {
        return;
      }

      const newTemplate = withUpdatedElement(template, element);
      elements.value = newTemplate.elements;
      return await Collections.Templates.update(template.id, newTemplate);
    },
    onSuccess: invalidateTemplates,
  });
}

export function useTemplate(templateId?: string) {
  return useQuery<Template>({
    enabled: templateId !== undefined,
    queryFn: getTemplate(templateId),
    queryKey: getQueryKey("templates", { templateId }),
    select: templateSchema.parse,
  });
}

export function useTemplatesList(projectId: string) {
  return useQuery<PbList<Template>>({
    enabled: projectId !== undefined,
    queryFn: getTemplates(projectId),
    queryKey: getQueryKey("templates", { projectId }),
    select: parseItems(templateSchema),
  });
}
