import { signal } from "@preact/signals-core";

type UsersAuth = {
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

export const userSignal = signal<UsersAuth | null>(null);

// Check for existing user session
try {
  const pocketbaseAuth = JSON.parse(
    localStorage.getItem("pocketbase_auth") || '""'
  );
  userSignal.value = pocketbaseAuth?.model as UsersAuth;
} catch (error) {
  console.error({ error });
}

export const userInitials = (user: UsersAuth) =>
  (user.name || user.email)[0].toUpperCase();
