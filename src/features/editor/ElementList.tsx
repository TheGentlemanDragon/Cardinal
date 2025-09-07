import {
  cls,
  Element,
  element,
  MENU_CLS,
  setElement,
  useCurrentTemplate,
} from "$lib";
import { Group, Image, Type } from "lucide-preact";

export const MENU_ICON_MAP = {
  text: <Type size={16} />,
  image: <Image size={16} />,
  group: <Group size={16} />,
};

export const ElementList = () => {
  const { data: template, isSuccess } = useCurrentTemplate();

  const elements = isSuccess ? template.elements : [];

  return (
    <ul class={MENU_CLS}>
      <li class="p-2">Elements</li>
      {isSuccess &&
        elements.map((item: Element) => (
          <li key={item.id}>
            <a
              class={cls(element.value === item && "menu-active")}
              onClick={() => setElement(item)}
            >
              {MENU_ICON_MAP[item.type]} {item.name}
            </a>
          </li>
        ))}
    </ul>
  );
};
