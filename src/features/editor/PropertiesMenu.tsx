import { cls, HIDE_ARROWS } from "$lib";
import { MoveHorizontal, MoveVertical } from "lucide-preact";

export const PropertiesMenu = () => {
  return (
    <div class="flex flex-col bg-base-200 rounded-box shadow-md p-4">
      <div class="font-medium mb-2">Properties</div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Name</legend>
        <input type="text" class="input" />

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
            max="2.5"
            min="0.01"
            step="0.01"
            type="number"
          />
          <span>in</span>
        </label>

        <label class="input">
          y
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max="3.5"
            min="0.00"
            step="0.01"
            type="number"
          />
          <span>in</span>
        </label>
      </div>

      <div class="flex w-full gap-4 mb-2">
        <label class="input">
          <MoveHorizontal />
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max="2.5"
            min="0.01"
            step="0.01"
            type="number"
          />
          <span>in</span>
        </label>

        <label class="input">
          <MoveVertical />
          <input
            class={cls("text-right", HIDE_ARROWS)}
            max="3.5"
            min="0.00"
            step="0.01"
            type="number"
          />
          <span>in</span>
        </label>
      </div>
    </div>
  );
};
