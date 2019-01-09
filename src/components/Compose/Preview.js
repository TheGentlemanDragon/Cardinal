import { Component, linkEvent } from 'inferno'
import { emitEvent } from 'fluxible-js'

import PropertyGroup from '../SideBar/PropertyGroup'
import ToggleProperty from '../SideBar/ToggleProperty'

const toggleValue = (preview, value) => {
  if (preview.includes(value)) {
    preview = preview.filter(item => item !== value)
  } else {
    preview.push(value)
  }
  emitEvent('applyState', { templatePage: { preview } })
}

const toggleDynamic = preview => {
  toggleValue(preview, 'dynamic')
}

const toggleStatic = preview => {
  toggleValue(preview, 'static')
}

const setScale = event => {
  emitEvent('applyState', { templatePage: { scale: event.target.value } })
}

class Preview extends Component {
  render() {
    const {
      props: { preview, scale },
    } = this

    return (
      <PropertyGroup label="Preview">
        {/* Static Content */}
        <ToggleProperty
          label={'static'}
          value={preview.includes('static')}
          onUpdate={linkEvent(preview, toggleStatic)}
        />

        {/* Dynamic Content */}
        <ToggleProperty
          label={'dynamic'}
          value={preview.includes('dynamic')}
          onUpdate={linkEvent(preview, toggleDynamic)}
        />

        {/* Scale */}
        <div class="sidebar-property " container="row #spread @center">
          <label class="one-third-width">scale</label>
          <input
            type="range"
            class="two-thirds-width"
            value={scale}
            min={0.5}
            max={3.5}
            step={0.1}
            onInput={setScale}
          />
        </div>
      </PropertyGroup>
    )
  }
}

export default Preview
