import { h } from 'hyperapp'
import ComposeElement from './ComposeElement'
import './Compose.styl'

export default () => (
  { element, elements, selectedIndex },
  { addElement, saveElement, updateElement }
) => (
  <div key="compose" class="compose-tab" container="column #top @stretch">
    {/* Elements Section */}
    <div class="compose-title" container="row #spread @center">
      <label flex>Elements</label>
      <i class="icon-block clickable" onclick={() => {}} />
      <i class="icon-save-disk clickable" onclick={() => saveElement()} />
      <i
        class="icon-add-outline icon-lg clickable"
        onclick={() => addElement()}
      />
    </div>

    {/* Elements List */}
    <div class="compose-items" container="column #top @stretch">
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
    {element && (
      <div class="compose-items" container="column #top @stretch">
        {/* Element Name */}
        <div class="property-input" container="row #spread @center">
          <span>name</span>
          <input
            type="text"
            value={element.name}
            onblur={e => updateElement({ name: e.target.value })}
          />
        </div>

        {/* Element Type */}
        <div class="property-input" container="row #spread @center">
          <span>type</span>
          <select onchange={e => updateElement({ type: e.target.value })}>
            {['Text', 'Image'].map(opt => (
              <option selected={opt === element.type}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Content Type */}
        <div class="property-switch" container="row #left @center">
          <span>content</span>

          {['static', 'dynamic'].map(option => [
            <input
              type="radio"
              id={option}
              value={option}
              checked={element.contentType === option}
              onclick={e => updateElement({ contentType: e.target.value })}
            />,
            <label for={option}>{option}</label>,
          ])}
        </div>
      </div>
    )}
  </div>
)
