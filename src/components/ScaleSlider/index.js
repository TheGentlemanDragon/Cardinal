import { h } from 'preact'
import { useContext } from 'preact/hooks'
// import PropTypes from 'proptypes'

import EditorContext from 'contexts/EditorContext'
import { withEventTargetValue } from 'lib/functional'
import s from './style.css'

/** List games for the main page */
function ScaleSlider() {
  const editor = useContext(EditorContext)

  return (
    <div class={s.ScaleSlider}>
      <input
        type="range"
        id="cardScale"
        name="cardScale"
        min="1"
        max="3"
        step="0.05"
        value={editor.scale}
        onInput={withEventTargetValue(editor.setScale)}
      />
    </div>
  )
}

// ScaleSlider.propTypes = {}

export default ScaleSlider
