import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

import PropertyGroup from '../SideBar/PropertyGroup'

const toggleValue = (preview, value) => {
  if (preview.includes(value)) {
    preview = preview.filter(item => item !== value)
  } else {
    preview.push(value)
  }
  emitEvent('setState', { preview })
}

const toggleDynamic = preview => {
  toggleValue(preview, 'dynamic')
}

const toggleStatic = preview => {
  toggleValue(preview, 'static')
}

const setScale = event => {
  emitEvent('setState', { scale: event.target.value })
}

const Preview = ({ preview, scale }) => (
  <PropertyGroup label="Preview">
    {/* Static Content */}
    <div class="sidebar-item property " container="row #spread @center">
      <span class="two-thirds-width">static content</span>
      <input
        type="checkbox"
        class="one-third-width"
        value={preview.includes('static')}
        onInput={linkEvent(preview, toggleStatic)}
      />
    </div>

    {/* Dynamic Content */}
    <div class="sidebar-item property " container="row #spread @center">
      <span class="two-thirds-width">dynamic content</span>
      <input
        type="checkbox"
        class="one-third-width"
        value={preview.includes('dynamic')}
        onInput={linkEvent(preview, toggleDynamic)}
      />
    </div>

    {/* Scale */}
    <div class="sidebar-item property " container="row #spread @center">
      <span class="one-third-width">scale</span>
      <input
        type="range"
        class="two-thirds-width"
        value={scale}
        min={0.5}
        max={2.5}
        step={0.1}
        onInput={setScale}
      />
    </div>
  </PropertyGroup>
)

const map = ({ preview, scale }) => ({ preview, scale })
export default mapStatesToProps(Preview, map)
