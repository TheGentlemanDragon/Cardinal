import { type Template } from "./types";

const DEFAULT_STYLE = {
  height: "0.33in",
  left: "0.125in",
  position: "absolute",
  top: "0.125in",
  width: "2.25in",
};

const DEFAULT_TEXT = {
  type: "div",
  props: {
    style: DEFAULT_STYLE,
  },
  children: "",
};

export const newElementForTemplate = (type: string, template: Template) => {
  const elements = [...template.data.elements];

  if (type === "text") {
    elements.push(DEFAULT_TEXT);
  }

  return {
    ...template,
    data: {
      ...template.data,
      elements,
    },
  };
};
