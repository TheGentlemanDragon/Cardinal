import { h } from 'hyperapp'
import ComposeElement from './ComposeElement'
import './Compose.styl'

export default () => ({ elements }, { addElement }) => (
  <div key="compose" class="compose-tab" container="column #top @stretch">
    <div class="compose-title" container="row #spread @center">
      <label>Elements</label>
      <i
        class="icon-add-outline icon-lg clickable"
        onclick={() => addElement()}
      />
    </div>

    <div class="compose-elements" container="column #top @stretch">
      {elements.length &&
        elements.map((item, index) => (
          <ComposeElement item={item} index={index} />
        ))}
    </div>
  </div>
)
