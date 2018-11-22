import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'

import Compose from './Compose'
import Populate from './Populate'

const setCompose = () => emitEvent('setState', { mode: 'compose' })
const setPopulate = () => emitEvent('setState', { mode: 'populate' })

const SideBar = ({ mode }) => {
  return (
    <div key="sidebar" class="sidebar" container="column #top @stretch">
      {/* Bar Title */}
      <Link class="sidebar-title" to={`/games/`}>
        Cardinal
      </Link>

      {/* Tabs */}
      <div class="sidebar-tabs" container="row #spaced @middle">
        <button class={mode === 'compose' && 'active'} onClick={setCompose}>
          Compose
        </button>

        <button class={mode === 'populate' && 'active'} onClick={setPopulate}>
          Populate
        </button>
      </div>

      {mode === 'compose' ? <Compose /> : <Populate />}
    </div>
  )
}

const map = ({ mode }) => ({ mode })
export default mapStatesToProps(SideBar, map)
