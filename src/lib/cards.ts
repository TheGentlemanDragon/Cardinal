import { Collections } from "./db";
import { invalidate } from "./queries";
import { user } from "./signals";

export const createCard = async (name: string, templateId: string) => {
  await Collections.Cards.create({
    name,
    owner: user.value?.id,
    template: templateId,
  });
  invalidate("cards");
};
