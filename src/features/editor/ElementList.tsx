import {
  cls,
  element,
  elements,
  MENU_CLS,
  setElement,
  type Element,
} from "$lib";
import { Group, Image, Type } from "lucide-preact";

export const MENU_ICON_MAP = {
  text: <Type size={16} />,
  image: <Image size={16} />,
  group: <Group size={16} />,
};

export const ElementList = () => {
  return (
    <ul class={MENU_CLS}>
      <li class="p-2">Elements</li>
      {elements.value.map((item: Element) => (
        <li key={item.id}>
          <a
            class={cls(element.value?.id === item.id && "menu-active")}
            onClick={() => setElement(item)}
          >
            {MENU_ICON_MAP[item.type]} {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
