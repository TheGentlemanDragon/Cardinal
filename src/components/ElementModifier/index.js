import { h } from 'preact'
import PropTypes from 'proptypes'

import { renderStyle } from 'lib/utils'
import s from './style.css'

// TODO: Add elements to drag and resize by
function ElementModifier({ element }) {
  return (
    <div class={s.ElementModifier} style={renderStyle(element)}>
      {element.name}
    </div>
  )
}

ElementModifier.proptypes = {
  element: PropTypes.object.isRequired,
}

export default ElementModifier
