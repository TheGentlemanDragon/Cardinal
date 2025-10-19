import { useQuery } from "@tanstack/react-query";
import { Collections, ignore404 } from "./db";
import { getQueryKey, invalidate, parseItems } from "./queries";
import { user } from "./signals";
import { type Project, type PbList, projectSchema } from "./types";

export async function createProject(name: string) {
  await Collections.Projects.create({
    name,
    owner: user.value?.id,
  });
  invalidate("projects");
}

export function getProject(id: string) {
  return ignore404((): Promise<Project> => Collections.Projects.getOne(id));
}

export function getProjects() {
  return ignore404(
    (): Promise<PbList<Project>> => Collections.Projects.getList(1, 20)
  );
}

export function useProject(id: string) {
  return useQuery<Project>({
    queryFn: getProject(id),
    queryKey: getQueryKey("projects", { id }),
  });
}

export function useProjectsList() {
  return useQuery<PbList<Project>>({
    queryFn: getProjects(),
    queryKey: getQueryKey("projects"),
    select: parseItems(projectSchema),
  });
}
