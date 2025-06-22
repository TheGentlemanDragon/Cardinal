import { signal } from "@preact/signals-core";
import { TemplateIcon, TableIcon, CardPreviewIcon } from "$icons";

const editorView = signal("template");

const iconClass = "w-4 h-4";

const activeClass = (id: string) =>
  editorView.value === id ? "menu-active" : "";

const setView = (name: string) => () => (editorView.value = name);

const MENU_ITEMS = [
  {
    id: "template",
    Icon: TemplateIcon,
  },
  {
    id: "preview",
    Icon: CardPreviewIcon,
  },
  {
    id: "table",
    Icon: TableIcon,
  },
];

export const EditorNav = () => (
  <ul class="menu menu-horizontal bg-base-200 rounded-box absolute top-2 right-20">
    {MENU_ITEMS.map((item) => (
      <li>
        <a class={activeClass(item.id)} id={item.id} onClick={setView(item.id)}>
          <item.Icon cls={iconClass} />
        </a>
      </li>
    ))}
  </ul>
);
