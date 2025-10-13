import {
  cls,
  element,
  elements,
  MENU_CLS,
  setElement,
  type Element,
} from "$lib";
import { Group, Image, Trash, Type } from "lucide-preact";

export const MENU_ICON_MAP = {
  text: <Type size={16} />,
  image: <Image size={16} />,
  group: <Group size={16} />,
};

export const ElementList = () => {
  return (
    <ul class={MENU_CLS}>
      <div class="flex items-center justify-between pl-2 mb-2">
        <span>Elements</span>

        {/* TODO: Implement delete element */}
        <button
          className="btn btn-ghost btn-primary btn-square"
          disabled={!element.value}
        >
          <Trash size={16} />
        </button>
      </div>

      {elements.value.map((item: Element) => (
        <li key={item.id}>
          <a
            class={cls(element.value?.id === item.id && "bg-primary")}
            onClick={() => setElement(item)}
          >
            {MENU_ICON_MAP[item.type]} {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
