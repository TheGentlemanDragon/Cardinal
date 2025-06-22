import { cardScale } from "./ScaleSlider";

/** EditorCard Card */
export const EditorCard = () => {
  return (
    <div
      class="bg-white shadow-lg absolute top-1/2 left-1/2 -translate-1/2 h-64 aspect-25/35"
      id="EditorCard"
      style={{ transform: `scale(${cardScale.value / 10})` }}
    ></div>
  );
};
