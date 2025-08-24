import {
  BookDashed,
  BookImage,
  Image,
  Group,
  Table,
  Type,
} from "lucide-preact";
import { JSX } from "preact/jsx-runtime";
import { setView, switchClass, activeClass } from "./editor";

type MenuItem = {
  id: string;
  Icon: JSX.Element;
  onClick: () => void;
  tip?: string;
};

const VIEW_ITEMS: MenuItem[] = [
  {
    Icon: <BookDashed />,
    id: "template",
    onClick: setView("template"),
    tip: "Edit",
  },
  {
    Icon: <BookImage />,
    id: "preview",
    onClick: setView("preview"),
    tip: "Preview",
  },
  {
    Icon: <Table />,
    id: "table",
    onClick: setView("table"),
    tip: "Table",
  },
];

const ADD_ITEMS: MenuItem[] = [
  {
    Icon: <Type />,
    id: "text",
    onClick: () => null,
  },
  {
    Icon: <Image />,
    id: "image",
    onClick: () => null,
  },
  {
    Icon: <Group />,
    id: "group",
    onClick: () => null,
  },
];

type MenuGroupProps = {
  items: MenuItem[];
  label: string;
  switch?: boolean;
};

const MenuGroup = (props: MenuGroupProps) => (
  <li class="bg-base-200 rounded-box">
    <ul class="menu menu-horizontal items-center">
      <li class="ml-2 w-12">{props.label}</li>
      {props.items.map((item, index) => (
        <li class={switchClass(props, index)} key={item.id}>
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
    <MenuGroup label="View" items={VIEW_ITEMS} switch />

    <MenuGroup label="Add" items={ADD_ITEMS} />
  </ul>
);
