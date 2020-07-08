import { h } from 'preact'
// import PropTypes from 'proptypes'

import { useEditorContext } from 'contexts/EditorContext'
import { withEventTargetValue } from 'lib/functional'
import s from './style.css'

/** List games for the main page */
function ScaleSlider() {
  const { scale, set } = useEditorContext()

  return (
    <div class={s.ScaleSlider}>
      <input
        type="range"
        id="cardScale"
        name="cardScale"
        min="1"
        max="3"
        step="0.05"
        value={scale}
        onInput={withEventTargetValue(set.scale)}
      />
    </div>
  )
}

// ScaleSlider.propTypes = {}

export default ScaleSlider
