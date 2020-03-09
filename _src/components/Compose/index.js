import Elements from './Elements'
import Properties from './Properties'
import Preview from './Preview'
import Style from './Style'
import { differ, getFonts } from '../../modules/utils'

const Compose = ({ assets, elements, templatePage }) => {
  const { elementIndex, preview, scale } = templatePage
  const element = elements[elementIndex] || {}
  const modified = differ(templatePage.prevElements, elements)
  const fonts = getFonts(assets)

  return (
    <>
      <Elements items={elements} index={elementIndex} modified={modified} />
      <Properties element={element} />
      <Style element={element} fonts={fonts} />
      <Preview preview={preview} scale={scale} />
    </>
  )
}

export default Compose
