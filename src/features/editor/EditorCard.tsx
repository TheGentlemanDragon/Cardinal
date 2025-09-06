import { cls, element, useCurrentTemplate } from "$lib";
import { createElement } from "preact";
import { cardScale } from "./ScaleSlider";

const DOTTED_OUTLINE = "outline outline-dashed outline-1";

/** EditorCard Card */
export const EditorCard = () => {
  const { data: template, isSuccess } = useCurrentTemplate();

  return (
    <div
      class="bg-white shadow-lg h-[3.5in] aspect-25/35 out z-0"
      id="EditorCard"
      style={{ transform: `scale(${cardScale.value / 10})` }}
    >
      {isSuccess &&
        template.elements.map((item) =>
          createElement(
            item.type,
            {
              ...item.props,
              class: cls(
                DOTTED_OUTLINE,
                item.id === element.value?.id
                  ? "outline-orange-500 animate-pulse duration-100 z-50"
                  : "outline-blue-500 z-10"
              ),
            },
            item.children
          )
        )}
    </div>
  );
};
