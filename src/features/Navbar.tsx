import { TEXT_SHADOW_CLS, userInitials, userSignal } from "$lib";

export const Navbar = () => {
  const user = userSignal.value;

  if (!user?.id) {
    return null;
  }

  return (
    <header>
      <nav class="navbar pr-6 justify-between">
        <a class={`btn btn-ghost text-lg font-bold ${TEXT_SHADOW_CLS}`}>
          Cardinal
        </a>

        <div class="avatar placeholder">
          <div class="bg-neutral-content text-neutral rounded-full w-8">
            <span class="text-xs font-bold">{userInitials(user)}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
