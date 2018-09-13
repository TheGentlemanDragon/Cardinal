import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { updateElement } from '../../modules/actions'

const Properties = ({ assets, element, updateElement }) => (
  <div class="compose-section">
    {/* Properties Section Title*/}
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
        onInput={linkEvent('name', updateElement)}
      />
    </div>

    {/* Type */}
    <div class="compose-item property" container="row #spread @center">
      <span>type</span>
      <select onInput={linkEvent('type', updateElement)}>
        {['Text', 'Image'].map(opt => <option value={opt}>{opt}</option>)}
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
          onClick={linkEvent('contentType', updateElement)}
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
  </div>
)

export default connect(
  store => ({
    assets: store.assets,
    element: store.element,
  }),
  { updateElement }
)(Properties)
