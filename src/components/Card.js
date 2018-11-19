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

const ComposeElement = ({
  element,
  index,
  isCompose,
  isPreview,
  isSelected,
  selectElement,
}) => {
  let classes = 'element'
  classes += isCompose && isSelected ? ' selected' : ''
  classes += isCompose && !isSelected ? ' compose' : ''

  return (
    <div
      class={classes}
      style={calculateStyle(element, index, !isCompose || isPreview)}
      onClick={isCompose && linkEvent(index, selectElement)}
    >
      {!isCompose || isPreview
        ? element.type.includes('Text') && element.content
        : element.name}
    </div>
  )
}

const Card = ({
  elements,
  preview,
  scale,
  selectedIndex,
  selectElement,
  tab,
}) => {
  const isCompose = tab === 'compose'
  const { staticContent, dynamicContent } = preview
  return (
    <div
      key="card"
      class={`card` + (isCompose ? '' : ' preview')}
      style={{ transform: `scale(${scale})` }}
    >
      {elements.map((element, index) => {
        const isSelected = index === selectedIndex
        const isPreview =
          (element.type.startsWith('Static') && staticContent) ||
          (element.type.startsWith('Dynamic') && dynamicContent)
        const props = {
          element,
          index,
          isCompose,
          isPreview,
          isSelected,
          selectElement,
        }

        return <ComposeElement {...props} />
      })}
    </div>
  )
}

export default connect(
  store => ({
    elements: store.elements,
    preview: store.preview,
    selectedIndex: store.selectedIndex,
    scale: store.preview.scale,
    tab: store.tab,
  }),
  { selectElement }
)(Card)
