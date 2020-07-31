import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { InteractionPoint } from 'components'
import { renderStyle } from 'lib/utils'

const mainCss = css`
  align-items: center;
  border-radius: var(--radius-sm);
  border: 1px dotted var(--clr-accent);
  color: #111;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: absolute;
  user-select: none;
  z-index: 101;
`

const wrapperCss = css`
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

export function ElementModifier({ element }) {
  const style = renderStyle(element)
  const { width, height } = style

  return (
    <>
      <div class={wrapperCss} style={{ height, width }}>
        <div class={rowCss} style={{ width }}>
          <InteractionPoint position="tl" />
          <InteractionPoint position="tc" />
          <InteractionPoint position="tr" />
        </div>

        <div class={rowCss} style={{ width }}>
          <InteractionPoint position="ml" />
          <InteractionPoint position="mc" />
          <InteractionPoint position="mr" />
        </div>

        <div class={rowCss} style={{ width }}>
          <InteractionPoint position="bl" />
          <InteractionPoint position="bc" />
          <InteractionPoint position="br" />
        </div>
      </div>

      <div class={mainCss} style={style}>
        {element.name}
      </div>
    </>
  )
}
