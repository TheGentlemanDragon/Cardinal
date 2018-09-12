import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { deleteElement, selectElement } from '../modules/actions'

class ComposeElement extends Component {
  render() {
    const {
      deleteElement,
      index,
      item,
      selectedIndex,
      selectElement,
    } = this.props

    return (
      <div
        class={'compose-element ' + (index === selectedIndex && 'selected')}
        container="row #spread @center"
        onClick={() => selectElement(index)}
      >
        {/* Element Icon */}
        <i class="element-type" />

        {/* Element Name */}
        <span flex>{item.name}</span>

        {/* Mouse Over Buttons */}
        <i class="action icon-view-show" />
        <i class="action icon-trash" onClick={() => deleteElement(index)} />
      </div>
    )
  }
}

export default connect(
  store => ({
    selectedIndex: store.selectedIndex,
  }),
  { deleteElement, selectElement }
)(ComposeElement)
