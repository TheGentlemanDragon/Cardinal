import { useQuery } from "@tanstack/react-query";

import { ignore404, pb, PbList, queryClient } from "./db";
import { userSignal } from "./user";
import { type Project, projectSchema } from "./types";

const PROJECTS = pb.collection("cardinal_projects");
const queryKey = ["projects"];

export const createProject = async (name: string) => {
  await PROJECTS.create({
    name,
    owner: userSignal.value?.id,
  });
  queryClient.invalidateQueries({ queryKey });
};

export const useProjectsList = () =>
  useQuery<PbList<Project>>({
    queryKey,
    queryFn: ignore404(() => PROJECTS.getList(1, 20)),
    select: (data) => ({
      ...data,
      items: data.items.map((item) => projectSchema.parse(item)),
    }),
  });

export const useProject = (id: string) =>
  useQuery<Project>({
    queryKey,
    queryFn: ignore404(() => PROJECTS.getOne(id)),
  });
