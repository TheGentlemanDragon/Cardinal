import { h } from 'hyperapp'
import './FileManager.styl'

const FileManager = () => (state, { fm }) => (
  Object.assign(fm, state.fm),
  fm.visible && (
    <div
      class="file-manager-wrapper"
      onclick={event => event.currentTarget === event.srcElement && fm.hide()}
    >
      <div class="file-manager" container="column #top @stretch">
        <div flex>Files:</div>
        <div
          class="file-manager-drop"
          container="row #center @center"
          flex
          ondrop={event => {
            console.log(event.dataTransfer.files[0])
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

export default FileManager
