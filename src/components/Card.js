import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'
import { safeParse } from '../modules/utils'

const toImgurUrl = id => `https://i.imgur.com/${id}.png`

const getImgurUrl = (assets, name) => {
  const asset = assets.find(item => item.description === name)
  return asset ? toImgurUrl(asset.id) : ''
}

const calculateStyle = (element, index, imgurUrl, isPreview = false) => {
  if (!element.style) {
    return {}
  }

  const elementStyle = element.style || {}

  const elementType = element.type || ''

  const customStyle = safeParse(elementStyle.css)

  const style = {
    ...elementStyle,
    height: elementStyle.height + 'px',
    left: elementStyle.left + 'px',
    top: elementStyle.top + 'px',
    width: elementStyle.width + 'px',
    'z-index': 1000 - index,
    ...(isPreview && customStyle),
  }

  if (isPreview && elementType.includes('Text')) {
    style['font-family'] = elementStyle.font
  }

  if (isPreview && elementType.includes('Image')) {
    const url = imgurUrl || element.content
    const align = 'center center'
    const size = `${style.width} ${style.height}`
    style['background'] = `url("${url}") ${align} / ${size} no-repeat`
  }

  if (!isPreview) {
    style['line-height'] = style.height
    style['text-align'] = 'center'
  }

  return style
}

const pointInRect = point => rect =>
  rect.left <= point.x &&
  rect.right >= point.x &&
  rect.top <= point.y &&
  rect.bottom >= point.y

/** Iterate through target children, selecting next element at click event */
const selectElement = (index, event) => {
  const { currentTarget: card, x, y } = event

  // Shift elements to back
  const originalElements = Array.from(card.children)
  const elements = [
    ...originalElements.slice(index + 1),
    ...originalElements.slice(0, index + 1),
  ]

  // Get the first clicked on item from shifted array
  const clickedOn = pointInRect({ x, y })
  const clickedElement = elements.find(item =>
    clickedOn(item.getBoundingClientRect())
  )

  // Select that item by its index in original array
  const nextIndex = originalElements.indexOf(clickedElement)
  emitEvent('selectElement', nextIndex)
}

const ComposeElement = ({
  element,
  imgurUrl,
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
      style={calculateStyle(element, index, imgurUrl, !isCompose || isPreview)}
    >
      {!isCompose || isPreview
        ? element.type.includes('Text') && value
        : element.name}
    </div>
  )
}

// TODO: Simplify card component
const Card = ({ assets, card = {}, elements, mode, templatePage }) => {
  const { elementIndex, preview, scale } = templatePage
  const isCompose = mode === 'compose'
  const staticPreview = preview.includes('static')
  const dynamicPreview = preview.includes('dynamic') || !isCompose
  const data = card.data || {}

  return (
    <div
      class={`card` + (isCompose ? '' : ' preview')}
      style={{ transform: `scale(${scale})` }}
      onClick={isCompose && linkEvent(elementIndex, selectElement)}
    >
      {elements.map((element, index) => {
        const isSelected = index === elementIndex
        const isStatic = element.type.startsWith('Static') && staticPreview
        const isDynamic = element.type.startsWith('Dynamic') && dynamicPreview
        const isImage = element.type.includes('Image')
        const value = isStatic ? element.content : data[element.name] || ''
        const props = {
          key: 'card-field-' + element.name,
          element,
          imgurUrl: isDynamic && isImage ? getImgurUrl(assets, value) : '',
          index,
          isCompose,
          isPreview: isStatic || isDynamic,
          isSelected,
          value,
        }
        return <ComposeElement {...props} />
      })}
    </div>
  )
}

const map = ({ assets, card, elements, templatePage }) => ({
  assets,
  card,
  elements,
  templatePage,
})
export default mapStatesToProps(Card, map)
