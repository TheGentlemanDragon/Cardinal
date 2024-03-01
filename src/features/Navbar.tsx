import { useLayoutEffect } from "preact/hooks";
import { cacheAuth, userInitials, userSignal } from "../lib/user";

export const Navbar = () => {
  const user = userSignal.value;

  useLayoutEffect(() => {
    cacheAuth();
  }, []);

  if (!user?.id) {
    return null;
  }

  return (
    <header>
      <nav class="navbar pr-6 justify-between">
        <a class="btn btn-ghost text-lg font-bold">Cardinal</a>

        <div class="avatar placeholder">
          <div class="bg-neutral-content text-neutral rounded-full w-8">
            <span class="text-xs font-bold">{userInitials(user)}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
