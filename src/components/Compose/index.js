import { Component } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'

import Elements from './Elements'
import Properties from './Properties'
import Preview from './Preview'
import Style from './Style'
import { differ } from '../../modules/utils'

class Compose extends Component {
  origElements = null

  // TODO: Update Compose state
  updateState = partial => {}

  render() {
    const { elements, templatePage } = this.props
    const { elementIndex, preview, scale } = templatePage
    const element = elements[elementIndex] || {}
    const modified = differ(this.props.template.elements, elements)

    return (
      <>
        <Elements items={elements} index={elementIndex} modified={modified} />
        <Properties element={element} onUpdate={this.updateState} />
        <Style element={element} onUpdate={this.updateState} />
        <Preview preview={preview} scale={scale} onUpdate={this.updateState} />
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
