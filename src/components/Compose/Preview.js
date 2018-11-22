import { mapStatesToProps } from 'inferno-fluxible'

const Preview = ({ preview, scale }) => {
  const previewDynamic = preview.includes('dynamic')
  const previewStatic = preview.includes('static')
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
          value={previewStatic}
          // TODO: onInput={linkEvent('preview.staticContent', toggleProperty)}
        />
      </div>

      {/* Dynamic Content */}
      <div class="sidebar-item property " container="row #spread @center">
        <span class="two-thirds-width">dynamic content</span>
        <input
          type="checkbox"
          class="one-third-width"
          value={previewDynamic}
          // TODO: onInput={linkEvent('preview.dynamicContent', toggleProperty)}
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
          // TODO: onInput={linkEvent('preview.scale', setProperty)}
        />
      </div>
    </div>
  )
}

const map = ({ preview, scale }) => ({ preview, scale })
export default mapStatesToProps(Preview, map)
