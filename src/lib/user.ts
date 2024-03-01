import { signal } from "@preact/signals-core";
import { z } from "zod";

const UsersAuth = z.object({
  avatar: z.string(),
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.coerce.date(),
  email: z.string(),
  emailVisibility: z.boolean(),
  id: z.string(),
  name: z.string(),
  updated: z.coerce.date(),
  username: z.string(),
  verified: z.boolean(),
});

type UsersAuth = z.infer<typeof UsersAuth>;

export const userSignal = signal<UsersAuth | null>(null);

export const cacheAuth = () => {
  try {
    const pocketbaseAuth = JSON.parse(localStorage.getItem("pocketbase_auth") || '""');
    userSignal.value = UsersAuth.parse(pocketbaseAuth?.model);
  } catch (error) {
    console.error({ error })
  }
};

export const userInitials = (user: UsersAuth) => (user.name || user.email)[0].toUpperCase()