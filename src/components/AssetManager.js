import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { fetchFiles, hideAssetManager } from '../modules/actions'

class AssetManager extends Component {
  componentWillMount() {
    this.props.fetchFiles('nando')
  }

  render() {
    const {
      hideAssetManager,
      assets: { show, files },
    } = this.props

    if (!show) {
      return <span />
    }

    return (
      <div
        class="asset-manager-wrapper"
        onClick={event =>
          event.currentTarget === event.srcElement && hideAssetManager()
        }
      >
        <div class="asset-manager" container="row #left @top">
          {files.map(item => (
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
  store => ({ assets: store.assets }),
  { fetchFiles, hideAssetManager }
)(AssetManager)
