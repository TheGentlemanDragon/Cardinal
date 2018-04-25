import { h } from 'hyperapp'
import './FileManager.styl'

const FileManager = () => (state, { fm }) => (
  Object.assign(fm, state.fm),
  fm.visible && (
    <div class="file-manager-wrapper" onclick={() => fm.hide()}>
      <div class="file-manager">POP</div>
    </div>
  )
)

export default FileManager
