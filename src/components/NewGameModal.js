import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { createGame, hideModal } from '../modules/actions'

class NewGameModal extends Component {
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
      createGame(instance.state.name)
    } else if (event.key === 'Escape') {
      instance.setState({ name: '' })
    }
  }

  render() {
    const { createGame, hideModal, isDisplayed } = this.props

    if (!isDisplayed) {
      return <span />
    }

    return (
      <div class="modal-wrapper" onClick={linkEvent('newGame', hideModal)}>
        <div class="modal-content" container="column #left @stretch">
          <h1>New Game</h1>

          <label>Name</label>
          <input
            type="text"
            autoFocus={true}
            value={this.state.name}
            onInput={linkEvent(this, this.setName)}
            onKeyDown={linkEvent(this, this.setName)}
          />
          <span container="row #right @center">
            <button onClick={linkEvent('newGame', hideModal)}>Cancel</button>
            <button
              class="primary"
              onClick={linkEvent(this.state.name, createGame)}
            >
              Create
            </button>
          </span>
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({
    isDisplayed: store.modals.newGame,
  }),
  { createGame, hideModal }
)(NewGameModal)
