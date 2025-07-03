import { cardScale } from "./ScaleSlider";

/** EditorCard Card */
export const EditorCard = () => {
  return (
    <div
      class="bg-white shadow-lg h-64 aspect-25/35"
      id="EditorCard"
      style={{ transform: `scale(${cardScale.value / 10})` }}
    ></div>
  );
};
