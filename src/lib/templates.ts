import { useMutation } from "@tanstack/react-query";
import { useRoute } from "preact-iso";

import { Collections } from "./db";
import { newElementForTemplate } from "./elements";
import { invalidate, useTemplate } from "./queries";
import { user } from "./signals";
import type { Element, Template } from "./types";

const invalidateTemplates = () => invalidate("templates");

export const createTemplate = async (name: string, projectId: string) => {
  await Collections.Templates.create({
    name,
    owner: user.value?.id,
    project: projectId,
  });
  invalidateTemplates();
};

const withUpdatedElement = (template: Template, element: Element) => ({
  ...template,
  elements: template.elements.map((item) =>
    element.id === item.id ? element : item
  ),
});

export const useCurrentTemplate = () => {
  const { params } = useRoute();
  return useTemplate(params.id);
};

export const useAddToTemplate = () => {
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
};

export const useSaveElement = () => {
  const { data: template, isSuccess } = useCurrentTemplate();

  return useMutation({
    mutationFn: async (element: Element) => {
      const newTemplate = withUpdatedElement(template, element);
      return await Collections.Templates.update(template.id, newTemplate);
    },
    onSuccess: invalidateTemplates,
  });
};
