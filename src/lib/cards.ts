import { useQuery } from "@tanstack/react-query";
import { Collections, ignore404 } from "./db";
import { getQueryKey, parseItems, queryClient } from "./queries";
import { user } from "./signals";
import { type PbList, type Card, cardSchema } from "./types";

export const invalidateCards = () =>
  queryClient.invalidateQueries({ queryKey: ["cards"] });

export async function createCard(name: string, templateId: string) {
  await Collections.Cards.create({
    name,
    owner: user.value?.id,
    template: templateId,
  });
  invalidateCards();
}

export function getCards(templateId: string) {
  return ignore404(
    (): Promise<PbList<Card>> =>
      Collections.Cards.getList(1, 20, {
        filter: `template.id="${templateId}"`,
      })
  );
}

export function useCardsList(templateId?: string) {
  return useQuery<PbList<Card>>({
    enabled: templateId !== undefined,
    queryFn: getCards(templateId),
    queryKey: getQueryKey("cards"),
    select: parseItems(cardSchema),
  });
}
