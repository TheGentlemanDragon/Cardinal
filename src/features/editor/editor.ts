import { signal } from "@preact/signals-core";

export const editorView = signal("template");

export const activeClass = (id: string) =>
  editorView.value === id ? "menu-active scale-92" : "";

export const switchClass = (props, index) => {
  let background = props.switch ? "bg-[#1565c0]" : "";

  if (index === 0) {
    background += " rounded-l";
  } else if (index === props.items.length - 1) {
    background += " rounded-r";
  }

  return background;
};

export const setView = (name: string) => () => (editorView.value = name);
