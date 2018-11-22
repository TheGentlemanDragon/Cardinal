import { emitEvent } from 'fluxible-js'
import { mapStatesToProps } from 'inferno-fluxible'
import { Link } from 'inferno-router'

import NewGameModal from './NewGameModal'

const getGames = () =>
  emitEvent('fetchCollection', {
    collection: 'games',
    sortKey: 'name',
  })

const showModal = () => emitEvent('setState', { modal: 'newGame' })

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
        {[...games]
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(item => (
            <Link
              key={item.$id}
              class="item game-item"
              container="column #center @center"
              to={'/games/' + item.name}
            >
              {item.name}
            </Link>
          ))}

        {/* New Game */}
        <div
          key="new-game"
          class="item game-add"
          container="column #center @center"
          onClick={showModal}
        >
          + Game
        </div>
      </div>
    </div>

    <NewGameModal />
  </div>
)

GamesPage.defaultHooks = {
  onComponentWillMount(props) {
    // Only fetch games when empty
    if (!props.games.size) {
      getGames()
    }
  },

  onComponentShouldUpdate(prevProps, newProps) {
    // Only update when number of games changes
    return prevProps.games.size !== newProps.games.size
  },
}

const map = ({ games }) => ({ games })
export default mapStatesToProps(GamesPage, map)
