import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

import PropertyGroup from '../SideBar/PropertyGroup'

const addElement = () => emitEvent('addElement')

const deleteElement = index => emitEvent('deleteElement', index)

const resetElements = () => emitEvent('resetElements')

const selectElement = index => emitEvent('selectElement', index)

const saveTemplate = () => emitEvent('saveTemplate')

const TypeIcon = ({ type = '' }) => {
  const [style, classname] = type.toLowerCase().split(' ')
  return <i class={`icon-${classname} element-type ${style}`} />
}

const Elements = ({ elements, modified, selected }) => (
  <PropertyGroup
    label="Elements"
    collapsable={false}
    actions={[
      <i
        class={'icon-restore clickable' + (!modified ? ' clean' : '')}
        onClick={resetElements}
      />,
      <i
        class={'icon-cloud-upload clickable' + (!modified ? ' clean' : '')}
        onClick={saveTemplate}
      />,
      <i class="icon-add-element clickable" onClick={addElement} />,
    ]}
  >
    {/* Elements List */}
    {!elements.length && (
      <div class="sidebar-list-item" container="row #middle @center">
        Click &nbsp;
        <i class="icon-add-element" /> to add an element
      </div>
    )}

    {elements.map((item, index) => (
      <div
        class={
          'sidebar-list-item clickable ' + (index === selected && 'selected')
        }
        container="row #spread @center"
        onClick={linkEvent(index, selectElement)}
      >
        {/* Element Icon */}
        <TypeIcon type={item.type} />

        {/* Element Name */}
        <span flex>{item.name}</span>

        {/* Mouse Over Buttons */}
        <i class="action icon-visible" />
        <i
          class="action icon-delete"
          onClick={linkEvent(index, deleteElement)}
        />
      </div>
    ))}
  </PropertyGroup>
)

const map = ({ elements, modified, selected }) => ({
  elements,
  modified,
  selected,
})
export default mapStatesToProps(Elements, map)
