import {
  BookDashed,
  BookImage,
  Image,
  Group,
  Table,
  Type,
} from "lucide-preact";
import {
  clsMenuListH,
  clsMenuOption,
  type MenuItem,
  setView,
  useAddToTemplate,
} from "$lib";
import { signal } from "@preact/signals-core";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { RecordModel } from "pocketbase";
import { useEffect } from "preact/hooks";
import { ElementList } from "./ElementList";

const addToTemplate = signal<UseMutateFunction<
  RecordModel,
  Error,
  string,
  unknown
> | null>(null);

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
    onClick: () => addToTemplate.value("text"),
    tip: "Text",
  },
  {
    Icon: <Image />,
    id: "image",
    onClick: () => addToTemplate.value("image"),
    tip: "Image",
  },
  {
    Icon: <Group />,
    id: "group",
    onClick: () => addToTemplate.value("group"),
    tip: "Group",
  },
];

type MenuItemProps = {
  value: MenuItem;
  radio: boolean;
};

const MenuItem = ({
  value: { Icon, id, onClick, tip },
  radio,
}: MenuItemProps) => {
  const clsRadio = radio && "bg-primary nth-[2]:rounded-l-lg last:rounded-r-lg";
  return (
    <li class={clsRadio}>
      <a class={clsMenuOption(id, tip)} data-tip={tip} onClick={onClick}>
        {Icon}
      </a>
    </li>
  );
};

type MenuGroupProps = {
  items: MenuItem[];
  label: string;
  radio?: boolean;
};

const MenuGroup = ({ items, label, radio }: MenuGroupProps) => (
  <ul class={clsMenuListH(radio)}>
    <li class="grow">{label}</li>
    {items.map((item) => (
      <MenuItem key={item.id} value={item} radio={radio} />
    ))}
  </ul>
);

export const EditorMenu = () => {
  const { mutate } = useAddToTemplate();

  useEffect(() => {
    if (addToTemplate.value === null) {
      addToTemplate.value = mutate;
    }
  }, [addToTemplate.value]);

  return (
    <section class="flex flex-col gap-3 pointer-events-auto">
      <MenuGroup label="View" items={VIEW_ITEMS} radio />

      <MenuGroup label="Add" items={ADD_ITEMS} />

      <ElementList />
    </section>
  );
};
``;
