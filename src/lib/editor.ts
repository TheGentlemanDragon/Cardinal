import type { JSX } from "preact/jsx-runtime";

import { cls, MENU_CLS, type Template } from "$lib";
import { editorView, template } from "./signals";

/** Types */

export type MenuItem = {
  id: string;
  Icon: JSX.Element;
  onClick: () => void;
  tip?: string;
};

/** Methods */

export const syncTemplate = (value: Template) => {
  if (value !== template.value) {
    template.value = value;
  }
};

/** Styles */

export const clsMenuListH = (radio = false) =>
  cls(radio && "group/radio", MENU_CLS, "menu-horizontal items-center pl-4");

export const clsMenuOption = (id: string, tip: string) => {
  const active = editorView.value === id ? "menu-active scale-90" : "";
  const tooltip = tip ? "tooltip tooltip-info" : "";
  return `${active} ${tooltip}`;
};
