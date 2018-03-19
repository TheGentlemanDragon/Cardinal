import { h } from 'hyperapp'
import './editor.styl'

export const Editor = () => (state, actions) =>
  <div key="editor" class="editor" container="column #top @stretch">

    <div
        class="editor-section"
        container="column #top @left">
      <label>Element</label>
      <span>Header1</span>
    </div>

  </div>

Editor.state = {
}

Editor.actions = {
}
