import { type Template } from "./types";

export const newElementForTemplate = (type: string, template: Template) => {
  const elements = [...template.data.elements, { type }];

  return {
    ...template,
    data: {
      ...template.data,
      elements,
    },
  };
};
