import { signal } from "@preact/signals-core";
import {
  BookDashed,
  BookImage,
  Image,
  Group,
  Table,
  Type,
} from "lucide-preact";
import { JSX } from "preact/jsx-runtime";

type MenuItem = {
  id: string;
  Icon: JSX.Element;
  onClick: () => void;
};

const editorView = signal("template");

const activeClass = (id: string) =>
  editorView.value === id ? "menu-active" : "";

const setView = (name: string) => () => (editorView.value = name);

const VIEW_ITEMS: MenuItem[] = [
  {
    id: "template",
    Icon: <BookDashed />,
    onClick: setView("template"),
  },
  {
    id: "preview",
    Icon: <BookImage />,
    onClick: setView("preview"),
  },
  {
    id: "table",
    Icon: <Table />,
    onClick: setView("table"),
  },
];

const ADD_ITEMS: MenuItem[] = [
  {
    id: "text",
    Icon: <Type />,
    onClick: () => null,
  },
  {
    id: "image",
    Icon: <Image />,
    onClick: () => null,
  },
  {
    id: "group",
    Icon: <Group />,
    onClick: () => null,
  },
];

type HorizontalGroupProps = {
  label: string;
  items: MenuItem[];
};

const HorizontalGroup = ({ label, items }: HorizontalGroupProps) => (
  <li class="bg-base-200 rounded-box">
    <ul class="menu menu-horizontal items-center">
      <li class="ml-2 w-12">{label}</li>
      {items.map((item) => (
        <li key={item.id}>
          <a class={activeClass(item.id)} id={item.id} onClick={item.onClick}>
            {item.Icon}
          </a>
        </li>
      ))}
    </ul>
  </li>
);

export const EditorMenu = () => (
  <ul class="flex flex-col gap-3">
    <HorizontalGroup label="View" items={VIEW_ITEMS} />

    <HorizontalGroup label="Add" items={ADD_ITEMS} />
  </ul>
);
