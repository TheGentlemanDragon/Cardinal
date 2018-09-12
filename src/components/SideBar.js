import { Component } from 'inferno'
import { connect } from 'inferno-context-api-store'
import { Link } from 'inferno-router'

import Compose from './Compose'
import { setTab } from '../modules/actions'

class SideBar extends Component {
  render() {
    const { setTab, tab } = this.props

    return (
      <div key="sidebar" class="sidebar" container="column #top @stretch">
        {/* Bar Title */}
        <Link class="sidebar-title" to={`/games/`}>
          Cardinal
        </Link>

        {/* Tabs */}
        <div class="sidebar-tabs" container="row #spaced @middle">
          <button
            class={tab === 'compose' && 'active'}
            onClick={() => setTab('compose')}
          >
            Compose
          </button>

          <button
            class={tab === 'preview' && 'active'}
            onClick={() => setTab('preview')}
          >
            Preview
          </button>
        </div>

        {tab === 'compose' ? <Compose /> : <h2>Preview</h2>}
      </div>
    )
  }
}

export default connect(
  store => ({ tab: store.tab }),
  { setTab }
)(SideBar)
