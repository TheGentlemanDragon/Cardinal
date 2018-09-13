import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import {
  addElement,
  deleteElement,
  restoreElements,
  saveTemplate,
  selectElement,
} from '../../modules/actions'

const Elements = ({
  addElement,
  deleteElement,
  elements,
  restoreElements,
  saveTemplate,
  selectedIndex,
  selectElement,
}) => (
  <div class="compose-section">
    {/* Elements Section Title */}
    <div class="compose-title" container="row #spread @center">
      <label flex>Elements</label>
      <i class="icon-block clickable" onClick={restoreElements} />
      <i class="icon-save-disk clickable" onClick={saveTemplate} />
      <i class="icon-add-outline icon-lg clickable" onClick={addElement} />
    </div>

    {/* Elements List */}
    {elements.map((item, index) => (
      <div
        class={'compose-element ' + (index === selectedIndex && 'selected')}
        container="row #spread @center"
        onClick={linkEvent(index, selectElement)}
      >
        {/* Element Icon */}
        <i class="element-type" />

        {/* Element Name */}
        <span flex>{item.name}</span>

        {/* Mouse Over Buttons */}
        <i class="action icon-view-show" />
        <i
          class="action icon-trash"
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
