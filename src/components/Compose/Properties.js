import { mapStatesToProps } from 'inferno-fluxible'

import { elementTypes } from '../../Constants'

const Properties = ({ assets, element }) => (
  <div class="sidebar-section">
    {/* Properties Section Title*/}
    <div class="sidebar-section-title" container="row #spread @center">
      <label>Properties</label>
      <i class="icon-cheveron-down icon-lg clickable" onClick={() => {}} />
    </div>

    {/* Name */}
    <div class="sidebar-item property" container="row #spread @center">
      <span>name</span>
      <input
        type="text"
        value={element.name}
        // TODO: onInput={linkEvent('name', updateElement)}
      />
    </div>

    {/* Type */}
    <div class="sidebar-item property" container="row #spread @center">
      <span>type</span>
      <select
      // TODO: onInput={linkEvent('type', updateElement)}
      >
        {elementTypes.map(opt => (
          <option value={opt} selected={opt === element.type}>
            {opt}
          </option>
        ))}
      </select>
    </div>

    {/* Content Type */}
    {(element.type || '').startsWith('Static') && (
      <div class="sidebar-item property" container="row #spread @center">
        <span>content</span>

        {element.type === 'Static Image' && (
          <select
          // TODO: onInput={linkEvent('content', updateElement)}
          >
            <option disabled>-Choose Image-</option>
            {assets.map(opt => (
              <option value={opt.url} selected={opt.url === element.content}>
                {opt.name}
              </option>
            ))}
            <option
              value="showAM"
              // TODO: onClick={linkEvent('assets', showModal)}
            >
              -Manage Files-
            </option>
          </select>
        )}

        {element.type === 'Static Text' && <input type="text" />}
      </div>
    )}
  </div>
)

const map = ({ assets, element }) => ({ assets, element })
export default mapStatesToProps(Properties, map)
