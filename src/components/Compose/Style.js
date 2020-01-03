import { linkEvent } from 'inferno'
import { emitEvent } from 'fluxible-js'

import DimensionProperty from '../SideBar/DimensionProperty'
import PropertyGroup from '../SideBar/PropertyGroup'
import SelectProperty from '../SideBar/SelectProperty'
import TextAreaProperty from '../SideBar/TextAreaProperty'

const updateElement = (key, event) =>
  emitEvent('updateElement', { key, value: event.target.value })

const isText = element => (element.type || '').includes(' Text')

const showFonts = (element, fonts) => fonts && isText(element)

const Style = ({ element, fonts }) =>
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

      {/* Font */}
      {showFonts(element, fonts) && (
        <SelectProperty
          label="font"
          value={element.style && element.style.font}
          options={fonts}
          onUpdate={linkEvent('style.font', updateElement)}
        />
      )}

      {/* Custom CSS */}
      <TextAreaProperty
        label="css"
        value={element.style && element.style.css}
        onUpdate={linkEvent('style.css', updateElement)}
      />
    </PropertyGroup>
  )

export default Style
