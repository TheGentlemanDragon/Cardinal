import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { addAsset, fetchAssets, hideModal } from '../modules/actions'

class AssetsModal extends Component {
  constructor() {
    super()
    this.state = { filter: '', addMode: false }
  }

  componentWillMount() {
    this.props.fetchAssets('nando')
  }

  add(instance, event) {
    instance.props.addAsset(event.target.value)
    instance.setState({ filter: '' })
  }

  filterText(instance, event) {
    instance.setState({ filter: event.target.value })
  }

  toggleMode(instance) {
    instance.setState({ addMode: !instance.state.addMode })
  }

  render() {
    const { assets, hideModal, isDisplayed } = this.props

    if (!isDisplayed) {
      return <span />
    }

    const { add, filterText, toggleMode } = this
    const { addMode, filter } = this.state
    const buttonCaption = addMode ? 'Done' : 'Add Assets'

    return (
      <div class="modal-wrapper" onClick={linkEvent('assets', hideModal)}>
        <div class="assets modal-content" container="column #left @stretch">
          <h1>Assets Manager</h1>

          <div class="assets-toolbar" container="row #spread @bottom">
            {/* Add URL */}
            {addMode && [
              <input
                type="text"
                placeholder="Asset URL"
                flex
                onKeyPress={linkEvent(this, add)}
              />,
              <span class="hint">&lt;enter&gt; to submit</span>,
            ]}

            {/* Filter */}
            {!addMode && (
              <input
                type="text"
                placeholder="Filter Assets"
                value={filter}
                onInput={linkEvent(this, filterText)}
              />
            )}

            <button class="primary" onClick={linkEvent(this, toggleMode)}>
              {buttonCaption}
            </button>
          </div>

          <div class="assets-list" flex container="row #left @top">
            {assets
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
            <button class="primary" onClick={linkEvent('assets', hideModal)}>
              Done
            </button>
          </span>
        </div>
      </div>
    )
  }
}

export default connect(
  store => ({
    assets: store.assets,
    isDisplayed: store.modals.assets,
  }),
  { addAsset, fetchAssets, hideModal }
)(AssetsModal)
