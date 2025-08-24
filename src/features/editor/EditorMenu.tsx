import {
  BookDashed,
  BookImage,
  Image,
  Group,
  Table,
  Type,
} from "lucide-preact";
import {
  clsMenuGroup,
  clsMenuListH,
  clsMenuOption,
  clsMenuRadio,
  type MenuItem,
  setView,
} from "./editor";

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
    tip: "Text",
  },
  {
    Icon: <Image />,
    id: "image",
    onClick: () => null,
    tip: "Image",
  },
  {
    Icon: <Group />,
    id: "group",
    onClick: () => null,
    tip: "Group",
  },
];

type MenuGroupProps = {
  items: MenuItem[];
  label: string;
  radio?: boolean;
};

const MenuGroup = (props: MenuGroupProps) => (
  <li class={clsMenuGroup}>
    <ul class={clsMenuListH}>
      <li class="ml-2 w-12">{props.label}</li>
      {props.items.map((item, index) => (
        <li class={clsMenuRadio(props, index)} key={item.id}>
          <a
            class={clsMenuOption(item)}
            data-tip={item.tip}
            id={item.id}
            onClick={item.onClick}
          >
            {item.Icon}
          </a>
        </li>
      ))}
    </ul>
  </li>
);

export const EditorMenu = () => (
  <ul class="flex flex-col gap-3">
    <MenuGroup label="View" items={VIEW_ITEMS} radio />

    <MenuGroup label="Add" items={ADD_ITEMS} />
  </ul>
);
