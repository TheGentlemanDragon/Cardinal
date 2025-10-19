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

export const elementSchema = z.object({
  children: z.lazy(() => z.union([z.string(), elementSchema])).optional(),
  id: z.string(),
  name: z.string(),
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

export const projectSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  updated: z.coerce.date(),
});

export const templateSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  elements: z.array(elementSchema).nullable(),
  fields: z.array(z.any()).nullable(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  project: z.string(),
  updated: z.coerce.date(),
});

export type Card = z.infer<typeof cardSchema>;

export type Element = z.infer<typeof elementSchema>;

// Build a dot-path union like "a", "a.b", "c.d.e"
export type Path<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${Path<T[K]>}`
        : `${K}`;
    }[keyof T & string]
  : never;

export type PathValue<
  T,
  P extends string
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : unknown
  : P extends keyof T
  ? T[P]
  : unknown;

export type Project = z.infer<typeof projectSchema>;

export type Template = z.infer<typeof templateSchema>;

export type UploadingFile = {
  data: File;
  height: number;
  id: string;
  name: string;
  owner: string;
  width: number;
};

export type UsersAuth = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: Date;
  username: string;
  verified: boolean;
};
