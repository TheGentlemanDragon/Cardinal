import { atom } from "jotai";

export const DEFAULT_DELTA = { x: 0, y: 0, width: 0, height: 0 };

const atomWithLocalStorage = (key, initialValue) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};

// TODO: Audit atoms
export const Atoms = {
  delta: atom({ DEFAULT_DELTA }),
  element: atom({}),
  elementId: atom(""),
  elements: atom([]),
  preview: atom(false),
  refresh: atom({}),
  scale: atomWithLocalStorage("ui-scale", 2.0),
  template: atom({}),
};
