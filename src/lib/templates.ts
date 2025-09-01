import { useMutation, useQuery } from "@tanstack/react-query";

import { PbList, ignore404, pb, queryClient } from "./db";
import { userSignal } from "./user";
import { useRoute } from "preact-iso";
import { type Template, templateSchema } from "./types";
import { newElementForTemplate } from "./element";

const TEMPLATES = pb.collection("cardinal_templates");
const queryKey = ["templates"];

export const createTemplate = async (name: string, projectId: string) => {
  await TEMPLATES.create({
    name,
    owner: userSignal.value?.id,
    project: projectId,
  });
  queryClient.invalidateQueries({ queryKey });
};

export const useTemplatesList = (projectId?: string) =>
  useQuery<PbList<Template>>({
    enabled: projectId !== undefined,
    queryFn: ignore404(() =>
      TEMPLATES.getList(1, 20, { filter: `project.id="${projectId}"` })
    ),
    queryKey,
    select: (data) => ({
      ...data,
      items: data.items.map((item) => templateSchema.parse(item)),
    }),
  });

export const useTemplate = (templateId?: string) =>
  useQuery<Template>({
    enabled: templateId !== undefined,
    queryFn: ignore404(() => TEMPLATES.getOne(templateId)),
    queryKey,
    select: (data) => templateSchema.parse(data),
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

      return await TEMPLATES.update(
        template.id,
        newElementForTemplate(type, template)
      );
    },
  });
};
