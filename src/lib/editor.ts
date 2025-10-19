import { cls, MENU_CLS, type Template } from "$lib";
import { editorView, template } from "./signals";

/** Styles */

export function clsMenuListH(radio = false) {
  return cls(
    radio && "group/radio",
    MENU_CLS,
    "menu-horizontal items-center pl-4"
  );
}

export function clsMenuOption(id: string, tip: string) {
  const active = editorView.value === id ? "menu-active scale-90" : "";
  const tooltip = tip ? "tooltip tooltip-info" : "";
  return `${active} ${tooltip}`;
}
