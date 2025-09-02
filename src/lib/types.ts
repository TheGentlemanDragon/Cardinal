import * as z from "zod/v4";

export const cardSchema = z.object({
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

export const projectSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  updated: z.coerce.date(),
});

export type Project = z.infer<typeof projectSchema>;

export const elementSchema = z.object({
  children: z.lazy(() => z.union([z.string(), elementSchema])).optional(),
  props: z.object({
    style: z
      .object({
        height: z.string().optional(),
        left: z.string().optional(),
        position: z.string().optional(),
        top: z.string().optional(),
        width: z.string().optional(),
      })
      .optional(),
  }),
  type: z.string(),
});

export const templateSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  data: z
    .object({
      elements: z.array(elementSchema).optional(),
      fields: z.array(z.any()).optional(),
    })
    .optional(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  project: z.string(),
  updated: z.coerce.date(),
});

export type Template = z.infer<typeof templateSchema>;
