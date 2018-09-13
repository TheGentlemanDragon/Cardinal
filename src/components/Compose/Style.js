import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { updateElement } from '../../modules/actions'

const Style = ({ element, updateElement }) => (
  <div class="compose-section">
    {/* Style Section Title */}
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
        onInput={linkEvent('style.left', updateElement)}
      />

      {/* Top */}
      <span>y</span>
      <input
        type="number"
        value={element.style && element.style.top}
        onInput={linkEvent('style.top', updateElement)}
      />
    </div>

    <div class="compose-item half-property" container="row #spread @center">
      {/* Width */}
      <span>w</span>
      <input
        type="number"
        value={element.style && element.style.width}
        onInput={linkEvent('style.width', updateElement)}
      />

      {/* Height */}
      <span>h</span>
      <input
        type="number"
        value={element.style && element.style.height}
        onInput={linkEvent('style.height', updateElement)}
      />
    </div>
  </div>
)

export default connect(
  store => ({ element: store.element }),
  { updateElement }
)(Style)
