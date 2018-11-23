import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'

const createGame = ({ key, type }) => {
  if (key === 'Enter' || type === 'click') {
    const name = document.querySelector('div.modal-content input').value
    emitEvent('createGame', name)
  }
}

const hideModal = event => {
  // Event bubbles; only hide when element with onclick is clicked
  if (!event.currentTarget.isEqualNode(event.target)) {
    return
  }
  emitEvent('setState', { modal: '' })
}

const NewGameModal = ({ modal }) =>
  modal !== 'newGame' ? (
    <span />
  ) : (
    <div class="modal-wrapper" onClick={hideModal}>
      <div class="modal-content" container="column #left @stretch">
        <h1>New Game</h1>

        <label>Name</label>
        <input type="text" onKeyDown={createGame} />
        <span class="modal-footer" container="row #right @center">
          <button onClick={hideModal}>Cancel</button>
          <button class="primary" onClick={createGame}>
            Create
          </button>
        </span>
      </div>
    </div>
  )

NewGameModal.defaultHooks = {
  onComponentDidUpdate(_, newProps) {
    // Focus input on modal display
    if (newProps.modal) {
      document.querySelector('div.modal-content input').focus()
    }
  },
}

const map = ({ modal }) => ({ modal })
export default mapStatesToProps(NewGameModal, map)
