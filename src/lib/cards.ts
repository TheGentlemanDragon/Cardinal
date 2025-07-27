import { useQuery } from "@tanstack/react-query";
import * as z from "zod/v4";

import { PbList, ignore404, pb, queryClient } from "./db";
import { userSignal } from "./user";

const CARDS = pb.collection("cardinal_cards");
const queryKey = ["cards"];

const cardSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  data: z.object(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  template: z.string(),
  updated: z.coerce.date(),
});

export type Card = z.infer<typeof cardSchema>;

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
    enabled: templateId != undefined,
    queryFn: ignore404(() =>
      CARDS.getList(1, 20, { filter: `template.id="${templateId}"` })
    ),
    queryKey,
    select: (data) => ({
      ...data,
      items: data.items.map((item) => cardSchema.parse(item)),
    }),
  });
