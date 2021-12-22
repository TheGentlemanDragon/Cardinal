import { useAtom } from "jotai";
import { css } from "linaria";
import { h } from "preact";
import { useEffect, useMemo } from "preact/hooks";

import { DataImage } from "./DataImage";
import { ElementModifier } from "./ElementModifier";
import { Icon } from "./UI/Icon";

import { useDS } from "../hooks/useDS";
import { Atoms } from "../lib/atoms";
import { ElementBaseCss } from "../lib/styles";
import { cls, selectElement, styleRender } from "../lib/utils";

const hide = { display: "none" };

const EditorCardCss = css`
  background-color: #ffffff;
  border-radius: calc(0.13px * var(--res));
  box-shadow: var(--box-shadow-lg);
  height: calc(3.5px * var(--res));
  position: relative;
  width: calc(2.5px * var(--res));
`;

const ElementCss = css`
  &:hover {
    outline: 1px dotted #aaa;
  }
`;

const rxVariables = /\{([^}]*)\}/g;

EditorCard.propTypes = {};

EditorCard.defaultProps = {};

export function EditorCard({ gameId, templateId }) {
  const Assets = useDS("Assets");
  const Cards = useDS("Cards");

  const [elementId, setElementId] = useAtom(Atoms.elementId);
  const [elements] = useAtom(Atoms.elements);
  const [preview] = useAtom(Atoms.preview);
  const [scale] = useAtom(Atoms.scale);
  const [template] = useAtom(Atoms.template);

  const card = preview ? Cards.list[0] : {};

  useEffect(() => {
    Assets.getList();
  }, []);

  useEffect(() => {
    Cards.getList({ templateId });
  }, [gameId, templateId]);

  function applyText(element) {
    const placeholders = element.value.match(rxVariables) || [];
    return placeholders.reduce((result, varName) => {
      const key = varName.substring(1, varName.length - 1);
      const id = template.fields.find((item) => item.name === key)?.id;
      return result.replace(varName, card[id]);
    }, element.value);
  }

  function applyImage(element) {
    const match = element.value.match(rxVariables)?.[0];
    let imageName;

    if (match) {
      const key = match.substring(1, match.length - 1);
      const id = template.fields.find((item) => item.name === key)?.id;
      imageName = card[id];
    } else {
      imageName = element.value;
    }

    const image = Assets.list.find((item) => item.name === imageName);
    const { height, width, top: y, left: x } = element.style;

    return (
      <DataImage
        image={image}
        height={height.value}
        width={width.value}
        offset={{ x: x.value, y: y.value }}
      />
    );
  }

  const orderedElements = useMemo(() => {
    if (!elements.length || !template?.order) {
      return [...elements].reverse();
    }

    return template?.order.map((index) => elements[index]).reverse();
  }, [elements, template]);

  return (
    <div
      class={EditorCardCss}
      id="EditorCard"
      style={{ transform: `scale(${scale})` }}
      onMouseDown={selectElement(elementId, setElementId)}
    >
      {elementId && <ElementModifier />}

      {orderedElements.map((element) => {
        const isSelected = element.$id === elementId;

        return (
          <div
            key={element.$id}
            id={element.$id}
            class={cls("element", ElementBaseCss, ElementCss)}
            style={styleRender(element, !preview && isSelected && hide)}
          >
            {preview ? (
              <span>
                {element.type === "text" && applyText(element)}
                {element.type === "image" && applyImage(element)}
              </span>
            ) : (
              <>
                <Icon type={element.type} />
                <span>{element.name}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
