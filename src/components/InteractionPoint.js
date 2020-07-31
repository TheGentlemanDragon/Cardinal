import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

const cursorMap = {
  tl: 'nw-resize',
  tc: 'n-resize',
  tr: 'ne-resize',
  ml: 'w-resize',
  mc: 'move',
  mr: 'e-resize',
  bl: 'sw-resize',
  bc: 's-resize',
  br: 'se-resize',
}

const mainCss = css`
  background-color: var(--clr-accent);
  opacity: 0.9;
  height: 6px;
  width: 6px;
  z-index: 102;
`

InteractionPoint.proptypes = {
  action: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    'tl',
    'tc',
    'tr',
    'ml',
    'mc',
    'mr',
    'bl',
    'bc',
    'br',
  ]).isRequired,
}

InteractionPoint.defaultProps = {
  shape: 'square',
}

export function InteractionPoint({ action, position }) {
  return <div class={mainCss} style={{ cursor: cursorMap[position] }} />
}
