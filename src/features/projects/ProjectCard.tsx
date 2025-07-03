import { cls, CARD_CLS, MENU_BUTTON_CLS, Project, timeSince } from "$lib";
import { Ellipsis, Trash } from "lucide-preact";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <div class="relative group">
      <a class="link" href={`/projects/${project.id}`}>
        <article class={CARD_CLS}>
          {/* Card image */}
          <figure
            class="h-32 bg-base-300 overflow-hidden bg-gradient-to-br from-base-300 to-base-200"
            style="background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px;"
          >
            <img
              src={`https://picsum.photos/seed/${project.id}/928/548`}
              alt={`${project.name}`}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          {/* Card body */}
          <div class="card-body gap-0">
            <h2 class="card-title text-base group-hover:underline">
              {project.name}
            </h2>
            <p class="text-xs">{timeSince(project.created)}</p>
          </div>
        </article>
      </a>

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
          <Ellipsis />
        </div>
        <ul
          class="
            dropdown-content menu
            bg-base-200 rounded-lg
            z-1 w-32 p-2
            shadow-md shadow-blue-950/80"
          data-theme="dark"
          tabindex={0}
        >
          <li>
            <a class="text-red-400/90 rounded-md pl-2">
              <Trash />
              <span>Delete</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
