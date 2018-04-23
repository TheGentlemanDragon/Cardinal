import { h } from 'hyperapp'
import ComposeElement from './ComposeElement'
import './Compose.styl'

export default () => (
  { element, elements },
  { addElement, restoreElements, saveTemplate, updateElement }
) => (
  <div key="compose" class="compose-tab" container="column #top @stretch">
    {/* Elements Section */}
    <div class="compose-title" container="row #spread @center">
      <label flex>Elements</label>
      <i class="icon-block clickable" onclick={() => restoreElements()} />
      <i class="icon-save-disk clickable" onclick={() => saveTemplate()} />
      <i
        class="icon-add-outline icon-lg clickable"
        onclick={() => addElement()}
      />
    </div>

    {/* Elements List */}
    {elements.map((item, index) => (
      <ComposeElement item={item} index={index} />
    ))}

    {/* Properties Section */}
    <div class="compose-title" container="row #spread @center">
      <label>Properties</label>
      <i class="icon-cheveron-down icon-lg clickable" onclick={() => {}} />
    </div>

    {/* Name */}
    <div class="compose-item property" container="row #spread @center">
      <span>name</span>
      <input
        type="text"
        value={element.name}
        onblur={e => updateElement({ name: e.target.value })}
      />
    </div>

    {/* Type */}
    <div class="compose-item property" container="row #spread @center">
      <span>type</span>
      <select oninput={e => updateElement({ type: e.target.value })}>
        {['Text', 'Image'].map(opt => (
          <option selected={opt === element.type}>{opt}</option>
        ))}
      </select>
    </div>

    {/* Content Type */}
    <div class="compose-item property-switch" container="row #left @center">
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

    {/* Style Section */}
    <div class="compose-title" container="row #spread @center">
      <label>Style</label>
      <i class="icon-cheveron-down icon-lg clickable" onclick={() => {}} />
    </div>

    {/* Style Items */}
    <div class="compose-item half-property" container="row #spread @center">
      {/* Left */}
      <span>x</span>
      <input
        type="number"
        value={element.style && element.style.left}
        oninput={e =>
          updateElement({ style: { ...element.style, left: e.target.value } })
        }
      />

      {/* Top */}
      <span>y</span>
      <input
        type="number"
        value={element.style && element.style.top}
        oninput={e =>
          updateElement({ style: { ...element.style, top: e.target.value } })
        }
      />
    </div>

    <div class="compose-item half-property" container="row #spread @center">
      {/* Width */}
      <span>w</span>
      <input
        type="number"
        value={element.style && element.style.width}
        oninput={e =>
          updateElement({ style: { ...element.style, width: e.target.value } })
        }
      />

      {/* Height */}
      <span>h</span>
      <input
        type="number"
        value={element.style && element.style.height}
        oninput={e =>
          updateElement({ style: { ...element.style, height: e.target.value } })
        }
      />
    </div>
  </div>
)
