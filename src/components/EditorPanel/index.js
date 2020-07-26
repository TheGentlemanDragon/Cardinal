import { h } from 'preact'
import PropTypes from 'proptypes'

import { IconButton } from 'components'
import { addElement } from 'lib/actions'
import s from './style.css'

function EditorPanel({ template = {}, onUpdate }) {
  const addImage = () => addElement(template, 'image', onUpdate)
  const addText = () => addElement(template, 'text', onUpdate)

  return (
    <div class={s.EditorPanel}>
      <h4>Add Element</h4>

      <div class={s.AddElement}>
        <IconButton type="text" onClick={addText} />
        <IconButton type="image" onClick={addImage} />
      </div>
    </div>
  )
}

EditorPanel.proptypes = {
  template: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
}

export default EditorPanel
