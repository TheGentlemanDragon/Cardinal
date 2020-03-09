import { linkEvent } from 'inferno'
import { emitEvent } from 'fluxible-js'

import { elementTypes } from '../../Constants'
import ImageAssetProperty from '../SideBar/ImageAssetProperty'
import PropertyGroup from '../SideBar/PropertyGroup'
import SelectProperty from '../SideBar/SelectProperty'
import TextProperty from '../SideBar/TextProperty'

const updateElement = (key, event) => {
  const { value } = event.target

  if (value === 'showModal') {
    emitEvent('setState', { modal: 'assets', value })
    emitEvent('resetElement')
  } else {
    emitEvent('updateElement', { key, value })
  }
}

const Properties = ({ element }) =>
  element.name && (
    <PropertyGroup label="Properties">
      {/* Name */}
      <TextProperty
        label="name"
        value={element.name}
        onUpdate={linkEvent('name', updateElement)}
      />

      {/* Type */}
      <SelectProperty
        label="type"
        value={element.type}
        options={elementTypes}
        onUpdate={linkEvent('type', updateElement)}
      />

      {/* Static Image Type */}
      {element.type === 'Static Image' && (
        <ImageAssetProperty
          label="content"
          value={element.content}
          onUpdate={linkEvent('content', updateElement)}
        />
      )}

      {/* Static Text Type */}
      {element.type === 'Static Text' && (
        <TextProperty
          label="content"
          value={element.content}
          onUpdate={linkEvent('content', updateElement)}
        />
      )}
    </PropertyGroup>
  )

export default Properties
