import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

const updateElement = (key, event) =>
  emitEvent('updateElement', { key, value: event.target.value })

const Style = ({ element }) => (
  <div class="sidebar-section">
    {/* Style Section Title */}
    <div class="sidebar-section-title" container="row #spread @center">
      <label>Style</label>
      <i class="icon-cheveron-down icon-lg clickable" onClick={() => {}} />
    </div>

    {/* Style Items */}
    <div class="sidebar-item property" container="row #spread @center">
      {/* Left */}
      <span class="half-width">x</span>
      <input
        type="number"
        class="half-width"
        value={element.style && element.style.left}
        onInput={linkEvent('style.left', updateElement)}
      />

      {/* Top */}
      <span class="half-width">y</span>
      <input
        type="number"
        class="half-width"
        value={element.style && element.style.top}
        onInput={linkEvent('style.top', updateElement)}
      />
    </div>

    <div class="sidebar-item property" container="row #spread @center">
      {/* Width */}
      <span class="half-width">w</span>
      <input
        type="number"
        class="half-width"
        value={element.style && element.style.width}
        onInput={linkEvent('style.width', updateElement)}
      />

      {/* Height */}
      <span class="half-width">h</span>
      <input
        type="number"
        class="half-width"
        value={element.style && element.style.height}
        onInput={linkEvent('style.height', updateElement)}
      />
    </div>
  </div>
)

const map = ({ element }) => ({ element })
export default mapStatesToProps(Style, map)
