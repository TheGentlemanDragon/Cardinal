import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'

import NewGameModal from './NewGameModal'

const GamesPage = ({ games }) => (
  <div key="games" container="column #top @stretch" flex>
    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">
      {/* Page Title */}
      <div class="page-title">Games</div>

      {/* Games List */}
      <div class="list" container="row #left @top">
        {games.map(item => (
          <Link
            key={'games-list-' + item.$id}
            class="item game-item"
            container="column #center @center"
            to={'/games/' + item.$id}
          >
            {item.name}
          </Link>
        ))}

        {/* New Game Button and Modal */}
        <NewGameModal />
      </div>
    </div>
  </div>
)

GamesPage.defaultHooks = {
  onComponentDidMount(/*domNode, props*/) {
    emitEvent('initGamesPage')
  },
}

const map = ({ games }) => ({ games })
export default mapStatesToProps(GamesPage, map)
