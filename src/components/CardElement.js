import { mapStatesToProps } from 'inferno-fluxible'
import { calculateStyle, getImgurUrl } from '../modules/utils'

const CardElement = ({
  assets,
  card,
  element,
  index,
  isCompose,
  templatePage,
}) => {
  const { content, name, type } = element
  const { preview, elementIndex } = templatePage

  const isStatic = type.startsWith('Static') && preview.includes('static')
  const isDynamic =
    type.startsWith('Dynamic') && (preview.includes('dynamic') || !isCompose)

  const isSelected = index === elementIndex
  const isPreview = isStatic || isDynamic

  const value = isStatic ? content : card.data[name] || ''
  const imgurUrl = type.includes('Image') ? getImgurUrl(assets, value) : ''

  let classes = 'element clickable'
  classes += isCompose && isSelected ? ' selected' : ''
  classes += isCompose && !isSelected ? ' compose' : ''

  return (
    <div
      class={classes}
      style={calculateStyle(element, index, imgurUrl, !isCompose || isPreview)}
    >
      {!isCompose || isPreview ? type.includes('Text') && value : name}
    </div>
  )
}

const map = ({ assets, card, templatePage }) => ({
  assets,
  templatePage,
  card,
})
export default mapStatesToProps(CardElement, map)
