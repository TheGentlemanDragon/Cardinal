import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import {
  addElement,
  deleteElement,
  restoreElements,
  saveTemplate,
  selectElement,
} from '../../modules/actions'

const TypeIcon = ({ type }) => {
  const [style, classname] = (type || '').toLowerCase().split(' ')
  return <i class={`icon-${classname} element-type ${style}`} />
}

const Elements = ({
  addElement,
  deleteElement,
  elements,
  restoreElements,
  saveTemplate,
  selectedIndex,
  selectElement,
}) => (
  <div class="sidebar-section">
    {/* Elements Section Title */}
    <div class="sidebar-section-title" container="row #spread @center">
      <label flex>Elements</label>
      <i class="icon-restore clickable" onClick={restoreElements} />
      <i class="icon-cloud-upload clickable" onClick={saveTemplate} />
      <i class="icon-add-element clickable" onClick={addElement} />
    </div>

    {/* Elements List */}
    {!elements.length && (
      <div class="compose-element" container="row #middle @center">
        Click &nbsp;<i class="icon-add-element" /> to add an element
      </div>
    )}

    {elements.map((item, index) => (
      <div
        class={
          'compose-element clickable ' + (index === selectedIndex && 'selected')
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
  </div>
)

export default connect(
  store => ({
    elements: store.elements,
    selectedIndex: store.selectedIndex,
  }),
  {
    addElement,
    deleteElement,
    restoreElements,
    saveTemplate,
    selectElement,
  }
)(Elements)
