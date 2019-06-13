import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

/* TODO: Thumbnailify https://jsfiddle.net/wunderbart/hnj5vrf0/ */

class AssetsModal extends Component {
  constructor() {
    super()
    this.state = { filter: '', addMode: false }
  }

  componentWillMount() {
    emitEvent('fetchQuery', { collection: 'assets', sortKey: 'name' })
  }

  add(instance) {
    const { value } = document.querySelector('[placeholder="Asset URL"]')
    emitEvent('addAsset', value)
    instance.setState({ filter: '' })
    instance.toggleMode(instance)
  }

  filterText(instance, event) {
    instance.setState({ filter: event.target.value })
  }

  toggleMode(instance) {
    instance.setState({ addMode: !instance.state.addMode })
  }

  hideModal(event) {
    // Event bubbles; only hide when element with onclick is clicked
    if (!event.currentTarget.isEqualNode(event.target)) {
      return
    }
    emitEvent('setState', { modal: '' })
  }

  render() {
    const { assets, modal } = this.props

    if (modal !== 'assets') {
      return <span />
    }

    const { add, filterText, hideModal, toggleMode } = this
    const { addMode, filter } = this.state

    return (
      <div class="modal-wrapper" onClick={hideModal}>
        <div class="assets modal-content" container="column #left @stretch">
          <h1>Assets Manager</h1>

          <div class="assets-toolbar" container="row #spaced @bottom">
            {/* Add URL */}
            {addMode && [
              <input type="text" placeholder="Asset URL" flex />,
              <button class="primary" onClick={linkEvent(this, add)}>
                Upload
              </button>,
              <button onClick={linkEvent(this, toggleMode)}>Cancel</button>,
            ]}

            {/* Filter */}
            {!addMode && [
              <input
                type="text"
                placeholder="Filter Assets"
                value={filter}
                onInput={linkEvent(this, filterText)}
              />,
              <button class="primary" onClick={linkEvent(this, toggleMode)}>
                Add Assets
              </button>,
            ]}
          </div>

          <div class="assets-list" flex container="row #left @top">
            {[...assets]
              .filter(item => !filter || item.name.includes(filter))
              .map(item => (
                <div class="asset-tile">
                  <div class="image-contianer">
                    <img src={item.url} alt={item.name} />
                  </div>
                  <div class="asset-name">{item.name}</div>
                </div>
              ))}
          </div>

          <span container="row #right @center">
            <button class="primary" onClick={hideModal}>
              Done
            </button>
          </span>
        </div>
      </div>
    )
  }
}

const map = ({ assets, modal }) => ({ assets, modal })
export default mapStatesToProps(AssetsModal, map)
