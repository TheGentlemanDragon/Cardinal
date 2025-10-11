import { TEXT_SHADOW_CLS, userInitials, user } from "$lib";

export const Navbar = () => {
  if (!user.value?.id) {
    return null;
  }

  return (
    <header class="pointer-events-none">
      <nav class="navbar pr-6 justify-between">
        <a
          class={`btn btn-ghost text-lg font-bold pointer-events-auto ${TEXT_SHADOW_CLS}`}
        >
          Cardinal
        </a>

        <div class="avatar avatar-placeholder pointer-events-auto">
          <div class="bg-neutral-content text-neutral rounded-full w-8">
            <span class="text-xs font-bold">{userInitials(user.value)}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
