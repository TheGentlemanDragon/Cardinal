import { useAtom } from "jotai";
import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import { css } from "linaria";
// import PropTypes from 'proptypes'

import { useDS } from "../hooks/useDS";
import { Atoms } from "../lib/atoms";
import { cls } from "../lib/utils";
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
  const Templates = useDS("Templates");
  const [elements] = useAtom(Atoms.elements);
  const [template, setTemplate] = useAtom(Atoms.template);
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
    setTemplate({ ...template, order: newOrder });
  };

  const saveOrder = () => {
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
