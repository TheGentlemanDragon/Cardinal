import { h } from 'hyperapp'
import './compose.styl'

export const Compose = () => ({template, element}, actions) =>
  <div  key="compose"
        class="compose-tab"
        container="column #top @stretch">

    <div  class="compose-title"
          container="row #spread @center">
      <label>Elements</label>
      <i class="icon-add-outline icon-lg"></i>
    </div>

    <div  class="compose-elements"
          container="column #top @stretch">
      {(template.elements || []).map(item =>
        <div  class="compose-element"
              container="row #spread @center"
              onmouseover={() => actions.mouseElement(item.name)}
              onmouseleave={() => actions.mouseElement()}>
          <span flex>{item.name}</span>
          { element.mouse === item.name && [
            <i class="icon-edit-pencil"></i>,
            <i class="icon-view-show"></i>,
            <i class="icon-trash"></i>,
          ]}
        </div>
      )}
    </div>

</div>

Compose.state = {
  element: {
    mouse: '',
    editing: '',
  },
}

Compose.actions = {
  mouseElement: value => state => ({ ...state, element: { ...state.element, mouse: value } }),
}
