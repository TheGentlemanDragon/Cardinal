import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { selectElement } from '../modules/actions'

const applyUnits = style => ({
  ...style,
  height: style.height + 'px',
  left: style.left + 'px',
  top: style.top + 'px',
  width: style.width + 'px',
})

const getClasses = (index, selectedIndex, tab) =>
  'element' +
  (tab === 'compose'
    ? index === selectedIndex
      ? ' selected'
      : ' compose'
    : '')

const Card = ({ elements, selectElement, selectedIndex, scale, tab }) => (
  <div key="card" class="card" style={{ transform: `scale(${scale})` }}>
    {elements.map((element, index) => (
      <div
        class={getClasses(index, selectedIndex, tab)}
        style={element.style && applyUnits(element.style)}
        onClick={linkEvent(index, selectElement)}
      >
        {element.name}
      </div>
    ))}
  </div>
)

export default connect(
  store => ({
    elements: store.elements,
    selectedIndex: store.selectedIndex,
    scale: store.scale,
    tab: store.tab,
  }),
  { selectElement }
)(Card)
