import { useContextEx } from "../lib/context";

const defaults = {
  delta: { x: 0, y: 0, width: 0, height: 0 },
  preview: false,
  refresh: {},
  template: {},
};

const [useEditorContext, withEditorContext] = useContextEx(defaults, "Editor", [
  "preview",
]);

export { useEditorContext, withEditorContext };
