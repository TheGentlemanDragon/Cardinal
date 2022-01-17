import { useAtom } from "jotai";
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";

import { ActionButton } from "./ActionButton";
import { ElementList } from "../ElementList";
import { Title } from "../Title";
import { FlexSeparator } from "../UI/FlexSeparator";
import { ScaleSlider } from "../UI/ScaleSlider";
import { SelectStore } from "../UI/SelectStore";
import { Toggle } from "../UI/Toggle";

import { useAssetManager } from "../../hooks/useAssetManager";
import { useDS } from "../../hooks/useDS";
import { Atoms } from "../../lib/atoms";
import { DataStore } from "../../lib/datastore";
import { MenuCss } from "../../lib/styles";
import { defaultElement, getParams, selectTextOnFocus } from "../../lib/utils";

EditorMenu.propTypes = {};

EditorMenu.defaultProps = {};

/** List games for the main page */
export function EditorMenu() {
  const Elements = useDS("Elements");
  const Templates = useDS("Templates");
  const { toggle, Modal } = useAssetManager();
  const [elements, setElements] = useAtom(Atoms.elements);
  const [elementId] = useAtom(Atoms.elementId);
  const [preview, setPreview] = useAtom(Atoms.preview);
  const [template, setTemplate] = useAtom(Atoms.template);

  const element = elements.find((item) => item.$id === elementId);
  const elementIndex = elements.findIndex((item) => item === element);
  const [gameId, templateId] = getParams(["game", "template"]);

  useEffect(() => {
    Templates.getItem(templateId).then(setTemplate);
  }, [templateId]);

  useEffect(() => {
    if (template.$id) {
      Elements.getList({ templateId }).then(setElements);
    }
  }, [template]);

  const addElement = (type) => {
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

    const newTemplate = { ...template, order };

    DataStore.Elements.add(element);
    DataStore.Templates.set(template.$id, newTemplate);

    setElements([...elements, element]);
  };

  const updateElement = (partial) => {
    const newElement = { ...element, ...partial };
    DataStore.Elements.set(element?.$id, newElement);
    setElements(Object.assign([], elements, { [elementIndex]: newElement }));
  };

  if (!template) {
    return null;
  }

  return (
    <div class={MenuCss}>
      <Title />

      <div class="Menu-Panel">
        <SelectStore
          collection="Templates"
          labelKey="name"
          name="Template"
          query={{ gameId }}
          value={Templates.item?.name}
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
          onClick={() => addElement("text")}
        />

        <ActionButton
          caption="Add Image"
          icon="image"
          onClick={() => addElement("image")}
        />
      </div>

      <div class="Menu-Panel">
        {elements.length === 0 ? (
          <label class="alignCenter">
            This template currently has no elements
          </label>
        ) : (
          <ElementList />
        )}
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
          <button onClick={toggle}>Assets </button>
        </div>
      )}

      <FlexSeparator />

      <div class="Menu-Panel">
        <Toggle label="Preview" value={preview} onUpdate={setPreview} />
        <ScaleSlider />
      </div>

      <Modal />
    </div>
  );
}
