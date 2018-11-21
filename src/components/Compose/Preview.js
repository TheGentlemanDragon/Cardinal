import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { setProperty, toggleProperty } from '../../modules/actions'
import {} from '../../Constants'

const Preview = ({ preview, setProperty, toggleProperty }) => {
  const { dynamicContent, scale, staticContent } = preview
  // , , cardId,
  return (
    <div class="sidebar-section">
      {/* Preview Section Title*/}
      <div class="sidebar-section-title" container="row #spread @center">
        <label>Preview</label>
        <i class="icon-cheveron-down icon-lg clickable" onClick={() => {}} />
      </div>

      {/* Static Content */}
      <div class="sidebar-item property " container="row #spread @center">
        <span class="two-thirds-width">static content</span>
        <input
          type="checkbox"
          class="one-third-width"
          value={staticContent}
          onInput={linkEvent('preview.staticContent', toggleProperty)}
        />
      </div>

      {/* Dynamic Content */}
      <div class="sidebar-item property " container="row #spread @center">
        <span class="two-thirds-width">dynamic content</span>
        <input
          type="checkbox"
          class="one-third-width"
          value={dynamicContent}
          onInput={linkEvent('preview.dynamicContent', toggleProperty)}
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
          onInput={linkEvent('preview.scale', setProperty)}
        />
      </div>
    </div>
  )
}

export default connect(
  store => ({ preview: store.preview }),
  { setProperty, toggleProperty }
)(Preview)
