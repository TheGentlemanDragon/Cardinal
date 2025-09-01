import { useQuery } from "@tanstack/react-query";

import { PbList, ignore404, pb, queryClient } from "./db";
import { userSignal } from "./user";
import { type Card, cardSchema } from "./types";

const CARDS = pb.collection("cardinal_cards");
const queryKey = ["cards"];

export const createCard = async (name: string, templateId: string) => {
  await CARDS.create({
    name,
    owner: userSignal.value?.id,
    template: templateId,
  });
  queryClient.invalidateQueries({ queryKey });
};

export const useCardsList = (templateId?: string) =>
  useQuery<PbList<Card>>({
    enabled: templateId !== undefined,
    queryFn: ignore404(() =>
      CARDS.getList(1, 20, { filter: `template.id="${templateId}"` })
    ),
    queryKey,
    select: (data) => ({
      ...data,
      items: data.items.map((item) => cardSchema.parse(item)),
    }),
  });
