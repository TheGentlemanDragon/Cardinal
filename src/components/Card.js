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

const Card = ({ card, elements, mode, preview, scale, selected }) => {
  return (
    <div
      key="card"
      class={`card` + (mode === 'compose' ? '' : ' preview')}
      style={{ transform: `scale(${scale})` }}
    >
      {elements.map((element, index) => {
        const isSelected = index === selected
        const isStatic = element.type.startsWith('Static')
        const isDynamic = element.type.startsWith('Dynamic')
        const isPreview =
          (isStatic && preview.includes('static')) ||
          (isDynamic && preview.includes('dynamic'))
        const value = isStatic
          ? element.content
          : card
          ? card.data[element.name]
          : ''
        const props = {
          key: 'card-field-' + element.name,
          element,
          index,
          isCompose: mode === 'compose',
          isPreview,
          isSelected,
          value,
        }

        return <ComposeElement {...props} />
      })}
    </div>
  )
}

const map = ({ card, elements, mode, preview, scale, selected }) => ({
  card,
  elements,
  mode,
  preview,
  scale,
  selected,
})
export default mapStatesToProps(Card, map)
