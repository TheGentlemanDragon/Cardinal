import { signal } from "@preact/signals-core";
import { JSX } from "preact/jsx-runtime";

/** Types */

export type MenuItem = {
  id: string;
  Icon: JSX.Element;
  onClick: () => void;
  tip?: string;
};

/** Signals */

export const editorView = signal("template");

export const setView = (name: string) => () => (editorView.value = name);

/** Styles */

export const clsMenuGroup = "bg-base-200 rounded-box";

export const clsMenuListH = "menu menu-horizontal items-center";

export const clsMenuOption = (item: MenuItem) => {
  const active = editorView.value === item.id ? "menu-active scale-90" : "";
  const tooltip = item.tip ? "tooltip tooltip-info" : "";
  return `${active} ${tooltip}`;
};

export const clsMenuRadio = (props, index) => {
  if (!props.radio) {
    return "";
  }

  let style = "bg-[#1565c0]";

  if (index === 0) {
    style += " rounded-l";
  } else if (index === props.items.length - 1) {
    style += " rounded-r";
  }

  return style;
};
