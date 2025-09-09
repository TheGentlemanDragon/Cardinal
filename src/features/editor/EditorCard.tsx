import { element, elements, getElement } from "$lib";
import { cardScale } from "./ScaleSlider";

/** EditorCard Card */
export const EditorCard = () => {
  return (
    <div
      class="bg-white shadow-lg h-[3.5in] aspect-25/35 out z-0"
      id="EditorCard"
      style={{ transform: `scale(${cardScale.value / 10})` }}
    >
      {/* Selected element */}
      {element.value && getElement(element.value)}

      {elements.value
        .filter((item) => item.id !== element.value?.id)
        .map(getElement)}
    </div>
  );
};
