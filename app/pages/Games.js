import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './Games.styl'

export default ({ games }, { fetchGames }) => ({ location, match }) => (
  <div
    key="games"
    container="column #top @stretch"
    flex
    oncreate={() => fetchGames()}
  >
    {/* App Title */}
    <div class="app-title">Cardinal</div>

    {/* Page */}
    <div class="page" container="column #top @stretch">
      {/* Page Title */}
      <div class="page-title">Games</div>

      {/* Games List */}
      <div class="list" container="row #left @top">
        {games &&
          [...games].map(item => (
            <Link
              class="item game-item"
              container="column #center @center"
              to={`/games/${item.name}`}
            >
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  </div>
)
