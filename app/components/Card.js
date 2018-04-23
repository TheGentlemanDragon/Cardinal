import { h } from 'hyperapp'
import './Card.styl'

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
    ? index === selectedIndex ? ' selected' : ' compose'
    : '')

export default () => (
  { elements, selectedIndex, scale, tab },
  { selectElement }
) => (
  <div key="card" class="card" style={{ transform: 'scale(2)' }}>
    {elements.map((element, index) => (
      <div
        class={getClasses(index, selectedIndex, tab)}
        style={element.style && applyUnits(element.style)}
        onclick={() => selectElement(index)}
      >
        {element.name}
      </div>
    ))}
  </div>
)
