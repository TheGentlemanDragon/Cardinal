import { connect } from 'inferno-context-api-store'
import { Link } from 'inferno-router'

import Compose from './Compose'
import Populate from './Populate'
import { setTabCompose, setTabPopulate } from '../modules/actions'

const SideBar = ({ tab, setTabCompose, setTabPopulate }) => (
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

      <button class={tab === 'populate' && 'active'} onClick={setTabPopulate}>
        Populate
      </button>
    </div>

    {tab === 'compose' ? <Compose /> : <Populate />}
  </div>
)

export default connect(
  store => ({ tab: store.tab }),
  { setTabCompose, setTabPopulate }
)(SideBar)
