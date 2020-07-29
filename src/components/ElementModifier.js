import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { renderStyle } from 'lib/utils'

const mainCss = css`
  align-items: center;
  border-radius: var(--radius-sm);
  border: 1px dotted var(--clr-accent);
  color: #111;
  display: flex;
  justify-content: center;
  position: absolute;
  user-select: none;
  z-index: 101;
`

ElementModifier.proptypes = {
  element: PropTypes.object.isRequired,
}

// TODO: Add elements to drag and resize by
export function ElementModifier({ element }) {
  return (
    <div class={mainCss} style={renderStyle(element)}>
      {element.name}
    </div>
  )
}
