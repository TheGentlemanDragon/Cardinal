import { linkEvent } from 'inferno'
import { emitEvent } from 'fluxible-js'

import PropertyGroup from '../SideBar/PropertyGroup'

const addElement = () => emitEvent('addElement')

const deleteElement = index => emitEvent('deleteElement', index)

const moveElementDown = index => emitEvent('moveElementDown', index)

const moveElementUp = index => emitEvent('moveElementUp', index)

const resetElement = () => emitEvent('resetElements')

const saveTemplate = () => emitEvent('saveTemplate')

const selectElement = index => emitEvent('selectElement', index)

const TypeIcon = ({ type = '' }) => {
  const [style, classname] = type.toLowerCase().split(' ')
  return <i class={`icon-${classname} element-type ${style}`} />
}

const Elements = ({ index: selected, items, modified }) => (
  <PropertyGroup
    label="Elements"
    collapsable={false}
    actions={[
      <i
        class={'icon-restore clickable' + (!modified ? ' clean' : '')}
        onClick={modified && resetElement}
      />,
      <i
        class={'icon-cloud-upload clickable' + (!modified ? ' clean' : '')}
        onClick={modified && saveTemplate}
      />,
      <i class="icon-add-element clickable" onClick={addElement} />,
    ]}
  >
    {/* No Elements List */}
    {!items.length && (
      <div class="sidebar-list-item" container="row #middle @center">
        Click &nbsp;
        <i class="icon-add-element" /> to add an element
      </div>
    )}

    {/* Elements List */}
    {items.map((item, index) => (
      <div
        key={`element-list-item-${index}`}
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

        {/* Move up */}
        {index !== 0 && (
          <i
            class="action icon-cheveron-up"
            onClick={linkEvent(index, moveElementUp)}
          />
        )}

        {/* Move down */}
        {index !== items.length - 1 && (
          <i
            class="action icon-cheveron-down"
            onClick={linkEvent(index, moveElementDown)}
          />
        )}

        {/* Delete */}
        <i
          class="action icon-delete"
          onClick={linkEvent(index, deleteElement)}
        />
        {/* <i class="action icon-visible" /> */}
      </div>
    ))}
  </PropertyGroup>
)

export default Elements
