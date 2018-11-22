import { mapStatesToProps } from 'inferno-fluxible'

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
}) => {
  let classes = 'element'
  classes += isCompose && isSelected ? ' selected' : ''
  classes += isCompose && !isSelected ? ' compose' : ''

  return (
    <div
      class={classes}
      style={calculateStyle(element, index, !isCompose || isPreview)}
      // TODO: onClick={isCompose && linkEvent(index, selectElement)}
    >
      {!isCompose || isPreview
        ? element.type.includes('Text') && element.content
        : element.name}
    </div>
  )
}

const Card = ({ elements, mode, preview, scale, selected }) => (
  <div
    key="card"
    class={`card` + (mode === 'compose' ? '' : ' preview')}
    style={{ transform: `scale(${scale})` }}
  >
    {elements.map((element, index) => {
      const isSelected = index === selected
      const isPreview =
        (element.type.startsWith('Static') && preview.includes('static')) ||
        (element.type.startsWith('Dynamic') && preview.includes('dynamic'))
      const props = {
        element,
        index,
        isCompose: mode === 'compose',
        isPreview,
        isSelected,
      }

      return <ComposeElement {...props} />
    })}
  </div>
)

const map = ({ elements, mode, preview, scale, selected }) => ({
  elements,
  mode,
  preview,
  scale,
  selected,
})
export default mapStatesToProps(Card, map)
