import { createElement } from "preact";
import { element } from "./signals";
import { cls } from "./styles";
import type { Element, Template } from "./types";
import { generateId, getUniqueName } from "./utils";

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

const DOTTED_OUTLINE = "outline outline-dashed outline-1";

export const getElement = (item: Element) =>
  createElement(
    item.type,
    {
      ...(item.id === element.value?.id ? element.value.props : item.props),
      class: cls(
        DOTTED_OUTLINE,
        item.id === element.value?.id
          ? "outline-orange-500 animate-pulse duration-100 z-50"
          : "outline-blue-500 z-10"
      ),
    },
    item.children
  );

const cardWidth = 2.5;
const cardHeight = 3.5;

export const getMax = (style?: Element["props"]["style"]) => {
  if (!style) {
    return {
      left: cardWidth.toString(),
      top: cardHeight.toString(),
      width: cardWidth.toString(),
      height: cardHeight.toString(),
    };
  }

  const { left, top, width, height } = style;
  const [x, y, w, h] = [left, top, width, height].map((i) => parseFloat(i));

  return {
    left: (cardWidth - w).toString(),
    top: (cardHeight - h).toString(),
    width: (cardWidth - x).toString(),
    height: (cardHeight - y).toString(),
  };
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

export const updateElement = (key: string, value: string) => {
  const keys = key.split(".");
  let newElement = structuredClone(element.value);
  let obj = newElement;
  let k = keys.shift();
  for (; keys.length; k = keys.shift()) {
    obj = obj[k];
  }
  obj[k] = value;
  element.value = newElement;
};
