import { effect, signal } from "@preact/signals-core";
import { Search } from "lucide-preact";
import { ChangeEvent } from "preact/compat";

const SCALE_CACHE_KEY = "card-scale";
const DEFAULT_SCALE = 25;

const getScale = () => {
  const scale = localStorage.getItem(SCALE_CACHE_KEY);
  return scale === null ? DEFAULT_SCALE : parseInt(scale, 10);
};

const setScale = (event: ChangeEvent<HTMLInputElement>) =>
  (cardScale.value = parseInt(event.currentTarget.value));

export const cardScale = signal(getScale());

effect(() => localStorage.setItem(SCALE_CACHE_KEY, String(cardScale.value)));

export const ScaleSlider = () => {
  return (
    <>
      <label class="flex items-center pointer-events-auto">
        <Search />
        <input
          class="range"
          list="snap"
          min="5"
          max="45"
          type="range"
          value={cardScale}
          onInput={setScale}
        />
      </label>

      {/* Provides a magnetic snap-point slider thumb will snap to */}
      <datalist id="snap">
        <option value={DEFAULT_SCALE} />
      </datalist>
    </>
  );
};
