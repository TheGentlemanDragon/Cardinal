import { useQuery } from "@tanstack/react-query";
import { PbList, ignore404, pb, queryClient } from "./db";

const TEMPLATES = pb.collection("c_templates");
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

export const useTemplates = () =>
  useQuery<PbList<Template>>({
    queryKey,
    queryFn: ignore404(() => TEMPLATES.getList(1, 20)),
    select: (data) => ({
      ...data,
      items: data.items.map((item) => ({
        ...item,
        created: new Date(item.created),
        updated: new Date(item.updated),
      })),
    }),
  });
