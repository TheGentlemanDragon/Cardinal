import { useQuery } from "@tanstack/react-query";
import { PbList, ignore404, pb, queryClient } from "./db";
import { userSignal } from "./user";

const TEMPLATES = pb.collection("cardinal_templates");
const queryKey = ["templates"];

export type Template = {
  collectionId: string;
  collectionName: string;
  created: Date;
  id: string;
  name: string;
  owner: string;
  project: string;
  updated: Date;
};

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
      items: data.items.map((item) => ({
        ...item,
        created: new Date(item.created),
        updated: new Date(item.updated),
      })),
    }),
  });
