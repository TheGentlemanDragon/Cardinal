import { signal } from "@preact/signals-core";
import type { Element, Template, UsersAuth } from "./types";

export const editorView = signal("template");

export const element = signal<Element>();

export const elements = signal<Element[]>([]);

export const template = signal<Template>();

export const user = signal<UsersAuth | null>(null);

export const setElement = (el: Element) => (element.value = el);

export const setElementById = (id: string) =>
  (element.value = elements.value.find((item) => item.id === id));

export const setView = (view: string) => () => (editorView.value = view);
