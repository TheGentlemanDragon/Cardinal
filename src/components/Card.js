import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { selectElement } from '../modules/actions'

const calculateStyle = (element, index, isPreview = false) => {
  if (!element.style) {
    return {}
  }

  const style = {
    ...element.style,
    height: element.style.height + 'px',
    left: element.style.left + 'px',
    top: element.style.top + 'px',
    width: element.style.width + 'px',
    zIndex: 1000 - index,
  }

  if (isPreview && element.type.includes('Image')) {
    style['background'] = `center no-repeat url("${element.content}")`
    style['background-size'] = `${style.width} ${style.height}`
  }

  return style
}

const ComposeElement = ({ element, index, isSelected, selectElement }) => (
  <div
    class={`element ${isSelected ? 'selected' : 'compose'}`}
    style={calculateStyle(element, index)}
    onClick={linkEvent(index, selectElement)}
  >
    {element.name}
  </div>
)

const PreviewElement = ({ data, element, index }) => (
  <div class="element" style={calculateStyle(element, index, true)}>
    {element.type.includes('Text') && element.content}
  </div>
)

const Card = ({ elements, scale, selectedIndex, selectElement, tab }) => {
  const isCompose = tab === 'compose'
  return (
    <div
      key="card"
      class={`card` + (isCompose ? '' : ' preview')}
      style={{ transform: `scale(${scale})` }}
    >
      {elements.map((element, index) => {
        const isSelected = index === selectedIndex
        const props = { element, index, isSelected, selectElement }

        return isCompose ? (
          <ComposeElement {...props} />
        ) : (
          <PreviewElement {...props} />
        )
      })}
    </div>
  )
}

export default connect(
  store => ({
    cards: store.cards,
    elements: store.elements,
    selectedIndex: store.selectedIndex,
    scale: store.scale,
    tab: store.tab,
  }),
  { selectElement }
)(Card)
