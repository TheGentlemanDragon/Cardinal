import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import { css } from "linaria";
// import PropTypes from 'proptypes'

import { useEditorContext } from "../contexts/EditorContext";
import { useDS } from "../hooks/useDS";
import { cls } from "../lib/utils";

const ElementListCss = css`
  display: flex;
  flex-direction: column;

  .ElementList-Item {
    background-color: white;
    border-radius: 0.25rem;
    color: black;
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
  const Templates = useDS("Templates");
  const { elements, $set, template } = useEditorContext();
  const [draggedIndex, setDraggedIndex] = useState(-1);

  const order = template.order || elements.map((_, index) => index);

  const orderedElements = useMemo(() => {
    if (!elements.length || !template?.order) {
      return [...elements];
    }

    return template.order.map((index) => elements[index]);
  }, [elements, template]);

  const swapElements = (index) => {
    if (index === draggedIndex) {
      return;
    }

    const newOrder = [...order];
    [newOrder[index], newOrder[draggedIndex]] = [
      newOrder[draggedIndex],
      newOrder[index],
    ];
    setDraggedIndex(index);
    Templates.setItem(template.$id, { order: newOrder });
    $set.template({ ...template, order: newOrder });
  };

  const saveOrder = () => {
    setDraggedIndex(-1);
  };

  return (
    <>
      <label>Order</label>
      <div class={ElementListCss}>
        {orderedElements.map((item, index) => {
          return (
            <div
              key={item.name ?? index}
              class={cls(
                "ElementList-Item",
                index === draggedIndex && "ElementList-Dragging"
              )}
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(e) => swapElements(index)}
              onDragEnd={saveOrder}
              draggable={true}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
