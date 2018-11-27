import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

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
  <div class="sidebar-section">
    {/* Elements Section Title */}
    <div class="sidebar-section-title" container="row #spread @center">
      <label flex>Elements</label>
      <i
        class={'icon-restore clickable' + (!modified ? ' clean' : '')}
        onClick={resetElements}
      />
      <i
        class={'icon-cloud-upload clickable' + (!modified ? ' clean' : '')}
        onClick={saveTemplate}
      />
      <i class="icon-add-element clickable" onClick={addElement} />
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
          onClick={linkEvent(index, deleteElement)}
        />
      </div>
    ))}
  </div>
)

const map = ({ elements, modified, selected }) => ({
  elements,
  modified,
  selected,
})
export default mapStatesToProps(Elements, map)
