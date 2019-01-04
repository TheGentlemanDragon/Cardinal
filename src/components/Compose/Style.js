import { linkEvent } from 'inferno'
import { emitEvent } from 'fluxible-js'

import DimensionProperty from '../SideBar/DimensionProperty'
import PropertyGroup from '../SideBar/PropertyGroup'

// TODO: Fix property update
const updateElement = (key, event) =>
  emitEvent('updateElement', { key, value: event.target.value })

const Style = ({ element }) =>
  element && (
    <PropertyGroup label="Style">
      {/* Style Items */}
      <div container="row #spread @center">
        {/* Left */}
        <DimensionProperty
          label="x"
          value={element.style && element.style.left}
          onUpdate={linkEvent('style.left', updateElement)}
        />

        {/* Top */}
        <DimensionProperty
          label="y"
          value={element.style && element.style.top}
          onUpdate={linkEvent('style.top', updateElement)}
        />
      </div>

      <div container="row #spread @center">
        {/* Width */}
        <DimensionProperty
          label="w"
          value={element.style && element.style.width}
          onUpdate={linkEvent('style.width', updateElement)}
        />

        {/* Height */}
        <DimensionProperty
          label="h"
          value={element.style && element.style.height}
          onUpdate={linkEvent('style.height', updateElement)}
        />
      </div>
    </PropertyGroup>
  )

export default Style
