import { element, elements, getElement, useCurrentTemplate } from "$lib";
import { cardScale } from "./ScaleSlider";

/** EditorCard Card */
export const EditorCard = () => {
  return (
    <div
      class="bg-white shadow-lg h-[3.5in] aspect-25/35 out z-0"
      id="EditorCard"
      style={{ transform: `scale(${cardScale.value / 10})` }}
    >
      {elements.value.map(getElement)}
    </div>
  );
};
