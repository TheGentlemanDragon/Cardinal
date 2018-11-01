import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { showModal, updateElement } from '../../modules/actions'
import { elementTypes } from '../../Constants'

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
        {elementTypes.map(opt => (
          <option value={opt} selected={opt === element.type}>
            {opt}
          </option>
        ))}
      </select>
    </div>

    {/* Content Type */}
    {(element.type || '').startsWith('Static') && (
      <div class="compose-item property" container="row #spread @center">
        <span>content</span>

        {element.type === 'Static Image' && (
          <select onInput={linkEvent('content', updateElement)}>
            <option disabled>-Choose Image-</option>
            {assets.map(opt => (
              <option value={opt.name} selected={opt.name === element.content}>
                {opt.name}
              </option>
            ))}
            <option value="showAM" onClick={linkEvent('assets', showModal)}>
              -Manage Files-
            </option>
          </select>
        )}

        {element.type === 'Static Text' && <input type="text" />}
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
