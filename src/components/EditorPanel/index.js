import { h } from 'preact'

import { IconButton } from 'components'
import s from './style.css'

function EditorPanel() {
  return (
    <div class={s.EditorPanel}>
      <h4>Add Element</h4>
      <div class={s.AddElement}>
        <IconButton type="text" />
        <IconButton type="image" />
      </div>
    </div>
  )
}

export default EditorPanel
