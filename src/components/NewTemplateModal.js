import { emitEvent } from 'fluxible-js'
import { Component } from 'inferno'

class NewTemplateModal extends Component {
  input = null

  state = {
    show: false,
  }

  componentDidMount() {
    this.input = document.querySelector('div.modal-content input')
  }

  componentDidUpdate() {
    this.input.focus()
  }

  hide = event => {
    // Event bubbles; only hide when element with onclick is clicked
    if (!event.currentTarget.isEqualNode(event.target)) {
      return
    }
    this.setState({ show: false })
  }

  show = () => this.setState({ show: true })

  submit = ({ key, type }) => {
    if (key === 'Enter' || type === 'click') {
      const name = this.input.value
      const { gameRef } = this.props
      emitEvent('createTemplate', { gameRef, name })
      this.setState({ show: false })
    }
  }

  render() {
    const { hide, show, submit } = this
    const style = { visibility: this.state.show ? 'visible' : 'hidden' }

    return (
      <>
        <div
          key="new-template"
          class="item template-add"
          container="column #center @center"
          onClick={show}
        >
          + Template
        </div>
        <div class="modal-wrapper" style={style} onClick={hide}>
          <div class="modal-content" container="column #left @stretch">
            <h1>New Template</h1>

            <label>Name</label>
            <input type="text" onKeyDown={submit} />
            <span class="modal-footer" container="row #right @center">
              <button onClick={hide}>Cancel</button>
              <button class="primary" onClick={submit}>
                Create
              </button>
            </span>
          </div>
        </div>
      </>
    )
  }
}

export default NewTemplateModal
