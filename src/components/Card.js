import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

const selectElement = index => emitEvent('selectElement', index)

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
    'z-index': 1000 - index,
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
  value,
}) => {
  let classes = 'element clickable'
  classes += isCompose && isSelected ? ' selected' : ''
  classes += isCompose && !isSelected ? ' compose' : ''

  return (
    <div
      class={classes}
      style={calculateStyle(element, index, !isCompose || isPreview)}
      onClick={isCompose && linkEvent(index, selectElement)}
    >
      {!isCompose || isPreview
        ? element.type.includes('Text') && value
        : element.name}
    </div>
  )
}

// TODO: Simplify card component
const Card = ({ card, elements, mode, templatePage }) => {
  const { elementIndex, preview, scale } = templatePage
  const staticPreview = preview.includes('static')
  const dynamicPreview = preview.includes('dynamic')
  const data = card.data || {}

  return (
    <div
      class={`card` + (mode === 'compose' ? '' : ' preview')}
      style={{ transform: `scale(${scale})` }}
    >
      {elements.map((element, index) => {
        const isSelected = index === elementIndex
        const isStatic = element.type.startsWith('Static')
        const isDynamic = element.type.startsWith('Dynamic')
        const isPreview =
          (isStatic && staticPreview) || (isDynamic && dynamicPreview)
        const value = isStatic ? element.content : data[element.name] || ''
        const props = {
          key: 'card-field-' + element.name,
          element,
          index,
          isCompose: mode === 'compose',
          isPreview,
          isSelected,
          value,
        }
        return <ComposeElement key={'card-field-' + element.name} {...props} />
      })}
    </div>
  )
}

const map = ({ card, elements, templatePage }) => ({
  card,
  elements,
  templatePage,
})
export default mapStatesToProps(Card, map)
