import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { InteractionPoint } from 'components'
import { useEditorContext } from 'contexts/EditorContext'
import { Firebase } from 'lib/data'
import { styleDelta, styleRender } from 'lib/utils'

const applyOps = ops => (scale, setValue) => point =>
  setValue(
    ops.reduce(
      (result, fn) => ({
        ...result,
        ...fn(scale)(point),
      }),
      {}
    )
  )

const t = {
  t: scale => ({ x, y }) => ({ top: y / scale }),
  l: scale => ({ x, y }) => ({ left: x / scale }),
  h: scale => ({ x, y }) => ({ height: y / scale }),
  hi: scale => ({ x, y }) => ({ height: -y / scale }),
  w: scale => ({ x, y }) => ({ width: x / scale }),
  wi: scale => ({ x, y }) => ({ width: -x / scale }),
}

const tMap = {
  tl: applyOps([t.t, t.hi, t.l, t.wi]),
  tc: applyOps([t.t, t.hi]),
  tr: applyOps([t.t, t.hi, t.w]),
  ml: applyOps([t.l, t.wi]),
  mc: applyOps([t.l, t.t]),
  mr: applyOps([t.w]),
  bl: applyOps([t.h, t.l, t.wi]),
  bc: applyOps([t.h]),
  br: applyOps([t.h, t.w]),
}

const labelCss = css`
  background-color: #888;
  color: #fff;
  font-size: 10px;
  margin-top: -15px;
  padding: 2px 3px;
  position: relative;
  text-align: center;
  user-select: none;
  width: 70px;
  z-index: 101;
`

const mainCss = css`
  outline: 1px dotted var(--clr-accent);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
`

const rowCss = css`
  display: flex;
  justify-content: space-between;
  overflow: visible;
`

ElementModifier.proptypes = {
  element: PropTypes.object.isRequired,
}

/*
  TODO:
  * Prevent move out of bounds
  * Prevent resize out of bounds
  * Troubleshoot issue during excessive resize/move
*/

export function ElementModifier({ element }) {
  const { delta, scale, set } = useEditorContext()
  const style = styleRender(element, {}, delta)
  const { left, top, width } = style

  const saveTransform = async delta => {
    const data = { style: styleDelta(element, delta) }
    await Firebase.update(element, data)
    set.refresh(Symbol())
  }

  return (
    <>
      <div class={labelCss} style={{ left, top }}>
        {element.name}
      </div>

      <div class={mainCss} style={style}>
        <div class={rowCss} style={{ width }}>
          <InteractionPoint
            position="tl"
            onDrag={tMap.tl(scale, set.delta)}
            onDragEnd={tMap.tl(scale, saveTransform)}
          />
          <InteractionPoint
            position="tc"
            onDrag={tMap.tc(scale, set.delta)}
            onDragEnd={tMap.tc(scale, saveTransform)}
          />
          <InteractionPoint
            position="tr"
            onDrag={tMap.tr(scale, set.delta)}
            onDragEnd={tMap.tr(scale, saveTransform)}
          />
        </div>

        <div class={rowCss} style={{ width }}>
          <InteractionPoint
            position="ml"
            onDrag={tMap.ml(scale, set.delta)}
            onDragEnd={tMap.ml(scale, saveTransform)}
          />
          <InteractionPoint
            position="mc"
            onDrag={tMap.mc(scale, set.delta)}
            onDragEnd={tMap.mc(scale, saveTransform)}
          />
          <InteractionPoint
            position="mr"
            onDrag={tMap.mr(scale, set.delta)}
            onDragEnd={tMap.mr(scale, saveTransform)}
          />
        </div>

        <div class={rowCss} style={{ width }}>
          <InteractionPoint
            position="bl"
            onDrag={tMap.bl(scale, set.delta)}
            onDragEnd={tMap.bl(scale, saveTransform)}
          />
          <InteractionPoint
            position="bc"
            onDrag={tMap.bc(scale, set.delta)}
            onDragEnd={tMap.bc(scale, saveTransform)}
          />
          <InteractionPoint
            position="br"
            onDrag={tMap.br(scale, set.delta)}
            onDragEnd={tMap.br(scale, saveTransform)}
          />
        </div>
      </div>
    </>
  )
}
