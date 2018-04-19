import { h } from 'hyperapp'
import { Properties } from '../modules/constants'
import ComposeElement from './ComposeElement'
import './Compose.styl'

export default () => ({ element, elements }, { addElement }) => (
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
          <input type="text" value={element.name} />
        </div>

        {/* Element Type */}
        <div class="property-input" container="row #spread @center">
          <span>type</span>
          <select>
            {['Text', 'Image'].map(opt => (
              <option selected={opt === element.type}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Content Type */}
        <div class="property-switch" container="row #left @center">
          <span>content</span>

          <input
            type="radio"
            name="contentType"
            id="static"
            checked={element.contentType}
          />
          <label for="static">static</label>

          <input
            type="radio"
            name="contentType"
            id="dynamic"
            checked={element.contentType}
          />
          <label for="dynamic">dynamic</label>
        </div>
      </div>
    )}
  </div>
)
