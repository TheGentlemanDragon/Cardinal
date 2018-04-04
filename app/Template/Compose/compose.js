import { h } from 'hyperapp'
import { Firebase } from '../../services'
import './compose.styl'

export const Compose = () => ({ template, element }, actions) => (
  <div key="compose" class="compose-tab" container="column #top @stretch">
    <div class="compose-title" container="row #spread @center">
      <label>Elements</label>
      <i
        class="icon-add-outline icon-lg clickable"
        onclick={() => actions.addElement()}
      />
    </div>

    <div class="compose-elements" container="column #top @stretch">
      {(template.elements || []).map((item, index) => (
        <div
          class="compose-element"
          container="row #spread @center"
          onmouseover={() => actions.mouseElement(index)}
          onmouseleave={() => actions.mouseElement()}
        >
          <span flex>{item.name}</span>
          {element.mouse === index && [
            <i class="icon-edit-pencil" />,
            <i class="icon-view-show" />,
            <i
              class="icon-trash"
              onclick={() => actions.deleteElement(index)}
            />,
          ]}
        </div>
      ))}
    </div>
  </div>
)

Compose.state = {
  element: {
    mouse: '',
    editing: '',
  },
}

Compose.actions = {
  addElement: () => async ({ elements, template }, { setTemplate }) => {
    const newElement = { name: `element${elements.length + 1}` }
    const updateData = { elements: [...elements, newElement] }
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },
  deleteElement: index => async ({ elements, template }, { setTemplate }) => {
    elements.splice(index, 1)
    const updateData = { elements }
    await template.$ref.update(updateData)

    setTemplate({ ...template, ...updateData })
  },
  mouseElement: value => state => ({
    ...state,
    element: { ...state.element, mouse: value },
  }),
}
