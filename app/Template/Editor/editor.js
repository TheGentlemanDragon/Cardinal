import { h } from 'hyperapp'
import './editor.styl'

export const Editor = () => ({template}, actions) =>
  <div key="editor" class="editor" container="column #top @stretch">

    <div
        class="editor-section"
        container="column #top @stretch">
      <label>Element</label>
      <div class="editor-select">
        <select>
          {(template.elements || []).map(item =>
            <option value={item.name}>
              {item.name}
            </option>
          )}
        </select>
      </div>
    </div>

  </div>

Editor.state = {
}

Editor.actions = {
}
