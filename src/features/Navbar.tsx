import { TEXT_SHADOW_CLS, userInitials, user } from "$lib";

export const Navbar = () => {
  if (!user.value?.id) {
    return null;
  }

  return (
    <header>
      <nav class="navbar pr-6 justify-between">
        <a class={`btn btn-ghost text-lg font-bold ${TEXT_SHADOW_CLS}`}>
          Cardinal
        </a>

        <div class="avatar avatar-placeholder">
          <div class="bg-neutral-content text-neutral rounded-full w-8">
            <span class="text-xs font-bold">{userInitials(user.value)}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
