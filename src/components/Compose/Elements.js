import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

const selectElement = index => emitEvent('selectElement', index)

const TypeIcon = ({ type }) => {
  const [style, classname] = (type || '').toLowerCase().split(' ')
  return <i class={`icon-${classname} element-type ${style}`} />
}

const Elements = ({ elements, selected }) => (
  <div class="sidebar-section">
    {/* Elements Section Title */}
    <div class="sidebar-section-title" container="row #spread @center">
      <label flex>Elements</label>
      {/* TODO: <i class="icon-restore clickable" onClick={restoreElements} /> */}
      {/* TODO: <i class="icon-cloud-upload clickable" onClick={saveTemplate} /> */}
      {/* TODO: <i class="icon-add-element clickable" onClick={addElement} /> */}
    </div>

    {/* Elements List */}
    {!elements.length && (
      <div class="compose-element" container="row #middle @center">
        Click &nbsp;
        <i class="icon-add-element" /> to add an element
      </div>
    )}

    {elements.map((item, index) => (
      <div
        class={
          'compose-element clickable ' + (index === selected && 'selected')
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
          // TODO: onClick={linkEvent(index, deleteElement)}
        />
      </div>
    ))}
  </div>
)

const map = ({ elements, selected }) => ({ elements, selected })
export default mapStatesToProps(Elements, map)
