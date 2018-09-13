import { connect } from 'inferno-context-api-store'
import { Link } from 'inferno-router'

import Compose from './Compose'
import { setTabCompose, setTabPreview } from '../modules/actions'

const SideBar = ({ tab, setTabCompose, setTabPreview }) => (
  <div key="sidebar" class="sidebar" container="column #top @stretch">
    {/* Bar Title */}
    <Link class="sidebar-title" to={`/games/`}>
      Cardinal
    </Link>

    {/* Tabs */}
    <div class="sidebar-tabs" container="row #spaced @middle">
      <button class={tab === 'compose' && 'active'} onClick={setTabCompose}>
        Compose
      </button>

      <button class={tab === 'preview' && 'active'} onClick={setTabPreview}>
        Preview
      </button>
    </div>

    {tab === 'compose' ? <Compose /> : <h2>Preview</h2>}
  </div>
)

export default connect(
  store => ({ tab: store.tab }),
  { setTabCompose, setTabPreview }
)(SideBar)
