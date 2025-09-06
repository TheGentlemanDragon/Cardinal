import { useRoute } from "preact-iso";
import { type Template } from "./types";
import { useTemplate } from "./templates";
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

export const useCurrentElements = () => {
  const { params } = useRoute();
  const templateQuery = useTemplate(params.id);
  const { data, isSuccess } = templateQuery;
  return {
    ...templateQuery,
    data: isSuccess ? data.elements : undefined,
  };
};
