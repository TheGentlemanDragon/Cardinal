import { useAtom } from "jotai";
import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import { css } from "linaria";
// import PropTypes from 'proptypes'

import {
  Stores,
  useCollectionQuery,
  useItemQuery,
  useSaveMutation,
} from "../hooks/data";
import { cls, getParams } from "../lib/utils";

import { Icon } from "./UI/Icon";

const ElementListCss = css`
  display: flex;
  flex-direction: column;

  .ElementList-Item {
    align-items: center;
    background-color: white;
    border-radius: 0.25rem;
    color: black;
    cursor: grab;
    display: flex;
    height: 2rem;
    line-height: 2rem;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
  }

  .ElementList-Dragging {
    opacity: 0.5;
  }
`;

ElementList.propTypes = {};

ElementList.defaultProps = {};

export function ElementList() {
  const [templateId] = getParams(["template"]);
  const { data: elements } = useCollectionQuery(Stores.Elements, {
    templateId,
  });
  const { data: template } = useItemQuery(Stores.Templates, templateId);
  const { mutate: saveTemplate } = useSaveMutation(
    Stores.Templates,
    templateId
  );

  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [order, setOrder] = useState(template.order);

  const orderedElements = useMemo(() => {
    if (!elements.length || !template?.order) {
      return [...elements];
    }

    return template.order.map((index) => elements[index]);
  }, [elements, template]);

  if (elements.length === 0) {
    return (
      <label class="alignCenter">This template currently has no elements</label>
    );
  }

  const swapElements = (index) => {
    if (index === draggedIndex) {
      return;
    }

    setDraggedIndex(index);

    const newOrder = [...order];
    [newOrder[index], newOrder[draggedIndex]] = [
      newOrder[draggedIndex],
      newOrder[index],
    ];

    setOrder(newOrder);
  };

  const saveOrder = () => {
    saveTemplate({ ...template, order });
    setDraggedIndex(-1);
  };

  return (
    <>
      <label class="alignRight">Elements</label>
      <div
        class={ElementListCss}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }}
        onDrop={(e) => e.preventDefault()}
      >
        {orderedElements.map((item, index) => {
          return (
            <div
              key={item.name ?? index}
              class={cls(
                "ElementList-Item",
                index === draggedIndex && "ElementList-Dragging"
              )}
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={() => swapElements(index)}
              onDragEnd={saveOrder}
              draggable
            >
              <Icon type="drag" margin="right" dark small />
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
