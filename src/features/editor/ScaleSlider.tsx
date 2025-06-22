import { effect, signal } from "@preact/signals-core";
import { ChangeEvent } from "preact/compat";
import { ScaleIcon } from "$icons";

const SCALE_CACHE_KEY = "card-scale";
const DEFAULT_SCALE = 30;

const getScale = () => {
  const scale = localStorage.getItem(SCALE_CACHE_KEY);
  return scale === null ? DEFAULT_SCALE : parseInt(scale, 10);
};

const setScale = (event: ChangeEvent<HTMLInputElement>) =>
  (cardScale.value = parseInt(event.currentTarget.value));

export const cardScale = signal(getScale());

effect(() => localStorage.setItem(SCALE_CACHE_KEY, String(cardScale.value)));

export const ScaleSilder = () => {
  return (
    <div class="flex items-center absolute bottom-3 left-4">
      <ScaleIcon cls="mr-2" />
      <input
        class="range range-xs"
        min="10"
        max="48"
        type="range"
        value={cardScale}
        onInput={setScale}
      ></input>
    </div>
  );
};
