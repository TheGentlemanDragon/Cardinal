import { MoveHorizontal, MoveVertical } from "lucide-preact";
import { JSX } from "preact";
import {
  cls,
  element,
  get,
  getMax,
  HIDE_ARROWS,
  updateElement,
  useSaveElement,
} from "$lib";

const update =
  (key: string, valueFn: (str: string) => string = withIn) =>
  (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    updateElement(key, valueFn(event.currentTarget.value));
  };

const withIn = (value) => value + "in";

const getProp = (key: string) =>
  get(element.value, key as any)?.replace("in", "");

export const PropertiesMenu = () => {
  const { mutate: save } = useSaveElement();

  const saveElement = () => save(element.value);

  const max = getMax(element.value?.props.style);

  return (
    <div class="flex flex-col bg-base-200 rounded-box shadow-md p-4">
      <div class="font-medium mb-2">Properties</div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Name</legend>
        <input type="text" class="input" value={element.value?.name} />

        <legend class="fieldset-legend">Content</legend>
        <textarea type="text" class="textarea" />
      </fieldset>

      <div class="divider my-2" />

      <div class="font-medium mb-2">Position</div>

      <div class="flex w-full gap-4 mb-4">
        <label class="input">
          x
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max={max.left}
            min="0.00"
            step="0.005"
            type="number"
            onBlur={saveElement}
            onInput={update("props.style.left")}
            value={getProp("props.style.left")}
          />
          <span>in</span>
        </label>

        <label class="input">
          y
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max={max.top}
            min="0.00"
            step="0.005"
            type="number"
            onBlur={saveElement}
            onInput={update("props.style.top")}
            value={getProp("props.style.top")}
          />
          <span>in</span>
        </label>
      </div>

      <div class="flex w-full gap-4 mb-2">
        <label class="input">
          <MoveHorizontal />
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max={max.width}
            min="0.01"
            step="0.005"
            type="number"
            onBlur={saveElement}
            onInput={update("props.style.width")}
            value={getProp("props.style.width")}
          />
          <span>in</span>
        </label>

        <label class="input">
          <MoveVertical />
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max={max.height}
            min="0.01"
            step="0.005"
            type="number"
            onBlur={saveElement}
            onInput={update("props.style.height")}
            value={getProp("props.style.height")}
          />
          <span>in</span>
        </label>
      </div>
    </div>
  );
};
