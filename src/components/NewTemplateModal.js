import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { createTemplate, hideModal } from '../modules/actions'

class NewTemplateModal extends Component {
  constructor() {
    super()
    this.state = { name: '' }
  }

  setName(instance, event) {
    if (event.type !== 'keydown') {
      instance.setState({ name: event.target.value })
      return
    }

    if (event.key === 'Enter') {
      createTemplate(instance.state.name)
    } else if (event.key === 'Escape') {
      instance.setState({ name: '' })
    }
  }

  render() {
    const { createTemplate, game, hideModal, isDisplayed } = this.props

    if (!isDisplayed) {
      return <span />
    }

    return (
      <div class="modal-wrapper" onClick={linkEvent('newTemplate', hideModal)}>
        <div class="modal-content" container="column #left @stretch">
          <h1>New Template</h1>

          <label>Name</label>
          <input
            type="text"
            autoFocus={true}
            value={this.state.name}
            onInput={linkEvent(this, this.setName)}
            onKeyDown={linkEvent(this, this.setName)}
          />
          <div container="row #right @center">
            <button onClick={linkEvent('newTemplate', hideModal)}>
              Cancel
            </button>
            <button
              class="primary"
              onClick={linkEvent(
                { name: this.state.name, game },
                createTemplate
              )}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({
    isDisplayed: store.modals.newTemplate,
    game: store.game,
  }),
  { createTemplate, hideModal }
)(NewTemplateModal)
