import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { showModal, updateElement } from '../../modules/actions'

const selectedAssets = (showModal, event) => {
  if (event.target.value === 'showAM') {
    showModal('assets')
  }
}

const Properties = ({ assets, element, showModal, updateElement }) => (
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
        {['Text', 'Image'].map(opt => (
          <option value={opt} selected={opt === element.type}>
            {opt}
          </option>
        ))}
      </select>
    </div>

    {/* Content Type */}
    <div class="compose-item property-switch" container="row #left @center">
      <span>content</span>

      {['static', 'dynamic'].map(opt => [
        <input
          type="radio"
          id={opt}
          value={opt}
          checked={opt === element.contentType}
          onClick={linkEvent('contentType', updateElement)}
        />,
        <label for={opt}>{opt}</label>,
      ])}
    </div>

    {element.contentType === 'static' && (
      <div class="compose-item property" container="row #spread @center">
        {element.type === 'Image' && [
          <span />,
          <select onChange={linkEvent(showModal, selectedAssets)}>
            <option disabled>-Choose Image-</option>
            {assets.map(opt => <option value={opt.name}>{opt.name}</option>)}
            <option value="showAM">-Manage Files-</option>
          </select>,
        ]}

        {element.type === 'Text' && [<span />, <input type="text" />]}
      </div>
    )}
  </div>
)

export default connect(
  store => ({
    assets: store.assets,
    element: store.element,
  }),
  { showModal, updateElement }
)(Properties)
