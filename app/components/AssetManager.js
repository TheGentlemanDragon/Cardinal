import { h } from 'hyperapp'
import './AssetManager.styl'

const AssetManager = () => (state, actions) => {
  const { assets } = state
  Object.apply(assets, actions.assets)

  return (
    assets.visible && (
      <div
        class="file-manager-wrapper"
        onclick={event =>
          event.currentTarget === event.srcElement && assets.hide()
        }
      >
        <div class="file-manager" container="column #top @stretch">
          <div flex>Files:</div>
          <div
            class="file-manager-drop"
            container="row #center @center"
            flex
            ondrop={event => {
              Assets.upload(event.dataTransfer.files[0])
              event.preventDefault()
            }}
            ondragover={event => event.preventDefault()}
          >
            Drop Files Here
          </div>
        </div>
      </div>
    )
  )
}

export default AssetManager
