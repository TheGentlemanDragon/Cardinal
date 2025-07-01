import { MenuIcon, TrashIcon } from "$icons";
import { CARD_CLS, cls, MENU_BUTTON_CLS, Template, timeSince } from "$lib";

type Props = {
  template: Template;
};

export const TemplateCard = ({ template }: Props) => {
  return (
    <div class="relative group">
      <a class="link" href={`/editor/${template.id}`}>
        <article
          class={
            CARD_CLS +
            ` w-[172] aspect-[25/35] 
            border-[#1565c0] border-2 border-dashed`
          }
        >
          {/* Card image */}
          <figure
            class="h-36 bg-base-300 bg-gradient-to-br from-base-300 to-base-200 overflow-hidden"
            style="background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px;"
          >
            <img
              src={`https://picsum.photos/seed/${template.id}/160/155`}
              alt={`${template.name}`}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          {/* Card body */}
          <div class="card-body gap-0">
            <h2 class="card-title text-base group-hover:underline">
              {template.name}
            </h2>
            <p class="text-xs">{timeSince(template.created)}</p>
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
          <MenuIcon />
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
              <TrashIcon cls="h-4 w-5" />
              <span>Delete</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
