import { user } from "./signals";
import { type UsersAuth } from "./types";

// Check for existing user session
try {
  const pocketbaseAuth = JSON.parse(
    localStorage.getItem("pocketbase_auth") || '""'
  );
  user.value = pocketbaseAuth?.model as UsersAuth;
} catch (error) {
  console.error({ error });
}

export function userInitials(user: UsersAuth) {
  return (user.name ?? user.email)
    .split(" ")
    .map((item) => item[0].toUpperCase())
    .join("");
}
