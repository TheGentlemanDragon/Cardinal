import { h } from 'hyperapp'
import ComposeElement from './ComposeElement'
import './Compose.styl'

const properties = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'type',
    type: 'options',
    options: ['Label', 'Image'],
  },
]

export default () => ({ elements, selectedIndex }, { addElement }) => (
  <div key="compose" class="compose-tab" container="column #top @stretch">
    {/* Elements Section */}
    <div class="compose-title" container="row #spread @center">
      <label>Elements</label>
      <i
        class="icon-add-outline icon-lg clickable"
        onclick={() => addElement()}
      />
    </div>

    {/* Elements List */}
    <div class="compose-elements" container="column #top @stretch">
      {elements.length &&
        elements.map((item, index) => (
          <ComposeElement item={item} index={index} />
        ))}
    </div>

    {/* Properties Section */}
    <div class="compose-title" container="row #spread @center">
      <label>Properties</label>
      <i class="icon-cheveron-down icon-lg clickable" onclick={() => {}} />
    </div>

    {/* Properties List */}
    <div class="compose-elements" container="column #top @stretch">
      {selectedIndex > -1 &&
        properties.map(prop => (
          <div class="properties-item" container="row #spread @center">
            <span flex>{prop.name}</span>
            <input
              type="text"
              value={elements[selectedIndex][prop.name]}
              flex
            />
          </div>
        ))}
    </div>
  </div>
)
