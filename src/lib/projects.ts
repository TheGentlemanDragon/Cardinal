import { useQuery } from "@tanstack/react-query";
import { PbList, pb, queryClient } from "./db";
import { userSignal } from "./user";

const PROJECTS = pb.collection("cardinal_projects");
const queryKey = ["projects"];

export type Project = {
  collectionId: string;
  collectionName: string;
  created: Date;
  id: string;
  name: string;
  owner: string;
  updated: Date;
};

export const create = (name: string) => {
  PROJECTS.create({
    name,
    owner: userSignal.value?.id,
  });
  queryClient.invalidateQueries({ queryKey });
};

export const useProjectsList = () =>
  useQuery<PbList<Project>>({
    queryKey,
    queryFn: () => PROJECTS.getList(1, 20),
    select: (data) => ({
      ...data,
      items: data.items.map((item) => ({
        ...item,
        created: new Date(item.created),
        updated: new Date(item.updated),
      })),
    }),
  });
