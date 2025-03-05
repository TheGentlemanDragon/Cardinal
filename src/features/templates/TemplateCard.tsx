import { MenuIcon, TrashIcon } from "$icons";
import { CARD_CLS, cls, MENU_BUTTON_CLS, Template, timeSince } from "$lib";

type Props = {
  template: Template;
};

export const TemplateCard = ({ template }: Props) => {
  return (
    <article
      class={
        CARD_CLS +
        ` w-40 h-64 aspect-[0.712] 
        border-[#1565c0] border-2 border-dashed`
      }
    >
      {/* Card image */}
      <figure>
        <img
          src={`https://picsum.photos/seed/${template.id}/160/155`}
          alt={`${template.name}`}
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
          <a class="link" href={`/projects/${template.id}`}>
            {template.name}
          </a>
        </h2>
        <p class="text-xs">{timeSince(template.created)}</p>
      </div>
    </article>
  );
};
