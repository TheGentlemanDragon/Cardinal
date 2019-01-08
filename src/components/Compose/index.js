import { Component } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'

import Elements from './Elements'
import Properties from './Properties'
import Preview from './Preview'
import Style from './Style'
import { differ } from '../../modules/utils'

class Compose extends Component {
  render() {
    const { elements, templatePage } = this.props
    const { elementIndex, preview, scale } = templatePage
    const element = elements[elementIndex] || {}
    const modified = differ(templatePage.prevElements, elements)

    return (
      <>
        <Elements items={elements} index={elementIndex} modified={modified} />
        <Properties element={element} />
        <Style element={element} />
        <Preview preview={preview} scale={scale} />
      </>
    )
  }
}

const map = ({ cards, elements, template, templatePage }) => ({
  cards,
  elements,
  template,
  templatePage,
})

export default mapStatesToProps(Compose, map)
