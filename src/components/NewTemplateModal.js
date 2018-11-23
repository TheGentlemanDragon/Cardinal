import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'

const createTemplate = ({ key, type }) => {
  if (key === 'Enter' || type === 'click') {
    const name = document.querySelector('div.modal-content input').value
    emitEvent('createTemplate', name)
  }
}

const hideModal = event => {
  // Event bubbles; only hide when element with onclick is clicked
  if (!event.currentTarget.isEqualNode(event.target)) {
    return
  }
  emitEvent('setState', { modal: '' })
}

const NewTemplateModal = ({ modal }) =>
  modal !== 'newTemplate' ? (
    <span />
  ) : (
    <div class="modal-wrapper" onClick={hideModal}>
      <div class="modal-content" container="column #left @stretch">
        <h1>New Template</h1>

        <label>Name</label>
        <input type="text" onKeyDown={createTemplate} />
        <span class="modal-footer" container="row #right @center">
          <button onClick={hideModal}>Cancel</button>
          <button class="primary" onClick={createTemplate}>
            Create
          </button>
        </span>
      </div>
    </div>
  )

NewTemplateModal.defaultHooks = {
  onComponentDidUpdate(_, newProps) {
    // Focus input on modal display
    if (newProps.modal) {
      document.querySelector('div.modal-content input').focus()
    }
  },
}

const map = ({ modal }) => ({ modal })
export default mapStatesToProps(NewTemplateModal, map)
