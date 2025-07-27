import { useQuery } from "@tanstack/react-query";
import * as z from "zod/v4";

import { ignore404, pb, PbList, queryClient } from "./db";
import { userSignal } from "./user";

const PROJECTS = pb.collection("cardinal_projects");
const queryKey = ["projects"];

const projectSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  updated: z.coerce.date(),
});

export type Project = z.infer<typeof projectSchema>;

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
