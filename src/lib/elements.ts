import { createElement } from "preact";
import { editorView, element, setElementById } from "./signals";
import { cls } from "./styles";
import type { Element, Template } from "./types";
import { generateId, getUniqueName } from "./utils";

const CARD_HEIGHT = 3.5;
const CARD_WIDTH = 2.5;

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

const DOTTED_OUTLINE = "outline outline-dotted outline-1";

const TYPE_MAP = {
  text: "div",
};

function withPointInRect({ x, y }: { x: number; y: number }) {
  return function (rect: DOMRect) {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y < rect.y + rect.height
    );
  };
}

export function getElement({ children, id, name, props, type }: Element) {
  return createElement(
    TYPE_MAP[type],
    {
      ...(id === element.value?.id ? element.value.props : props),
      id,
      class: cls(
        DOTTED_OUTLINE,
        "element cursor-pointer text-neutral-600",
        id === element.value?.id
          ? "outline-orange-500 animate-pulse duration-100 z-50"
          : "outline-blue-500 z-10"
      ),
    },
    editorView.value === "template" ? name : children
  );
}

export function getMax(style?: Element["props"]["style"]) {
  if (!style) {
    return {
      left: CARD_WIDTH.toString(),
      top: CARD_HEIGHT.toString(),
      width: CARD_WIDTH.toString(),
      height: CARD_HEIGHT.toString(),
    };
  }

  const { left, top, width, height } = style;
  const [x, y, w, h] = [left, top, width, height].map((i) => parseFloat(i));

  return {
    left: (CARD_WIDTH - w).toString(),
    top: (CARD_HEIGHT - h).toString(),
    width: (CARD_WIDTH - x).toString(),
    height: (CARD_HEIGHT - y).toString(),
  };
}

export function newElementForTemplate(type: string, template: Template) {
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
}

export function selectNextElement(event) {
  const { x, y } = event;

  // Shift elements to back
  const allElements = Array.from(document.querySelectorAll(".element"));
  const index = element.value
    ? allElements.findIndex((item) => item.id === element.value.id)
    : -1;

  const elements = [
    ...allElements.slice(index + 1),
    ...allElements.slice(0, index + 1),
  ];

  // Get the first clicked on item from shifted array
  const isPointInRect = withPointInRect({ x, y });
  const clickedElement = elements.find((item) =>
    isPointInRect(item.getBoundingClientRect())
  );

  // Select that item by its index in original array
  setElementById(clickedElement?.id);
}

export function updateElement(key: string, value: string) {
  const keys = key.split(".");
  let newElement = structuredClone(element.value);
  let obj = newElement;
  let k = keys.shift();
  for (; keys.length; k = keys.shift()) {
    obj = obj[k];
  }
  obj[k] = value;
  element.value = newElement;
}
