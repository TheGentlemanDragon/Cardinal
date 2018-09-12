import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'

// import AssetManager from './AssetManager'
import ComposeElement from './ComposeElement'
import {
  addElement,
  restoreElements,
  saveTemplate,
  updateElement,
} from '../modules/actions'

class Compose extends Component {
  render() {
    const {
      assets,
      element,
      elements,
      addElement,
      restoreElements,
      saveTemplate,
      updateElement,
    } = this.props

    return (
      <div key="compose" class="compose-tab" container="column #top @stretch">
        {/* <AssetManager /> */}

        {/* Elements Section */}
        <div class="compose-title" container="row #spread @center">
          <label flex>Elements</label>
          <i class="icon-block clickable" onClick={() => restoreElements()} />
          <i class="icon-save-disk clickable" onClick={() => saveTemplate()} />
          <i
            class="icon-add-outline icon-lg clickable"
            onClick={() => addElement()}
          />
        </div>

        {/* Elements List */}
        {elements.map((item, index) => (
          <ComposeElement item={item} index={index} />
        ))}

        {/* Properties Section */}
        <div class="compose-title" container="row #spread @center">
          <label>Properties</label>
          <i class="icon-cheveron-down icon-lg clickable" onClick={() => {}} />
        </div>

        {/* Name */}
        <div class="compose-item property" container="row #spread @center">
          <span>name</span>
          <input
            type="text"
            value={element.name}
            onFocusOut={e => updateElement({ name: e.target.value })}
          />
        </div>

        {/* Type */}
        <div class="compose-item property" container="row #spread @center">
          <span>type</span>
          <select onInput={e => updateElement({ type: e.target.value })}>
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
              onClick={e => updateElement({ contentType: e.target.value })}
            />,
            <label for={option}>{option}</label>,
          ])}
        </div>

        {element.type === 'Image' &&
          element.contentType === 'static' && (
            <div class="compose-item property" container="row #spread @center">
              <button onClick={() => assets.show()}>Add File</button>
              <select>{assets.files.map(opt => <option>{opt}</option>)}</select>
            </div>
          )}

        {/* Style Section */}
        <div class="compose-title" container="row #spread @center">
          <label>Style</label>
          <i class="icon-cheveron-down icon-lg clickable" onClick={() => {}} />
        </div>

        {/* Style Items */}
        <div class="compose-item half-property" container="row #spread @center">
          {/* Left */}
          <span>x</span>
          <input
            type="number"
            value={element.style && element.style.left}
            onInput={e =>
              updateElement({
                style: { ...element.style, left: e.target.value },
              })
            }
          />

          {/* Top */}
          <span>y</span>
          <input
            type="number"
            value={element.style && element.style.top}
            onInput={e =>
              updateElement({
                style: { ...element.style, top: e.target.value },
              })
            }
          />
        </div>

        <div class="compose-item half-property" container="row #spread @center">
          {/* Width */}
          <span>w</span>
          <input
            type="number"
            value={element.style && element.style.width}
            onInput={e =>
              updateElement({
                style: { ...element.style, width: e.target.value },
              })
            }
          />

          {/* Height */}
          <span>h</span>
          <input
            type="number"
            value={element.style && element.style.height}
            onInput={e =>
              updateElement({
                style: { ...element.style, height: e.target.value },
              })
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({
    assets: store.assets,
    element: store.element,
    elements: store.elements,
  }),
  { addElement, restoreElements, saveTemplate, updateElement }
)(Compose)
