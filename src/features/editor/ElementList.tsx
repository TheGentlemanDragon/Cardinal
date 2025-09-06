import { cls, MENU_CLS, useCurrentElements } from "$lib";
import { Group, Image, Type } from "lucide-preact";

export const MENU_ICON_MAP = {
  text: <Type size={16} />,
  image: <Image size={16} />,
  group: <Group size={16} />,
};

export const ElementList = () => {
  const { data: elements, isSuccess } = useCurrentElements();

  return (
    <ul class={MENU_CLS}>
      <li class="p-2">Elements</li>
      {isSuccess &&
        elements.map((item) => (
          <li>
            <a class={cls()}>
              {MENU_ICON_MAP[item.type]} {item.name}
            </a>
          </li>
        ))}
    </ul>
  );
};
