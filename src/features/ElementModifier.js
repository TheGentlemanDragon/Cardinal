import { useAtom } from "jotai";
import { css } from "linaria";
import { h } from "preact";
import { useMemo } from "preact/hooks";

import { Icon } from "./UI/Icon";
import { InteractionPoint } from "./InteractionPoint";
import { useEditorContext } from "../contexts/EditorContext";
import { Atoms } from "../lib/atoms";
import { DataStore } from "../lib/datastore";
import { ElementBaseCss } from "../lib/styles";
import { cls, styleDelta, styleRender } from "../lib/utils";

const MIN_SIZE = 20;
const CARD_HEIGHT = 350;
const CARD_WIDTH = 250;
const defaultDelta = { x: 0, y: 0, width: 0, height: 0 };

const applyOps = (ops) => (scale, setValue) => (point) =>
  setValue(
    ops.reduce(
      (result, fn) => ({
        ...result,
        ...fn(scale)(point),
      }),
      {}
    )
  );

const t = {
  t:
    (scale) =>
    ({ x, y }) => ({ top: y / scale }),
  l:
    (scale) =>
    ({ x, y }) => ({ left: x / scale }),
  h:
    (scale) =>
    ({ x, y }) => ({ height: y / scale }),
  hi:
    (scale) =>
    ({ x, y }) => ({ height: -y / scale }),
  w:
    (scale) =>
    ({ x, y }) => ({ width: x / scale }),
  wi:
    (scale) =>
    ({ x, y }) => ({ width: -x / scale }),
};

const tMap = {
  move: applyOps([t.t, t.l]),
  size: applyOps([t.h, t.w]),
};

const TopZIndexCss = css`
  z-index: 101;
`;

const ElementModifierCss = css`
  outline: 1px dotted var(--clr-accent);
  cursor: pointer;
  position: absolute;
`;

export function ElementModifier() {
  const [scale] = useAtom(Atoms.scale);
  const [elements, setElements] = useAtom(Atoms.elements);
  const [elementIndex] = useAtom(Atoms.elementIndex);
  const { delta, preview, refresh, $set } = useEditorContext();

  const hasSelected = elements?.length > 0 && elementIndex > -1;

  if (!hasSelected) {
    return null;
  }

  const element = elements[elementIndex];
  const style = styleRender(element, {}, delta);

  const saveTransform = (delta) => {
    const newElement = { ...element, style: styleDelta(element, delta) };
    DataStore.Elements.set(element.$id, newElement);
    $set.delta(defaultDelta);
    setElements(Object.assign([], elements, { [elementIndex]: newElement }));
  };

  const bounds = useMemo(() => {
    const { width: w, height: h, left: l, top: t } = element.style;
    return {
      size: {
        minX: -(w.value - MIN_SIZE) * scale,
        maxX: (CARD_WIDTH - l.value - w.value) * scale,
        minY: -(h.value - MIN_SIZE) * scale,
        maxY: (CARD_HEIGHT - t.value - h.value) * scale,
      },
      move: {
        minX: -(l.value * scale),
        maxX: (CARD_WIDTH - l.value - w.value) * scale,
        minY: -(t.value * scale),
        maxY: (CARD_HEIGHT - t.value - h.value) * scale,
      },
    };
  }, [element, refresh, scale]);

  return (
    <>
      {!preview && (
        <div class={cls(ElementBaseCss, TopZIndexCss)} style={style}>
          <Icon type={element.type} />
          <span>{element.name}</span>
        </div>
      )}

      <div class={ElementModifierCss} style={style}>
        <InteractionPoint
          bounds={bounds.move}
          onDrag={tMap.move(scale, $set.delta)}
          onDragEnd={tMap.move(scale, saveTransform)}
          type="move"
        />
        <InteractionPoint
          bounds={bounds.size}
          onDrag={tMap.size(scale, $set.delta)}
          onDragEnd={tMap.size(scale, saveTransform)}
          type="resize"
        />
      </div>
    </>
  );
}
