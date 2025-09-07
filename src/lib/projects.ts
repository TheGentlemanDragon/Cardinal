import { Collections } from "./db";
import { invalidate } from "./queries";
import { user } from "./signals";

export const createProject = async (name: string) => {
  await Collections.Projects.create({
    name,
    owner: user.value?.id,
  });
  invalidate("projects");
};
