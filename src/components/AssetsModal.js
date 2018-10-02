import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { fetchAssets, hideModal } from '../modules/actions'

class AssetsModal extends Component {
  componentWillMount() {
    this.props.fetchAssets('nando')
  }

  render() {
    const { assets, hideModal, isDisplayed } = this.props

    if (!isDisplayed) {
      return <span />
    }

    return (
      <div class="modal-wrapper" onClick={linkEvent('assets', hideModal)}>
        <div class="modal-content" container="row #left @top">
          {assets.map(item => (
            <div class="asset-tile">
              <div class="image-contianer">
                <img src={item.url} alt={item.name} />
              </div>
              <div class="asset-name">{item.name}</div>
            </div>
          ))}
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
  { fetchAssets, hideModal }
)(AssetsModal)
