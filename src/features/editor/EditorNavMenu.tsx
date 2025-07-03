import { signal } from "@preact/signals-core";
import { BookDashed, BookImage, Table } from "lucide-preact";

const editorView = signal("template");

const activeClass = (id: string) =>
  editorView.value === id ? "menu-active" : "";

const setView = (name: string) => () => (editorView.value = name);

const NAV_ITEMS = [
  {
    id: "template",
    Icon: <BookDashed />,
  },
  {
    id: "preview",
    Icon: <BookImage />,
  },
  {
    id: "table",
    Icon: <Table />,
  },
];

export const EditorNavMenu = () => (
  <ul class="menu menu-horizontal bg-base-200 rounded-box">
    {NAV_ITEMS.map((item) => (
      <li>
        <a class={activeClass(item.id)} id={item.id} onClick={setView(item.id)}>
          {item.Icon}
        </a>
      </li>
    ))}
  </ul>
);
