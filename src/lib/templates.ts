import { useQuery } from "@tanstack/react-query";
import * as z from "zod/v4";

import { PbList, ignore404, pb, queryClient } from "./db";
import { userSignal } from "./user";

const TEMPLATES = pb.collection("cardinal_templates");
const queryKey = ["templates"];

const templateSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  project: z.string(),
  updated: z.coerce.date(),
});

export type Template = z.infer<typeof templateSchema>;

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
    enabled: projectId != undefined,
    queryFn: ignore404(() =>
      TEMPLATES.getList(1, 20, { filter: `project.id="${projectId}"` })
    ),
    queryKey,
    select: (data) => ({
      ...data,
      items: data.items.map((item) => templateSchema.parse(item)),
    }),
  });
