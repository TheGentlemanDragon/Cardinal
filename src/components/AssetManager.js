import { connect } from 'inferno-context-api-store'

import { hideAssetManager } from '../modules/actions'

const AssetManager = ({ hideAssetManager, assets: { show } }) =>
  show && (
    <div
      class="file-manager-wrapper"
      onClick={event =>
        event.currentTarget === event.srcElement && hideAssetManager()
      }
    >
      <div class="file-manager" container="column #top @stretch">
        <div flex>Files:</div>
        <div
          class="file-manager-drop"
          container="row #center @center"
          flex
          ondrop={event => {
            // Assets.upload(event.dataTransfer.files[0])
            console.log(event.dataTransfer.files)
            event.preventDefault()
          }}
          ondragover={event => event.preventDefault()}
        >
          Drop Files Here
        </div>
      </div>
    </div>
  )

export default connect(
  store => ({ assets: store.assets }),
  { hideAssetManager }
)(AssetManager)
