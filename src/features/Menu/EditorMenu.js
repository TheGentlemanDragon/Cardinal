import { useAtom } from "jotai";
import { h } from "preact";
import { route } from "preact-router";

import { ActionButton } from "./ActionButton";
import { ElementList } from "../ElementList";
import { Title } from "../Title";
import { FlexSeparator } from "../UI/FlexSeparator";
import { ScaleSlider } from "../UI/ScaleSlider";
import { SelectStore } from "../UI/SelectStore";
import { Toggle } from "../UI/Toggle";

import { useAssetManager } from "../../hooks/useAssetManager";
import {
  queryKey,
  Stores,
  useAddMutation,
  useItemQuery,
  useSaveMutation,
} from "../../hooks/data";

import { Atoms } from "../../lib/atoms";
import { MenuCss } from "../../lib/styles";
import { defaultElement, getParams, selectTextOnFocus } from "../../lib/utils";

EditorMenu.propTypes = {};

EditorMenu.defaultProps = {};

/** List games for the main page */
export function EditorMenu() {
  const [gameId, templateId] = getParams(["game", "template"]);

  const { data: template } = useItemQuery(Stores.Templates, templateId);
  const { mutate: addElement } = useAddMutation(
    Stores.Elements,
    queryKey(Stores.Elements, { templateId })
  );
  const { mutate: saveTemplate } = useSaveMutation(
    Stores.Templates,
    templateId
  );

  // const { toggle, Modal } = useAssetManager();
  // const [elements, setElements] = useAtom(Atoms.elements);
  const [element] = useAtom(Atoms.element);
  const [preview, setPreview] = useAtom(Atoms.preview);
  // const [template, setTemplate] = useAtom(Atoms.template);

  // const element = elements.find((item) => item.$id === elementId);
  // const elementIndex = elements.findIndex((item) => item === element);

  const addElementData = (type) => {
    // TODO: fix element count on new element added
    const count = document.getElementsByClassName("element").length;
    const name = `element${count}`;
    const element = {
      ...defaultElement,
      name,
      type,
      templateId,
    };

    // Set order for new element
    const order = template.order;
    order.push(template.order.length);
    saveTemplate({ ...template, order }, templateId);
    addElement(element);
  };

  const updateElement = (partial) => {
    const newElement = { ...element, ...partial };
    // DataStore.Elements.set(element?.$id, newElement);
    // setElements(Object.assign([], elements, { [elementIndex]: newElement }));
  };

  return (
    <div class={MenuCss}>
      <Title />

      <div class="Menu-Panel">
        <SelectStore
          collection="Templates"
          labelKey="name"
          name="Template"
          query={{ gameId }}
          value={template.name}
          onSelect={(template) =>
            route(`editor?game=${gameId}&template=${template.$id}`)
          }
        />
      </div>

      <div class="Menu-Panel">
        <ActionButton
          caption="Edit Cards"
          icon="table"
          href={`data?game=${gameId}&template=${templateId}`}
        />
      </div>

      <div class="Menu-Panel">
        <ActionButton
          caption="Add Text"
          icon="text"
          onClick={() => addElementData("text")}
        />

        <ActionButton
          caption="Add Image"
          icon="image"
          onClick={() => addElementData("image")}
        />
      </div>

      <div class="Menu-Panel">
        <ElementList />
      </div>

      {element && (
        <div class="Menu-Panel">
          <label>Name</label>
          <input
            type="text"
            value={element.name}
            onFocus={selectTextOnFocus}
            onInput={(e) => updateElement({ name: e.target.value })}
          />

          <label>Value</label>
          <input
            type="text"
            value={element.value}
            onFocus={selectTextOnFocus}
            onInput={(e) => updateElement({ value: e.target.value })}
          />
          {/* <button onClick={toggle}>Assets </button> */}
        </div>
      )}

      <FlexSeparator />

      <div class="Menu-Panel">
        <Toggle label="Preview" value={preview} onUpdate={setPreview} />
        <ScaleSlider />
      </div>

      {/* <Modal /> */}
    </div>
  );
}
