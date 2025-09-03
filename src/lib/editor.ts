import { signal } from "@preact/signals-core";
import type { JSX } from "preact/jsx-runtime";

import { cls, type Template } from "$lib";

/** Types */

export type MenuItem = {
  id: string;
  Icon: JSX.Element;
  onClick: () => void;
  tip?: string;
};

/** Signals */

export const editorView = signal("template");

export const template = signal<Template>();

export const setView = (name: string) => () => (editorView.value = name);

export const syncTemplate = (value: Template) => {
  if (value !== template.value) {
    template.value = value;
  }
};

/** Styles */

export const clsMenuListH = (radio: boolean) =>
  cls(radio && "group/radio", "menu menu-horizontal items-center w-full");

export const clsMenuOption = (id: string, tip: string) => {
  const active = editorView.value === id ? "menu-active scale-90" : "";
  const tooltip = tip ? "tooltip tooltip-info" : "";
  return `${active} ${tooltip}`;
};
