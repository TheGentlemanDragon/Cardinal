import { useCurrentTemplate } from "$lib";
import { createElement } from "preact";
import { cardScale } from "./ScaleSlider";

const DOTTED_OUTLINE = "outline outline-dashed outline-1 outline-blue-500";

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
        template.elements.map((element) =>
          createElement(
            element.type,
            { ...element.props, class: DOTTED_OUTLINE },
            element.children
          )
        )}
    </div>
  );
};
