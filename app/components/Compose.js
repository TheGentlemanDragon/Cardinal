import { h } from 'hyperapp'
import './Compose.styl'

export default () => (
  { elements },
  { addElement, deleteElement, mouseElement }
) => (
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
          <div
            class="compose-element"
            container="row #spread @center"
            onmouseover={() => mouseElement({ index, item, mouse: true })}
            onmouseleave={() => mouseElement({ index, item, mouse: false })}
          >
            <span flex>{item.name}</span>
            {item.mouse && [
              <i class="icon-edit-pencil" />,
              <i class="icon-view-show" />,
              <i class="icon-trash" onclick={() => deleteElement(index)} />,
            ]}
          </div>
        ))}
    </div>
  </div>
)
