import { type Template } from "./types";
import { generateId, getUniqueName } from "./utils";
import { type Signal } from "@preact/signals";

const DEFAULT_STYLE = {
  height: "0.33in",
  left: "0.125in",
  position: "absolute",
  top: "0.125in",
  width: "2.25in",
};

const DEFAULT_TEXT = {
  children: "",
  id: "",
  name: "",
  props: {
    style: DEFAULT_STYLE,
  },
  type: "",
};

export const updateValue = (
  element: Signal<Element>,
  key: string,
  value: string
) => {
  const keys = key.split(".");
  let newElement = { ...element.value };
  let obj = newElement;
  let k = keys.shift();
  for (; keys.length; k = keys.shift()) {
    obj = obj[k];
  }
  obj[k] = value;
  return newElement;
};

export const newElementForTemplate = (type: string, template: Template) => {
  const elements = [...template.elements];

  const names = elements.map((item) => item.name);

  if (type === "text") {
    elements.push({
      ...DEFAULT_TEXT,
      id: generateId(),
      name: getUniqueName(names, "element"),
      type,
    });
  }

  return {
    ...template,
    elements,
  };
};
