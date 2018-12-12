import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

import { elementTypes } from '../../Constants'
import PropertyGroup from '../SideBar/PropertyGroup'

const updateElement = (key, event) => {
  const { value } = event.target

  if (value === 'showModal') {
    emitEvent('setState', { modal: 'assets', value })
    emitEvent('resetElement')
  } else {
    emitEvent('updateElement', { key, value })
  }
}

const Properties = ({ assets, element }) =>
  element && (
    <PropertyGroup label="Properties">
      {/* Name */}
      <div class="sidebar-item property" container="row #spread @center">
        <span>name</span>
        <input
          type="text"
          value={element.name}
          onInput={linkEvent('name', updateElement)}
        />
      </div>

      {/* Type */}
      <div class="sidebar-item property" container="row #spread @center">
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
      {element.type.startsWith('Static') && (
        <div class="sidebar-item property" container="row #spread @center">
          <span>content</span>

          {element.type === 'Static Image' && (
            <select onChange={linkEvent('content', updateElement)}>
              <option disabled>-Choose Image-</option>
              {[...assets].map(opt => (
                <option value={opt.url} selected={opt.url === element.content}>
                  {opt.name}
                </option>
              ))}
              <option value="showModal">-Manage Files-</option>
            </select>
          )}

          {element.type === 'Static Text' && <input type="text" />}
        </div>
      )}
    </PropertyGroup>
  )

const map = ({ assets, element }) => ({ assets, element })
export default mapStatesToProps(Properties, map)
