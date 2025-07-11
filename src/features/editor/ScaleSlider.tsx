import { effect, signal } from "@preact/signals-core";
import { Search } from "lucide-preact";
import { ChangeEvent } from "preact/compat";

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
    <label class="flex items-center">
      <Search />
      <input
        class="range range-xs ml-2"
        min="10"
        max="48"
        type="range"
        value={cardScale}
        onInput={setScale}
      ></input>
    </label>
  );
};
