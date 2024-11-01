import { MenuIcon, TrashIcon } from "$icons";
import { cls, CARD_CLS, MENU_BUTTON_CLS, Project, timeSince } from "$lib";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <article class={CARD_CLS}>
      {/* Card image */}
      <figure class="max-h-32">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>

      {/* Card actions menu */}
      <div
        class="
          dropdown absolute hidden
          top-2 right-2
          group-hover:block group-focus-within:block"
      >
        <div
          class={cls(MENU_BUTTON_CLS, "btn-xs btn-square rounded-lg")}
          role="button"
          tabindex={0}
        >
          <MenuIcon />
        </div>
        <ul
          class="
            dropdown-content menu
            bg-base-200 rounded-lg
            z-[1] w-32 p-2
            shadow-md shadow-blue-950/80"
          data-theme="dark"
          tabindex={0}
        >
          <li>
            <a class="text-red-400/90 rounded-md pl-2">
              <TrashIcon cls="h-4 w-5" />
              <span>Delete</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Card body */}
      <div class="card-body gap-0">
        <h2 class="card-title text-base">
          <a class="link" href={`/projects/${project.id}`}>
            {project.name}
          </a>
        </h2>
        <p class="text-xs">{timeSince(project.created)}</p>
      </div>
    </article>
  );
};
